import { useMemo, useState } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ToNextComponentButton from "../../Utils/To_Next_Component_Button";
import "../Section.css";
import "./Contact.css";

type ContactLink = {
    kind: "email" | "linkedin" | "github";
    label: string;
    href: string;
};

export default function Contact() {
    const [flipped, setFlipped] = useState(false);
    const reduceMotion = useReducedMotion();

    const front = useMemo(
        () => ({
            topLeft: "304 290 4028",
            topRightLine1: "HENNING & INMAN",
            topRightLine2: "Software and Engineering",
            name: "Tanner Henning-Inman",
            title: "Full Stack Developer",
            bottom:
                "358 Exchange Place West Virginia, W.V. 10099  FAX 212 555 6390  TELEX 10 4534",
        }),
        []
    );

    const links: ContactLink[] = useMemo(
        () => [
            {
                kind: "email",
                label: "thenn0110@gmail.com",
                href: "mailto:thenn0110@gmail.com",
            },
            {
                kind: "linkedin",
                label: "https://www.linkedin.com/in/tanner-henning-inman-8203761b6/",
                href: "https://www.linkedin.com/in/tanner-henning-inman-8203761b6/",
            },
            {
                kind: "github",
                label: "github.com/your-handle",
                href: "https://github.com/your-handle",
            },
        ],
        []
    );

    const iconFor = (kind: ContactLink["kind"]) => {
        switch (kind) {
            case "email":
                return <Mail size={18} aria-hidden="true" />;
            case "github":
                return <Github size={18} aria-hidden="true" />;
            case "linkedin":
                return <Linkedin size={18} aria-hidden="true" />;
        }
    };

    const toggle = () => setFlipped((v) => !v);

    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
        }
    };

    return (
        <section id="contact" className="section contact">
            <div className="contact-inner">
                <div className="contact-titleWrap">
                    <h2 className="contact-title">Contact Me</h2>
                    <div className="contact-underline" aria-hidden="true" />
                </div>

                <div className="contact-stage">
                    <button
                        type="button"
                        className="psyCard"
                        onClick={toggle}
                        onKeyDown={onKeyDown}
                        aria-pressed={flipped}
                        aria-label={flipped ? "Flip card to front" : "Flip card to back"}
                    >
                        <motion.span
                            className="psyCard-inner"
                            style={{ transformStyle: "preserve-3d" }}
                            animate={{ rotateY: flipped ? 180 : 0 }}
                            transition={
                                reduceMotion
                                    ? { duration: 0 }
                                    : { type: "spring", stiffness: 260, damping: 26 }
                            }
                            whileHover={
                                reduceMotion
                                    ? undefined
                                    : { y: -2, rotateX: 2, rotateY: (flipped ? 180 : 0) + 1 }
                            }
                            whileTap={reduceMotion ? undefined : { scale: 0.995 }}
                        >
                            {/* FRONT */}
                            <span className="psyFace psyFront">
                                <span className="psyTopRow">
                                    <span className="psyTopLeft">{front.topLeft}</span>

                                    <span className="psyTopRight">
                                        <span className="psyFirm">{front.topRightLine1}</span>
                                        <span className="psyDept">{front.topRightLine2}</span>
                                    </span>
                                </span>

                                <span className="psyCenter">
                                    <span className="psyName">{front.name}</span>
                                    <span className="psyTitle">{front.title}</span>
                                </span>

                                <span className="psyBottom">{front.bottom}</span>

                                <span className="psyHint">Click to flip</span>
                            </span>

                            {/* BACK */}
                            <span className="psyFace psyBack">
                                <span className="psyBackHeader">CONTACT INFORMATION</span>
                                <span className="psyBackRule" aria-hidden="true" />

                                <span className="psyLinks">
                                    {links.map((l) => (
                                        <a
                                            key={l.kind}
                                            className="psyLink"
                                            href={l.href}
                                            target={l.kind === "email" ? undefined : "_blank"}
                                            rel={l.kind === "email" ? undefined : "noreferrer"}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <span className="psyIcon">{iconFor(l.kind)}</span>
                                            <span className="psyLinkText">{l.label}</span>
                                        </a>
                                    ))}
                                </span>

                                <span className="psyHint">Click to flip</span>
                            </span>
                        </motion.span>
                    </button>
                </div>
                <div className="contact-btnWrap">
                    <ToNextComponentButton targetId="home" label="Back To Home" />
                </div>
            </div>
        </section>
    );
}