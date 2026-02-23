import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { smoothScrollToId } from "../../Utils/SmoothScroll";
import "../Section.css";
import "./Skills.css";

type SkillCard = { title: string; detail: string };
type Category = { id: string; label: string; short: string; items: SkillCard[] };

const CATEGORIES: Category[] = [
    {
        id: "backend",
        label: "Backend & Systems",
        short: "BE",
        items: [
            { title: "ASP.NET Core", detail: "APIs, services, clean architecture" },
            { title: "C#", detail: "Enterprise development + tooling" },
            { title: "Entity Framework", detail: "ORM patterns, query design" },
            { title: "SQL", detail: "Performance-minded querying" },
            { title: "Java / Python", detail: "Utilities, scripting, problem solving" },
        ],
    },
    {
        id: "security",
        label: "Security & Automation",
        short: "SEC",
        items: [
            { title: "CompTIA Security+", detail: "Security fundamentals" },
            { title: "IAM", detail: "Provisioning + access workflows at scale" },
            { title: "Network Security Automation", detail: "Firewall tooling + ops" },
            { title: "SOC Work", detail: "Investigate + remediate events" },
            { title: "KQL / ESQL", detail: "Query logs + integration flows" },
        ],
    },
    {
        id: "frontend",
        label: "Frontend",
        short: "FE",
        items: [
            { title: "React", detail: "Components, state, UI composition" },
            { title: "Angular", detail: "Structured SPA development" },
            { title: "TypeScript", detail: "Typed UI + safer refactors" },
            { title: "JavaScript", detail: "Modern JS patterns" },
            { title: "HTML/CSS", detail: "Responsive layouts + styling systems" },
        ],
    },
];

type Phase = "idle" | "docked";

function sleep(ms: number) {
    return new Promise<void>((r) => setTimeout(r, ms));
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Skills() {

    const HEADER_OFFSET = 85;

    const handleScrollToProjects = (
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        e.preventDefault();
        smoothScrollToId("projects", HEADER_OFFSET);
    };

    const prefersReducedMotion = useReducedMotion();

    const [phase, setPhase] = useState<Phase>("idle");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [shownId, setShownId] = useState<string | null>(null);
    const [dealtCount, setDealtCount] = useState(0);
    const [discarding, setDiscarding] = useState(false);
    const [pendingId, setPendingId] = useState<string | null>(null);
    const [pillHitTick, setPillHitTick] = useState(0);

    const shownCategory = useMemo(
        () => CATEGORIES.find((c) => c.id === shownId) ?? null,
        [shownId]
    );

    const stageRef = useRef<HTMLDivElement | null>(null);
    const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const slotRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [vectors, setVectors] = useState<Array<{ dx: number; dy: number }>>([]);

    const beginDeal = async (id: string) => {
        setShownId(id);
        setDealtCount(0);
        setVectors([]);
        slotRefs.current = [];
        await sleep(0);
    };

    useEffect(() => {
        if (phase !== "docked") return;
        if (!shownCategory) return;
        if (discarding) return;

        let cancelled = false;

        (async () => {
            if (!prefersReducedMotion) await sleep(120);

            for (let i = 0; i < shownCategory.items.length; i++) {
                if (cancelled) return;
                setDealtCount(i + 1);
                setPillHitTick((t) => t + 1);
                if (!prefersReducedMotion) await sleep(320);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [phase, shownCategory, discarding, prefersReducedMotion]);

    useLayoutEffect(() => {
        if (!shownCategory) return;
        const stageEl = stageRef.current;
        const pillEl = pillRefs.current[shownCategory.id];
        if (!stageEl || !pillEl) return;

        const stageRect = stageEl.getBoundingClientRect();
        const p = pillEl.getBoundingClientRect();
        const originX = p.left + p.width / 2 - stageRect.left;
        const originY = p.top + p.height / 2 - stageRect.top;

        const next = shownCategory.items.map((_, i) => {
            const slot = slotRefs.current[i];
            if (!slot) return { dx: 0, dy: 0 };
            const s = slot.getBoundingClientRect();
            const destX = s.left + s.width / 2 - stageRect.left;
            const destY = s.top + s.height / 2 - stageRect.top;
            return { dx: originX - destX, dy: originY - destY };
        });

        setVectors(next);
    }, [shownCategory, phase, dealtCount]);

    const onPick = async (id: string) => {
        if (phase === "docked" && id === selectedId) {
            setPendingId(null);
            setDiscarding(true);
            setDealtCount(0);
            return;
        }

        setSelectedId(id);

        if (phase === "idle") {
            setPhase("docked");
            setPendingId(id);
            return;
        }

        setPendingId(id);
        if (shownId) {
            setDiscarding(true);
            setDealtCount(0);
        } else {
            await beginDeal(id);
        }
    };

    const onRowAnimComplete = async () => {
        if (phase !== "docked") return;
        if (!pendingId) return;
        if (discarding) return;

        const id = pendingId;
        setPendingId(null);

        if (!prefersReducedMotion) await sleep(80);
        await beginDeal(id);
    };

    const handleExitComplete = async () => {
        if (!discarding) return;

        setDiscarding(false);
        setShownId(null);
        setVectors([]);
        slotRefs.current = [];

        if (pendingId) {
            const next = pendingId;
            setPendingId(null);
            await beginDeal(next);
        } else {
            setPhase("idle");
            setSelectedId(null);
        }
    };

    const dockY = prefersReducedMotion ? 0 : -18;
    const rowAnimate = phase === "idle" ? { y: 0 } : { y: dockY };
    const rowTransition = prefersReducedMotion
        ? { duration: 0 }
        : { duration: .5, ease: [0.16, 1, 0.3, 1] as const };

    const cardInitial = (i: number, v: { dx: number; dy: number }) => ({
        opacity: 0,
        x: v.dx,
        y: v.dy,
        rotate: i % 2 === 0 ? -8 : 8,
        scale: 1,
    });

    const cardAnimate = {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: prefersReducedMotion ? 1 : [1, 1.05, 0.99, 1],
        transition: prefersReducedMotion
            ? { duration: 0 }
            : {
                x: { duration: 0.34, ease: EASE },
                y: { duration: 0.34, ease: EASE },
                rotate: { duration: 0.34, ease: EASE },
                scale: { duration: 0.26, ease: EASE, delay: 0.05 },
                opacity: { duration: 0.12 },
            },
    };

    const cardExit = {
        opacity: 0,
        x: -620,
        y: -30,
        rotate: -18,
        scale: 0.98,
        transition: prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.22, ease: EASE },
    };

    return (
        <section id="skills" className="section skills">
            <div className="skills-inner">
                <div className="skills-titleWrap">
                    <h2 className="skills-title">Skills</h2>
                    <div className="skills-underline" aria-hidden="true" />
                </div>

                <div
                    className={`skills-stage ${phase === "idle" ? "is-idle" : "is-docked"
                        }`}
                    ref={stageRef}
                >
                    <motion.div
                        className="skills-rowDock"
                        animate={rowAnimate}
                        transition={rowTransition}
                        onAnimationComplete={onRowAnimComplete}
                    >
                        <div
                            className="skills-circles"
                            aria-label="Skill categories"
                        >
                            {CATEGORIES.map((cat) => {
                                const active = cat.id === selectedId;

                                return (
                                    <motion.button
                                        key={`${cat.id}-${active ? pillHitTick : 0
                                            }`}
                                        ref={(el) => {
                                            pillRefs.current[cat.id] = el;
                                        }}
                                        type="button"
                                        className={`skills-circle ${active ? "is-active" : ""
                                            }`}
                                        onClick={() => onPick(cat.id)}
                                        aria-pressed={active}
                                        initial={false}
                                        animate={
                                            active &&
                                                phase === "docked" &&
                                                !discarding &&
                                                !prefersReducedMotion
                                                ? { scale: [1, 1.03, 1] }
                                                : { scale: 1 }
                                        }
                                        transition={
                                            prefersReducedMotion
                                                ? { duration: 0 }
                                                : {
                                                    duration: 0.26,
                                                    ease: [
                                                        0.16,
                                                        1,
                                                        0.3,
                                                        1,
                                                    ] as const,
                                                }
                                        }
                                        whileHover={
                                            prefersReducedMotion
                                                ? undefined
                                                : { scale: 1.04 }
                                        }
                                        whileTap={
                                            prefersReducedMotion
                                                ? undefined
                                                : { scale: 0.99 }
                                        }
                                    >
                                        <span className="skills-circleShort">
                                            {cat.short}
                                        </span>
                                        <span className="skills-circleLabel">
                                            {cat.label}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>

                    <div className="skills-panel">
                        {shownCategory && phase === "docked" && (
                            <div
                                className="skills-grid"
                                aria-hidden="true"
                            >
                                {shownCategory.items.map((item, i) => (
                                    <div
                                        key={`${shownCategory.id}-slot-${item.title}`}
                                        ref={(el) => {
                                            slotRefs.current[i] = el;
                                        }}
                                        className="skills-slot"
                                    />
                                ))}
                            </div>
                        )}

                        <AnimatePresence
                            mode="wait"
                            onExitComplete={handleExitComplete}
                        >
                            {shownCategory &&
                                phase === "docked" &&
                                dealtCount > 0 && (
                                    <div
                                        className={`skills-dealLayer ${dealtCount ===
                                                shownCategory.items.length
                                                ? "is-complete"
                                                : ""
                                            }`}
                                        aria-live="polite"
                                    >
                                        {shownCategory.items
                                            .slice(0, dealtCount)
                                            .map((item, i) => {
                                                const v = vectors[i] ?? {
                                                    dx: 0,
                                                    dy: 0,
                                                };
                                                return (
                                                    <motion.div
                                                        key={`${shownCategory.id}-${item.title}`}
                                                        className="skills-card"
                                                        initial={cardInitial(
                                                            i,
                                                            v
                                                        )}
                                                        animate={
                                                            discarding
                                                                ? undefined
                                                                : cardAnimate
                                                        }
                                                        exit={cardExit}
                                                    >
                                                        <div className="skills-cardShine" />
                                                        <div className="skills-cardTitle">
                                                            {item.title}
                                                        </div>
                                                        <div className="skills-cardDetail">
                                                            {item.detail}
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                    </div>
                                )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="skills-btnWrap">
                    <a href="#projects" className="skills-btn" onClick={handleScrollToProjects}>
                        View My Projects
                    </a>
                </div>
            </div>
        </section>
    );
}