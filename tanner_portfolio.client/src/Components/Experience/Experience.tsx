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
            "Developed message router applications to support safe, secure transport of patient data across 9 electronic health records.",
            "Improved message throughput by optimizing transformation pipelines.",
            "Collaborated with cross-functional teams to ensure HL7/FHIR compliance."
        ]
    },
    {
        title: "Network Security Automation - Software Engineer",
        range: "Jan 2024 - Jun 2024",
        bullets: [
            "Built automation tools to help Network Security Operations complete firewall-related tasks more efficiently.",
            "Reduced manual configuration time by implementing scripting workflows.",
            "Created logging and monitoring utilities for automation reliability."
        ]
    },
    {
        title: "Identity Management Systems - Software Engineer",
        range: "Jul 2024 - Dec 2024",
        bullets: [
            "Created an automation process for UPMC Bridges enabling access to a new EPIC instance for 100,000+ users.",
            "Improved provisioning reliability through validation and audit logging.",
            "Assisted in role-based access model refinement."
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