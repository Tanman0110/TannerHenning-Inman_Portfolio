import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Skills from "./Components/Skills/Skills";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import "./App.css";
import "./Components/Section.css"; // master section styles

function App() {
    return (
        <>
            <Header />
            <main>
                <Home />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
            </main>
        </>
    );
}

export default App;