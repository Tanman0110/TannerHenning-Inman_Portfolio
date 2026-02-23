import React from "react";
import { Construction } from "lucide-react";
import { smoothScrollToId } from "../../Utils/SmoothScroll";
import "../Section.css";
import "./Projects.css";

export default function Projects() {
    const HEADER_OFFSET = 85;

    const handleScrollToExperience = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        smoothScrollToId("experience", HEADER_OFFSET);
    };

    return (
        <section id="projects" className="section projects">
            <div className="projects-inner">
                {/* Top title */}
                <div className="projects-titleWrap">
                    <h2 className="projects-title">My Projects</h2>
                    <div className="projects-underline" aria-hidden="true" />
                </div>

                {/* Main stage */}
                <div className="projects-stage" role="status" aria-label="Projects under construction">
                    <div className="projects-iconWrap" aria-hidden="true">
                        <Construction className="projects-icon" />
                    </div>

                    <p className="projects-note">
                        I don’t currently have personal projects available to showcase, though several are in development.
                        Due to confidentiality agreements, I’m unable to share work completed for previous employers.
                    </p>
                </div>

                {/* Bottom button */}
                <div className="skills-btnWrap">
                    <a href="#experience" className="projects-btn" onClick={handleScrollToExperience}>
                        My Experience
                    </a>
                </div>
            </div>
        </section>
    );
}