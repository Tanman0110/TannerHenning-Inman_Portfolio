import React from "react";
import { smoothScrollToId } from "../../Utils/SmoothScroll";
import "../Section.css";
import "./Experience.css";

const HEADER_OFFSET = 85;

type Rotation = {
    title: string;
    range: string;
    bullets: string[];
};

const COMPANY = "UPMC - IT Rotational Program";
const RANGE = "Jul 2023 - Jun 2025";

const ROTATIONS: Rotation[] = [
    {
        title: "Enterprise Data Integrations - Software Engineer",
        range: "Jul 2023 - Dec 2023",
        bullets: [
            "Created a Dead Letter Queue that reduced ticketing for on call personal by 50%",
            "Revisited and revitalized old interfaces to handle more traffic",
            "Created an Azure Data Explorer Dashboard to easily view and monitor messages accross all interfaces"
        ]
    },
    {
        title: "Network Security Automation - Software Engineer",
        range: "Jan 2024 - Jun 2024",
        bullets: [
            "Developed tool to search legacy Firewall Exception Data from RSAM post ServiceNow go live",
            "Reworked Firewall Traffic monitoring tool backend to reduce search time from minutes to seconds",
            "Upgraded angular versioning from v12 to v18 for all NetSec projects"
        ]
    },
    {
        title: "Identity Management Systems - Software Engineer",
        range: "Jul 2024 - Dec 2024",
        bullets: [
            "Created an automation process to assign user training and approve users for access to EPIC once training was completed for over 100,000 employees",
            "Reduced codebase by writing script to automatically transform HTML files into JSON and import into database to dynamically load webpages",
            "Redesigned UI and backend services for 10+ year old tools to give a sleeker design, more rounded user experience, and responsive times"
        ]
    },
    {
        title: "Security Operations Center - Systems Analyst",
        range: "Jan 2025 - Jun 2025",
        bullets: [
            "Investigated and remediated potential security breaches by triaging and resolving SOC tickets.",
            "Performed log analysis and threat classification.",
            "Contributed to incident response documentation improvements."
        ]
    }
];

export default function Experience() {
    const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        smoothScrollToId("contact", HEADER_OFFSET);
    };

    return (
        <section id="experience" className="section experience">
            <div className="experience-inner">

                <div className="experience-titleWrap">
                    <h2 className="experience-title">My Experience</h2>
                    <div className="experience-underline" aria-hidden="true" />
                </div>


                <div className="experience-content">

                    <div className="experience-headRow">
                        <div className="experience-company">{COMPANY}</div>
                        <div className="experience-date">{RANGE}</div>
                    </div>

                    <div className="experience-rotations">
                        {ROTATIONS.map((r, idx) => (
                            <div key={`${r.title}-${idx}`} className="experience-rotation">
         
                                <div className="experience-rotationHead">
                                    <div className="experience-rotationTitle">{r.title}</div>
                                    <div className="experience-rotationDate">{r.range}</div>
                                </div>

                                <ul className="experience-bullets">
                                    {r.bullets.map((b, i) => (
                                        <li key={i} className="experience-bullet">
                                            {b}
                                        </li>
                                    ))}
                                </ul>

                                {idx !== ROTATIONS.length - 1 && (
                                    <div className="experience-divider" aria-hidden="true" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="experience-btnWrap">
                    <a
                        href="#contact"
                        className="experience-btn"
                        onClick={handleScrollToContact}
                    >
                        Contact Me
                    </a>
                </div>
            </div>
        </section>
    );
}