import React from "react";
import { Construction } from "lucide-react";
import "../Section.css";
import "./Projects.css";
import ToNextComponentButton from "../../Utils/To_Next_Component_Button";

export default function Projects() {

    return (
        <section id="projects" className="section projects">
            <div className="projects-inner">

                <div className="projects-titleWrap">
                    <h2 className="projects-title">My Projects</h2>
                    <div className="projects-underline" aria-hidden="true" />
                </div>

                <div className="projects-stage" role="status" aria-label="Projects under construction">
                    <div className="projects-iconWrap" aria-hidden="true">
                        <Construction className="projects-icon" />
                    </div>

                    <p className="projects-note">
                        I don’t currently have personal projects available to showcase, though several are in development.
                        Due to confidentiality agreements, I’m unable to share work completed for previous employers.
                    </p>
                </div>

                <div className="projects-btnWrap">
                    <ToNextComponentButton targetId="experience" label="My Experience" />
                </div>
            </div>
        </section>
    );
}