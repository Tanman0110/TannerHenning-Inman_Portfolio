import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import "./Components/Section.css"; // master section styles

function App() {
    return (
        <>
            <Header />
            <main>
                <Home />
                <About />
                <Projects />
                <Contact />
            </main>
        </>
    );
}

export default App;