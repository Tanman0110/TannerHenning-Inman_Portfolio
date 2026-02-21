import { useEffect, useMemo, useState } from "react";
import "./Header.css";
import logo from "../../assets/west-virginia-logo.png";

const HEADER_OFFSET = 85;

function clamp01(n: number) {
    return Math.max(0, Math.min(1, n));
}

type SectionId = "home" | "about" | "skills" | "projects" | "contact";

export default function Header() {
    const [progress, setProgress] = useState(0);
    const [activeSection, setActiveSection] = useState<SectionId>("home");

    const links = useMemo(
        () =>
            [
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
            ] as const,
        []
    );

    // Manual scroll updates (progress bar)
    useEffect(() => {
        const updateFromWindow = () => {
            const y = window.scrollY;
            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - window.innerHeight;
            const p = scrollable > 0 ? y / scrollable : 0;
            setProgress(clamp01(p));
        };

        updateFromWindow();
        window.addEventListener("scroll", updateFromWindow, { passive: true });
        return () => window.removeEventListener("scroll", updateFromWindow);
    }, []);

    // Active section tracking (which section you're "under")
    useEffect(() => {
        const sectionEls = links
            .map((l) => document.getElementById(l.id))
            .filter(Boolean) as HTMLElement[];

        if (sectionEls.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the most visible intersecting section
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

                if (visible?.target?.id) {
                    setActiveSection(visible.target.id as SectionId);
                }
            },
            {
                // Offset for fixed header: start counting a section as "active"
                // when it enters below the header.
                root: null,
                rootMargin: `-${HEADER_OFFSET + 10}px 0px -55% 0px`,
                threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
            }
        );

        sectionEls.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [links]);

    function easeOutCubic(t: number) {
        return 1 - Math.pow(1 - t, 3);
    }

    function smoothScrollToId(id: string, offset = HEADER_OFFSET) {
        const el = document.getElementById(id);
        if (!el) return;

        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - window.innerHeight;

        const startY = window.scrollY;

        // ✅ Clamp target so Home doesn't go negative and snap
        const rawTargetY = el.getBoundingClientRect().top + window.scrollY - offset;
        const targetY = Math.max(0, rawTargetY);

        const distance = targetY - startY;

        // ✅ Dynamic duration (prevents "snap" on short distances)
        const absDist = Math.abs(distance);
        const minDuration = 450;   // always at least this smooth
        const maxDuration = 900;   // don't get too slow
        const duration = Math.min(maxDuration, Math.max(minDuration, absDist * 0.6));

        let startTime: number | null = null;

        function step(ts: number) {
            if (startTime === null) startTime = ts;

            const elapsed = ts - startTime;
            const t = Math.min(1, elapsed / duration);
            const eased = easeOutCubic(t);

            const nextY = startY + distance * eased;
            window.scrollTo(0, nextY);

            // keep your progress bar in sync if you're doing that:
            if (scrollable > 0) {
                const p = nextY / scrollable;
                setProgress(Math.max(0, Math.min(1, p)));
            }

            if (t < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    return (
        <header className="header">
            {/* Top progress bar */}
            <div className="progressTrack" aria-hidden="true">
                <div className="progressBar" style={{ width: `${progress * 100}%` }} />
            </div>

            <div className="brand">
                𝕋
            </div>

            <nav className="header-right" aria-label="Primary">
                {links.map((l) => (
                    <a
                        key={l.id}
                        href={`#${l.id}`}
                        className={`navLink ${activeSection === l.id ? "active" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            smoothScrollToId(l.id);
                        }}
                    >
                        {l.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}