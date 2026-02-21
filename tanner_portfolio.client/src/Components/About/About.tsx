import "../Section.css";
import "./About.css";
import { smoothScrollToId } from "../../Utils/SmoothScroll";

export default function About() {

    const HEADER_OFFSET = 85;

    const handleScrollToSkills = (
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        e.preventDefault();
        smoothScrollToId("skills", HEADER_OFFSET);
    };

    return (
        <section id="about" className="section about">
            <div className="about-inner">
                {/* Top title */}
                <div className="about-titleWrap">
                    <h2 className="about-title">Tanner Henning-Inman</h2>
                    <div className="about-underline" aria-hidden="true" />
                </div>

                {/* Main grid */}
                <div className="about-grid">
                    {/* LEFT COLUMN */}
                    <div className="about-left">
                        <div className="about-photoWrap">
                            <img
                                className="about-photo"
                                src="/src/assets/headshot.jpeg"
                                alt="Tanner Henning-Inman"
                            />
                            <a
                                href="#about"
                                className="about-btn"
                                onClick={handleScrollToSkills}
                            >
                                My Skills
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="about-content">
                        <h3 className="about-kicker">About Me</h3>

                        <div className="about-body">
                            <p>
                                Born and raised in Morgantown, West Virginia,
                                I earned my degree in Management Information Systems from West Virginia University.
                                What started as a genuine curiosity for technology
                                grew into a career focused on building thoughtful, reliable systems.
                            </p>
                            <p>
                                After graduation, I moved to Pittsburgh to join UPMC’s IT Rotational Program,
                                where I spent two years rotating through four different areas of IT.
                                That experience gave me a broad foundation in systems, collaboration,
                                and enterprise-scale problem solving — and helped shape the way I approach software development today.
                            </p>
                            <p>
                                I’ve since returned home to Morgantown,
                                where I continue to refine my craft and build modern web applications with precision and intention.
                            </p>
                            <p>
                                Outside of work, you’ll find me playing guitar,
                                camping with my dog Beau, or diving into a good video game.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}