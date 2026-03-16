import React, { useRef, useState } from "react";
import { ExternalLink, Pause, Play } from "lucide-react";
import "../Section.css";
import "./Projects.css";
import ToNextComponentButton from "../../Utils/To_Next_Component_Button";

import musicWrappedPoster from "../../assets/music-wrapped-poster.jpeg";
import musicWrappedDemo from "../../assets/music-wrapped-demo.mp4";

export default function Projects() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = async () => {
        const video = videoRef.current;
        if (!video) return;

        try {
            await video.play();
            setIsPlaying(true);
        } catch (error) {
            console.error("Video failed to play:", error);
        }
    };

    return (
        <section id="projects" className="section projects">
            <div className="projects-inner">
                <div className="projects-titleWrap">
                    <h2 className="projects-title">My Projects</h2>
                    <div className="projects-underline" aria-hidden="true" />
                </div>

                <div className="projects-stage">
                    <div className="project-item">
                        <h3 className="project-item-title">Music Wrapped</h3>

                        <div className="project-videoShell">
                            <video
                                ref={videoRef}
                                className="project-video"
                                poster={musicWrappedPoster}
                                preload="metadata"
                                playsInline
                                controls
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onEnded={() => setIsPlaying(false)}
                                aria-label="Music Wrapped demo video"
                            >
                                <source src={musicWrappedDemo} type="video/mp4" />
                            </video>

                            {!isPlaying && (
                                <button
                                    type="button"
                                    className="project-videoOverlay"
                                    onClick={handlePlay}
                                    aria-label="Play Music Wrapped demo"
                                >
                                    <span className="project-videoOverlayInner">
                                        <Play className="project-videoIcon project-videoIconPlay" />
                                    </span>
                                </button>
                            )}
                        </div>

                        <div className="project-actions">
                            <a
                                className="to-next-btn project-linkBtn"
                                href="https://tanman0110.github.io/Music_Wrapped/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Open Music Wrapped website"
                            >
                                <span>View Website</span>
                                <ExternalLink size={18} />
                            </a>

                            <ToNextComponentButton
                                targetId="experience"
                                label="My Experience"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}