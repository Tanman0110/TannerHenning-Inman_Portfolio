import "../Section.css";
import "./Home.css";
import React from "react";
import { smoothScrollToId } from "../../Utils/SmoothScroll";
import ToNextComponentButton from "../../Utils/To_Next_Component_Button";

export default function Home() {

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

                <ToNextComponentButton targetId="about" label="Learn About Me" />
            </div>
        </section>
    );
}