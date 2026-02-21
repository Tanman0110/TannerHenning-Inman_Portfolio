import { useEffect, useMemo, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import "./Header.css";

const HEADER_OFFSET = 85;

function clamp01(n: number) {
    return Math.max(0, Math.min(1, n));
}

type SectionId =
    | "home"
    | "about"
    | "skills"
    | "projects"
    | "experience"
    | "contact";

type ThemeMode = "light" | "midnight";
type ScrollDir = "down" | "up";

export default function Header() {
    const [progress, setProgress] = useState(0);
    const [activeSection, setActiveSection] = useState<SectionId>("home");

    const [theme, setTheme] = useState<ThemeMode>("light");
    const [scrollDir, setScrollDir] = useState<ScrollDir>("down");

    const prevActiveRef = useRef<SectionId>("home");
    const [enteringId, setEnteringId] = useState<SectionId | null>(null);
    const [exitingId, setExitingId] = useState<SectionId | null>(null);

    const links = useMemo(
        () =>
            [
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "experience", label: "Experience" },
                { id: "contact", label: "Contact" },
            ] as const,
        []
    );

    // --- THEME ---
    const applyTheme = (t: ThemeMode) => {
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
    };

    useEffect(() => {
        const saved = localStorage.getItem("theme") as ThemeMode | null;

        if (saved === "light" || saved === "midnight") {
            setTheme(saved);
            applyTheme(saved);
            return;
        }

        const prefersDark =
            window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;

        const initial: ThemeMode = prefersDark ? "midnight" : "light";
        setTheme(initial);
        applyTheme(initial);
    }, []);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    // --- PROGRESS + SCROLL DIRECTION ---
    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;

            const delta = y - lastY;
            if (Math.abs(delta) > 2) {
                setScrollDir(delta > 0 ? "down" : "up");
                lastY = y;
            }

            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - window.innerHeight;
            const p = scrollable > 0 ? y / scrollable : 0;
            setProgress(clamp01(p));
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // --- ACTIVE SECTION TRACKING ---
    useEffect(() => {
        const sectionEls = links
            .map((l) => document.getElementById(l.id))
            .filter(Boolean) as HTMLElement[];

        if (sectionEls.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
                    )[0];

                if (visible?.target?.id) {
                    setActiveSection(visible.target.id as SectionId);
                }
            },
            {
                root: null,
                rootMargin: `-${HEADER_OFFSET + 10}px 0px -55% 0px`,
                threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
            }
        );

        sectionEls.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [links]);

    // --- ENTER/EXIT UNDERLINE DIRECTION CONTROL ---
    useEffect(() => {
        const prev = prevActiveRef.current;
        const next = activeSection;

        if (prev === next) return;

        setExitingId(prev);
        setEnteringId(next);

        prevActiveRef.current = next;

        const t = window.setTimeout(() => {
            setExitingId(null);
            setEnteringId(null);
        }, 260);

        return () => window.clearTimeout(t);
    }, [activeSection]);

    // --- SMOOTH SCROLL ---
    function easeOutCubic(t: number) {
        return 1 - Math.pow(1 - t, 3);
    }

    function smoothScrollToId(id: string, offset = HEADER_OFFSET) {
        const el = document.getElementById(id);
        if (!el) return;

        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - window.innerHeight;

        const startY = window.scrollY;
        const rawTargetY = el.getBoundingClientRect().top + window.scrollY - offset;
        const targetY = Math.max(0, rawTargetY);

        const distance = targetY - startY;
        const absDist = Math.abs(distance);

        const minDuration = 450;
        const maxDuration = 900;
        const duration = Math.min(maxDuration, Math.max(minDuration, absDist * 0.6));

        let startTime: number | null = null;

        function step(ts: number) {
            if (startTime === null) startTime = ts;

            const elapsed = ts - startTime;
            const t = Math.min(1, elapsed / duration);
            const eased = easeOutCubic(t);

            const nextY = startY + distance * eased;
            window.scrollTo(0, nextY);

            if (scrollable > 0) {
                const p = nextY / scrollable;
                setProgress(clamp01(p));
            }

            if (t < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    const isMidnight = theme === "midnight";

    return (
        <header className="header">
            <div className="progressTrack" aria-hidden="true">
                <div className="progressBar" style={{ width: `${progress * 100}%` }} />
            </div>

            <div className="brand">𝕋</div>

            <nav aria-label="Primary" className="nav">
                {links.map((l) => {
                    const isActive = activeSection === l.id;

                    const enterClass =
                        enteringId === l.id
                            ? scrollDir === "down"
                                ? "underline-enter-down"
                                : "underline-enter-up"
                            : "";

                    const exitClass =
                        exitingId === l.id
                            ? scrollDir === "down"
                                ? "underline-exit-down"
                                : "underline-exit-up"
                            : "";

                    return (
                        <a
                            key={l.id}
                            href={`#${l.id}`}
                            className={`navLink ${isActive ? "active" : ""} ${enterClass} ${exitClass}`}
                            onClick={(e) => {
                                e.preventDefault();
                                smoothScrollToId(l.id);
                            }}
                        >
                            {l.label}
                        </a>
                    );
                })}
            </nav>

            <div className="header-right">
                <button
                    type="button"
                    className="themeToggle"
                    aria-label={isMidnight ? "Switch to light mode" : "Switch to midnight mode"}
                    onClick={() => setTheme(isMidnight ? "light" : "midnight")}
                    title={isMidnight ? "Midnight mode" : "Light mode"}
                >
                    {isMidnight ? <Moon size={22} strokeWidth={2} /> : <Sun size={22} strokeWidth={2} />}
                </button>
            </div>
        </header>
    );
}