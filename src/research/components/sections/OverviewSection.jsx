import { useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { T, cardBase } from "../../constants/designTokens.js";
import { CHART_DATA, PERFORMANCE_DATA, STAT_CARDS } from "../../constants/data.js";
import { useIntersectionReveal } from "../../hooks/useIntersectionReveal.js";
import { useMobileDetect } from "../../hooks/useMobileDetect.js";
import { DotGrid } from "../DotGrid";
import { StatCard } from "../cards/StatCard.jsx";
import { SectionEyebrow } from "../ui/SectionEyebrow.jsx";
import { SectionSub } from "../ui/SectionSub.jsx";
import { Divider } from "../ui/Divider.jsx";
import { AnimatedBar } from "../charts/AnimatedBar.jsx";
import { AnimatedLineDot } from "../charts/AnimatedLineDot.jsx";
import { CustomTooltip } from "../charts/CustomTooltip.jsx";

export const OverviewSection = ({ sectionRef, visible }) => {
  const [chartRef, chartReady] = useIntersectionReveal(0.3);
  const { isMobile } = useMobileDetect();

  const darkBarShape = useCallback(p => <AnimatedBar {...p} fill="#4a4a4a" ready={chartReady} isActive={p.activeBar} />, [chartReady]);
  const lightBarShape = useCallback(p => <AnimatedBar {...p} fill="#787878" ready={chartReady} isActive={p.activeBar} />, [chartReady]);

  const fpsDot = useMemo(() => {
    const Component = (props) => <AnimatedLineDot {...props} fill="#c8c8c8" ready={chartReady} index={props.index ?? 0} />;
    Component.displayName = "LineDot_fps";
    return Component;
  }, [chartReady]);

  const budgetDot = useMemo(() => {
    const Component = (props) => <AnimatedLineDot {...props} fill="#484848" ready={chartReady} index={props.index ?? 0} />;
    Component.displayName = "LineDot_budget";
    return Component;
  }, [chartReady]);

  return (
    <div ref={sectionRef} id="overview-section">
      <div style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${T.border}`, paddingBottom: isMobile ? "50px" : "95px" }}>
        <DotGrid />
        <div className={`fade-in ${visible ? "visible" : ""}`} style={{ position: "relative", zIndex: 1, maxWidth: "760px", margin: "0 auto", padding: isMobile ? "100px 16px 40px" : "160px 24px 60px", textAlign: "center", pointerEvents: "none" }}>
          <SectionEyebrow style={{ display: "inline-block", background: "#000000", padding: isMobile ? "2px 8px" : "3px 10px", borderRadius: "4px" }}>Research Overview</SectionEyebrow>
          <h1 className="heading-text" style={{ fontSize: isMobile ? "clamp(24px,8vw,30px)" : "clamp(30px,5vw,52px)", lineHeight: 1.12, marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Optimization in Game Development<br /><span style={{ opacity: 0.5 }}>A Field in Tension</span>
          </h1>
          <p style={{ fontSize: isMobile ? "13px" : "14px", color: "white", lineHeight: 1.8, maxWidth: "420px", margin: "8px auto 0", textAlign: "justify", textAlignLast: "center", textShadow: "2px 2px 0 #000, -2px -2px 0 #000", padding: isMobile ? "0 12px" : "0" }}>
            Performance optimization in games has evolved from byte-level craft to an industry-scale discipline — defined equally by innovation and regression.
          </p>
        </div>
      </div>

      <div className={`fade-in ${visible ? "visible" : ""}`} style={{
        maxWidth: "960px",
        margin: isMobile ? "-50px auto 40px" : "-95px auto 80px",
        padding: "0 16px",
        display: "flex",
        gap: isMobile ? "10px" : "20px",
        flexWrap: "wrap",
        justifyContent: "center",
        position: "relative",
        zIndex: 2
      }}>
        {STAT_CARDS.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <Divider />

      <div style={{ padding: isMobile ? "40px 16px" : "80px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "52px" }}>
            <SectionEyebrow>Quantitative Trends</SectionEyebrow>
            <h2 className="heading-text" style={{ fontSize: "clamp(22px,3vw,30px)", marginBottom: "10px", lineHeight: 1.2 }}>Growth, Complexity & Performance</h2>
            <SectionSub>Tracking key indicators across two decades of commercial game development.</SectionSub>
          </div>
          <div ref={chartRef} className="chart-grid">
            <div style={{ ...cardBase, padding: isMobile ? "16px 12px" : "28px 20px" }}>
              <div style={{ fontSize: isMobile ? "12px" : "13px", fontWeight: "700", color: T.text, marginBottom: "4px" }}>Game Size vs. Performance Reports</div>
              <div style={{ fontSize: isMobile ? "10px" : "11px", color: T.muted, marginBottom: isMobile ? "12px" : "22px", lineHeight: 1.6 }}>Average install size (GB) alongside indexed performance bug reports at launch</div>
              <ResponsiveContainer width="100%" height={isMobile ? 180 : 210}>
                <BarChart data={CHART_DATA} barGap={4} syncId="year-sync" syncMethod="value" margin={{ left: 0, right: 16, top: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1c1c" />
                  <XAxis dataKey="year" tick={{ fontSize: isMobile ? 8 : 10, fill: T.muted }} axisLine={{ stroke: T.border }} tickLine={false} />
                  <YAxis width={isMobile ? 28 : 32} tick={{ fontSize: isMobile ? 8 : 10, fill: T.muted }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.06)" }} />
                  <Legend wrapperStyle={{ fontSize: isMobile ? "9px" : "11px", color: T.mutedHi }} />
                  <Bar dataKey="avgSize" name="Avg Game Size" fill="#4a4a4a" shape={darkBarShape} />
                  <Bar dataKey="bugReports" name="Perf. Reports" fill="#787878" shape={lightBarShape} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ ...cardBase, padding: isMobile ? "16px 12px" : "28px 20px" }}>
              <div style={{ fontSize: isMobile ? "12px" : "13px", fontWeight: "700", color: T.text, marginBottom: "4px" }}>Frame Stability vs. Development Cost</div>
              <div style={{ fontSize: isMobile ? "10px" : "11px", color: T.muted, marginBottom: isMobile ? "12px" : "22px", lineHeight: 1.6 }}>Launch-day frame stability index (%) against average production budgets (USD millions)</div>
              <ResponsiveContainer width="100%" height={isMobile ? 180 : 210}>
                <LineChart data={PERFORMANCE_DATA} syncId="year-sync" syncMethod="value" margin={{ left: 0, right: 16, top: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1c1c" />
                  <XAxis dataKey="year" tick={{ fontSize: isMobile ? 8 : 10, fill: T.muted }} axisLine={{ stroke: T.border }} tickLine={false} />
                  <YAxis width={isMobile ? 28 : 32} tick={{ fontSize: isMobile ? 8 : 10, fill: T.muted }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 }} />
                  <Legend wrapperStyle={{ fontSize: isMobile ? "9px" : "11px", color: T.mutedHi }} />
                  <Line type="monotone" dataKey="fps" name="Perf. Index" stroke="#c8c8c8" strokeWidth={2} dot={fpsDot} activeDot={{ r: isMobile ? 4 : 5, fill: "#ffffff", stroke: "#ffffff", strokeWidth: 0, filter: "drop-shadow(0 0 6px #fff)" }} strokeDasharray={chartReady ? "0" : "1000"} className={`line-animated${chartReady ? " ready" : ""}`} />
                  <Line type="monotone" dataKey="budget" name="Budget ($M)" stroke="#484848" strokeWidth={2} dot={budgetDot} activeDot={{ r: isMobile ? 4 : 5, fill: "#888888", stroke: "#888888", strokeWidth: 0, filter: "drop-shadow(0 0 6px #888)" }} strokeDasharray={chartReady ? "5 3" : "1000"} className={`line-animated${chartReady ? " ready.delay" : ""}`} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p style={{ fontSize: isMobile ? "9px" : "11px", color: T.muted, textAlign: "center", marginTop: "16px", fontStyle: "italic", padding: isMobile ? "0 12px" : "0" }}>Note: Performance index and bug report data are derived from aggregated industry post-mortems and launch reviews. Figures represent indicative trends.</p>
        </div>
      </div>
    </div>
  );
};