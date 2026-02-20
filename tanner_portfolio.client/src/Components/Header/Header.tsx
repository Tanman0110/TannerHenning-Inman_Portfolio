import { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/west-virginia-logo.png";

const HEADER_OFFSET = 85;

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

function clamp01(n: number) {
    return Math.max(0, Math.min(1, n));
}

export default function Header() {
    const [progress, setProgress] = useState(0); // 0..1

    // Use this for normal/manual scrolling
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

    // Programmatic scroll that updates progress using the *intended* y position
    const smoothScrollToId = (id: string, offset = HEADER_OFFSET, duration = 650) => {
        const el = document.getElementById(id);
        if (!el) return;

        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - window.innerHeight;

        const startY = window.scrollY;
        const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
        const distance = targetY - startY;

        let startTime: number | null = null;

        function step(ts: number) {
            if (startTime === null) startTime = ts;

            const elapsed = ts - startTime;
            const t = Math.min(1, elapsed / duration);
            const eased = easeOutCubic(t);

            const nextY = startY + distance * eased;
            window.scrollTo(0, nextY);

            // ✅ Update bar from the same "nextY" we just scrolled to
            const p = scrollable > 0 ? nextY / scrollable : 0;
            setProgress(clamp01(p));

            if (t < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    };

    return (
        <header className="header">
            {/* Progress bar (always left-anchored) */}
            <div className="progressTrack" aria-hidden="true">
                <div className="progressBar" style={{ width: `${progress * 100}%` }} />
            </div>

            <div className="header-left">
                <img src={logo} alt="WV Logo" className="logo" />
            </div>

            <nav className="header-right">
                <a
                    href="#home"
                    onClick={(e) => {
                        e.preventDefault();
                        smoothScrollToId("home");
                    }}
                >
                    Home
                </a>
                <a
                    href="#about"
                    onClick={(e) => {
                        e.preventDefault();
                        smoothScrollToId("about");
                    }}
                >
                    About
                </a>
                <a
                    href="#projects"
                    onClick={(e) => {
                        e.preventDefault();
                        smoothScrollToId("projects");
                    }}
                >
                    Projects
                </a>
                <a
                    href="#contact"
                    onClick={(e) => {
                        e.preventDefault();
                        smoothScrollToId("contact");
                    }}
                >
                    Contact
                </a>
            </nav>
        </header>
    );
}