import "./Footer.css";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-name">
                © {year} Tanner Henning-Inman
            </div>
        </footer>
    );
}