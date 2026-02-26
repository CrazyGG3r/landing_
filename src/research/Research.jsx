import { useState, useEffect, useRef, useCallback } from "react";
import { T } from "./constants/designTokens.js";
import { GLOBAL_CSS } from "./styles/global.css.js";
import { useFontLoader } from "./hooks/useFontLoader.js";
import { useDisableInteractions } from "./hooks/useDisableInteractions.js";
import { usePreventHorizontalScroll } from "./hooks/usePreventHorizontalScroll.js";
import { useOrientationHandler } from "./hooks/useOrientationHandler.js";
import { useMobileDetect } from "./hooks/useMobileDetect.js";
import { Header } from "./components/sections/Header.jsx";
import { OverviewSection } from "./components/sections/OverviewSection.jsx";
import { TimelineSection } from "./components/sections/TimelineSection.jsx";
import { ResearchSection } from "./components/sections/ResearchSection.jsx";
import { CreditsSection } from "./components/sections/CreditsSection.jsx";
import { Divider } from "./components/ui/Divider.jsx";

export default function Research() {
  useFontLoader("https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;0,800;1,400&display=swap");
  useDisableInteractions();
  usePreventHorizontalScroll();
  const viewportHeight = useOrientationHandler();
  const { isMobile, orientation } = useMobileDetect();

  const [activeSection, setActiveSection] = useState("overview");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visible, setVisible] = useState(false);
  const activeSectionRef = useRef("overview");
  const scrollAnimRef = useRef(0);
  const transitionRef = useRef(false);
  const headerHeight = isMobile ? 82 : 92;

  const sectionRefs = {
    overview: useRef(null),
    timeline: useRef(null),
    research: useRef(null),
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    if (isMobile) return;

    const root = document.documentElement;
    let raf = 0;
    let lastX = null;
    let targetOffset = 0;
    let offset = 0;

    const tick = () => {
      offset += (targetOffset - offset) * 0.16;
      targetOffset *= 0.9;
      root.style.setProperty("--title-grad-offset", `${50 + offset}%`);

      if (Math.abs(offset) > 0.08 || Math.abs(targetOffset) > 0.08) {
        raf = requestAnimationFrame(tick);
      } else {
        offset = 0;
        targetOffset = 0;
        root.style.setProperty("--title-grad-offset", "50%");
        raf = 0;
      }
    };

    const onMouseMove = e => {
      if (lastX !== null) {
        const dx = e.clientX - lastX;
        targetOffset = Math.max(-45, Math.min(45, targetOffset + dx * 0.45));
        if (!raf) raf = requestAnimationFrame(tick);
      }
      lastX = e.clientX;
    };

    const onMouseLeave = () => {
      lastX = null;
      targetOffset = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const navigateToSection = useCallback(section => {
    const targetNode = sectionRefs[section]?.current;
    if (!targetNode) return;

    if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);

    const startY = window.scrollY;
    const headerOffset = headerHeight;
    const targetY = Math.max(0, targetNode.getBoundingClientRect().top + window.scrollY - headerOffset);
    const distance = targetY - startY;

    setActiveSection(section);
    activeSectionRef.current = section;

    if (Math.abs(distance) < 2) return;

    transitionRef.current = true;
    setIsTransitioning(true);
    const duration = isMobile ? Math.min(600, Math.abs(distance) * 0.5) : Math.min(900, Math.max(420, Math.abs(distance) * 0.6));
    const startTs = performance.now();
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const step = now => {
      const p = Math.min(1, (now - startTs) / duration);
      const eased = easeOutCubic(p);
      window.scrollTo(0, startY + distance * eased);
      if (p < 1) {
        scrollAnimRef.current = requestAnimationFrame(step);
      } else {
        transitionRef.current = false;
        setIsTransitioning(false);
        scrollAnimRef.current = 0;
      }
    };

    scrollAnimRef.current = requestAnimationFrame(step);
  }, [headerHeight, isMobile]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (transitionRef.current) return;
      
      const sp = window.scrollY + headerHeight + 8;
      let next = "overview";
      
      if (sectionRefs.research.current && sp >= sectionRefs.research.current.offsetTop - (isMobile ? 150 : 200)) {
        next = "research";
      } else if (sectionRefs.timeline.current && sp >= sectionRefs.timeline.current.offsetTop - (isMobile ? 150 : 200)) {
        next = "timeline";
      }

      if (next !== activeSectionRef.current) {
        activeSectionRef.current = next;
        setActiveSection(next);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerHeight, isMobile]);

  useEffect(() => () => {
    if (scrollAnimRef.current) {
      cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = 0;
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      minHeight: `calc(${viewportHeight}px)`,
      background: T.bg,
      fontFamily: T.fontSans,
      color: T.text,
      overflowX: "hidden",
      width: "100%",
      position: "relative",
    }}>
      <style>{GLOBAL_CSS}</style>
      <div className={`page-transition-overlay ${isTransitioning ? "active" : ""}`} />
      <Header activeSection={activeSection} onNavigate={navigateToSection} headerHeight={headerHeight} />
      <div style={{ paddingTop: `${headerHeight}px` }}>
        <OverviewSection sectionRef={sectionRefs.overview} visible={visible} />
        <Divider />
        <TimelineSection sectionRef={sectionRefs.timeline} />
        <Divider />
        <ResearchSection sectionRef={sectionRefs.research} />
        <Divider />
        <CreditsSection />
        <Divider />
        <div style={{
          padding: isMobile ? "20px 20px" : "28px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${T.border}`,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "12px" : "0",
        }}>
          <div className="heading-text" style={{ fontSize: isMobile ? "14px" : "15px" }}>OPTIMIZATION RESEARCH</div>
          <div style={{ fontSize: isMobile ? "10px" : "11px", color: T.muted, letterSpacing: "0.05em", textAlign: isMobile ? "center" : "right" }}>Research compiled by Muhammad Uzair (22K-5176) · BSE-8A · 2026</div>
        </div>
        <div style={{
          padding: isMobile ? "12px 20px" : "14px 40px",
          borderTop: "1px solid #171919",
          background: "#080909",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          flexWrap: "wrap",
        }}>
          <span style={{ fontSize: isMobile ? "10px" : "11px", color: "#3a3f3f", letterSpacing: "0.08em", fontFamily: T.fontSans }}>© {new Date().getFullYear()}</span>
          <span className="heading-text" style={{ fontSize: isMobile ? "10px" : "11px", letterSpacing: "0.12em" }}>BOLTFORGED</span>
          <span style={{ fontSize: isMobile ? "10px" : "11px", color: "#3a3f3f", letterSpacing: "0.08em", fontFamily: T.fontSans }}>· All Rights Reserved</span>
        </div>
      </div>
    </div>
  );
}