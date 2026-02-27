import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Skills from "./Components/Skills/Skills";
import Projects from "./Components/Projects/Projects";
import Experience from "./Components/Experience/Experience";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import "./App.css";
import "./Components/Section.css";

function App() {
    return (
        <>
            <Header />
            <main>
                <Home />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
                <Footer />
            </main>
        </>
    );
}

export default App;