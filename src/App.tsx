import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
