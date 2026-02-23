import "../Section.css";
import "./Home.css";
import React from "react";
import { smoothScrollToId } from "../../Utils/SmoothScroll";

export default function Home() {
    const HEADER_OFFSET = 85;
    const handleScrollToAbout = (
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        e.preventDefault();
        smoothScrollToId("about", HEADER_OFFSET);
    };

    return (
        <section id="home" className="home">
            <div className="home-content">
                <h1 className="home-line">
                    Thoughtful Code
                </h1>
                <h1 className="home-line">
                    Reliable Systems
                </h1>

                <p className="home-subtitle">
                    Tanner Henning-Inman — Full Stack Developer
                </p>

                <a
                    href="#about"
                    className="home-btn"
                    onClick={handleScrollToAbout}
                >
                    Learn About Me
                </a>
            </div>
        </section>
    );
}