import React, { useRef, useState } from "react";
import {
    BarChart3,
    Cloud,
    ExternalLink,
    KeyRound,
    Mail,
    Music,
    Play,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
} from "lucide-react";
import "../Section.css";
import "./Projects.css";
import ToNextComponentButton from "../../Utils/To_Next_Component_Button";

import musicWrappedPoster from "../../assets/music-wrapped-poster.jpeg";
import musicWrappedDemo from "../../assets/music-wrapped-demo-web.mp4";
import beauNorthImage from "../../assets/beaunorth.png";

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
                    <div className="projects-grid">
                        <article className="project-card project-card-featured">
                            <div className="project-card-content">
                                <p className="project-kicker">Full-Stack E-Commerce</p>

                                <h3 className="project-item-title">Beau North</h3>

                                <p className="project-description">
                                    A modern e-commerce storefront built with React, ASP.NET
                                    Core, Entity Framework, PostgreSQL, PayPal Checkout, email
                                    confirmations, and Azure deployment.
                                </p>

                                <div className="project-featureGrid" aria-label="Beau North features">
                                    <div className="project-feature">
                                        <ShoppingBag size={18} />
                                        <span>Product catalog, cart, checkout, and admin tools</span>
                                    </div>

                                    <div className="project-feature">
                                        <ShieldCheck size={18} />
                                        <span>JWT auth, protected admin routes, and secure configuration</span>
                                    </div>

                                    <div className="project-feature">
                                        <Mail size={18} />
                                        <span>Customer order emails and internal notifications</span>
                                    </div>

                                    <div className="project-feature">
                                        <Cloud size={18} />
                                        <span>Deployed through Azure with CI/CD pipeline planning</span>
                                    </div>
                                </div>

                                <div className="project-techList" aria-label="Beau North technologies">
                                    <span>React</span>
                                    <span>ASP.NET Core</span>
                                    <span>PostgreSQL</span>
                                    <span>EF Core</span>
                                    <span>PayPal</span>
                                    <span>Azure</span>
                                </div>

                                <div className="project-actions project-actions-left">
                                    <a
                                        className="to-next-btn project-linkBtn"
                                        href="https://www.beaunorth.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Open Beau North website"
                                    >
                                        <span>View Website</span>
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>

                            <div className="project-imageShell">
                                <img
                                    className="project-image"
                                    src={beauNorthImage}
                                    alt="Beau North storefront preview"
                                />
                            </div>
                        </article>

                        <article className="project-card project-card-featured">
                            <div className="project-card-content">
                                <p className="project-kicker">Spotify API Project</p>

                                <h3 className="project-item-title">Music Wrapped</h3>

                                <p className="project-description">
                                    A Spotify-inspired listening recap app that uses OAuth with
                                    PKCE to securely connect a user’s Spotify account, analyze top
                                    tracks and artists, and turn the results into an interactive
                                    wrapped-style dashboard.
                                </p>

                                <div className="project-featureGrid" aria-label="Music Wrapped features">
                                    <div className="project-feature">
                                        <KeyRound size={18} />
                                        <span>Spotify OAuth login with PKCE token exchange</span>
                                    </div>

                                    <div className="project-feature">
                                        <Music size={18} />
                                        <span>Pulls top tracks and artists from the Spotify API</span>
                                    </div>

                                    <div className="project-feature">
                                        <BarChart3 size={18} />
                                        <span>Builds stats for top albums, recurring artists, and listening patterns</span>
                                    </div>

                                    <div className="project-feature">
                                        <Sparkles size={18} />
                                        <span>Animated wrapped-style slideshow with selectable time ranges</span>
                                    </div>
                                </div>

                                <div className="project-techList" aria-label="Music Wrapped technologies">
                                    <span>React</span>
                                    <span>TypeScript</span>
                                    <span>Spotify API</span>
                                    <span>OAuth 2.0</span>
                                    <span>PKCE</span>
                                    <span>Vite</span>
                                </div>

                                <div className="project-actions project-actions-left">
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
                                </div>
                            </div>

                            <div className="project-videoShell project-videoShell-featured">
                                <video
                                    ref={videoRef}
                                    className="project-video"
                                    poster={musicWrappedPoster}
                                    preload="auto"
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
                        </article>
                    </div>
                </div>

                <div className="projects-btnWrap">
                    <ToNextComponentButton
                        targetId="experience"
                        label="My Experience"
                    />
                </div>
            </div>
        </section>
    );
}