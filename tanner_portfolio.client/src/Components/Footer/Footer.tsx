import { useEffect, useState } from "react";
import "./Footer.css";

export default function Footer() {
    const year = new Date().getFullYear();
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: "America/New_York",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });

            setTime(formatter.format(new Date()));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-left">
                    <div className="footer-label">LOCATION</div>
                    <div>Eastern Time · {time}</div>
                </div>

                <div className="footer-center">
                    <div className="footer-brand">𝕋</div>
                </div>

                <div className="footer-right">
                    <div className="footer-label">SYSTEM</div>
                    <div>© {year} · Powered by React</div>
                </div>
            </div>
        </footer>
    );
}