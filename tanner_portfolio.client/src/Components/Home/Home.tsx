import "../Section.css";
import "./Home.css";

export default function Home() {
    return (
        <section id="home" className="home">
            <div className="home-content">
                <h1 className="home-line">Thoughtful Code</h1>
                <h1 className="home-line">Reliable Systems</h1>

                <p className="home-subtitle">
                    Tanner Henning-Inman — Full Stack Developer
                </p>
            </div>
        </section>
    );
}