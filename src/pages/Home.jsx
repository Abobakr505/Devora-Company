// src/pages/Home.jsx
import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero.jsx";
import TechMarquee from "../components/TechMarquee/TechMarquee.jsx";
import About from "../components/About/About.jsx";
import Services from "../components/Services/Services.jsx";
import Projects from "../components/Projects/Projects.jsx";
import WhyDevora from "../components/WhyDevora/WhyDevora.jsx";
import Process from "../components/Process/Process.jsx";
import TechStack from "../components/TechStack/TechStack.jsx";
import CTA from "../components/CTA/CTA.jsx";
import Contact from "../components/Contact/Contact.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t.meta.description);
  }, [t]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Services />
        <Projects />
        <WhyDevora />
        <Process />
        <TechStack />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}