export const TIMELINE_DATA = [
  { era: "1970s", label: "Assembly Era", desc: "Games written in raw assembly language. Every byte and CPU cycle was manually controlled. Hardware limitations forced radical creativity in optimization." },
  { era: "1990s", label: "3D Transition", desc: "Introduction of 3D graphics demanded new techniques: BSP trees, Z-buffering, and texture atlasing. Developers invented optimization strategies that still underpin modern engines." },
  { era: "2000s", label: "Shader Revolution", desc: "Programmable GPUs shifted optimization from the CPU to the GPU. Shader-based pipelines enabled real-time lighting and shadows previously considered impossible." },
  { era: "2010s", label: "Hardware Abundance", desc: "Multi-core CPUs and high-RAM systems led to reduced optimization pressure. Studios began prioritizing rapid development cycles over lean, efficient code." },
  { era: "2020s", label: "Renaissance & Crisis", desc: "A paradox emerged: hardware is more powerful than ever, yet high-profile releases consistently suffer poor performance. Simultaneously, techniques like DLSS and Nanite signal a new optimization frontier." },
];

export const CHART_DATA = [
  { year: "2000", avgSize: 0.7, bugReports: 12 },
  { year: "2005", avgSize: 4, bugReports: 18 },
  { year: "2010", avgSize: 15, bugReports: 27 },
  { year: "2015", avgSize: 40, bugReports: 45 },
  { year: "2020", avgSize: 80, bugReports: 78 },
  { year: "2024", avgSize: 130, bugReports: 112 },
];

export const PERFORMANCE_DATA = [
  { year: "2000", fps: 60, budget: 5 },
  { year: "2005", fps: 60, budget: 20 },
  { year: "2010", fps: 58, budget: 60 },
  { year: "2015", fps: 52, budget: 100 },
  { year: "2020", fps: 44, budget: 200 },
  { year: "2024", fps: 38, budget: 300 },
];

export const IMPACT_META = {
  Critical: { color: "#c0392b", spotlight: "rgba(192,57,43,0.28)" },
  High: { color: "#c8c8c8", spotlight: "rgba(220,220,220,0.15)" },
  Moderate: { color: "#686868", spotlight: "rgba(104,104,104,0.2)" },
  Emerging: { color: "#484848", spotlight: "rgba(72,72,72,0.2)" },
};

export const RESEARCH_QUESTIONS = [
  { id: 1, category: "Performance", impact: "Critical", title: "The Frame Budget Problem", desc: "As development budgets scale exponentially, average frame rates at launch continue to decline. What systemic development practices contribute to this inverse relationship?" },
  { id: 2, category: "Architecture", impact: "High", title: "Data-Oriented Design Adoption", desc: "Data-Oriented Design (DOD) demonstrably improves cache efficiency and CPU throughput. Why has Object-Oriented Programming remained dominant in commercial game development despite evidence favoring DOD?" },
  { id: 3, category: "Hardware", impact: "High", title: "GPU Memory Bandwidth Limits", desc: "Modern rendering pipelines are increasingly bottlenecked by memory bandwidth rather than raw compute. How should engine architectures adapt to prioritize data locality over parallelism?" },
  { id: 4, category: "Tooling", impact: "Moderate", title: "Profiling in Production", desc: "Most performance profiling occurs late in the development cycle. Can continuous integration pipelines incorporate automated performance regression detection at scale?" },
  { id: 5, category: "Industry", impact: "Moderate", title: "Crunch vs. Optimization", desc: "Optimization requires iterative, unhurried testing. Studio crunch culture fundamentally conflicts with this requirement. How does production timeline pressure quantifiably affect shipped game performance?" },
  { id: 6, category: "Techniques", impact: "Emerging", title: "Upscaling as a Crutch", desc: "Techniques like DLSS and FSR allow games to render at lower native resolutions and upscale. Does widespread adoption of upscaling reduce incentive for underlying engine optimization?" },
];

export const RQ_CATEGORIES = ["All", "Performance", "Architecture", "Hardware", "Tooling", "Industry", "Techniques"];

export const STAT_CARDS = [
  { value: "130 GB", label: "Avg. AAA Game Size", sub: "Up from ~700 MB in 2000" },
  { value: "38%", label: "Performance Index", sub: "Avg. launch-day frame stability" },
  { value: "$300M+", label: "Avg. AAA Budget", sub: "2023 productions" },
  { value: "3 of 5", label: "Major 2023 Releases", sub: "Required post-launch patches" },
];

export const CURVED_LOOPS = [
  { marqueeText: "BOLTFORGED ✦ Game Optimization ✦ Research 2026 ✦", speed: 3, curveAmount: 80, direction: "left", opacity: 0.12, top: "calc(40% - 5%)", zIndex: 0 },
  { marqueeText: "Muhammad Uzair ✦ BSE-8A ✦ 22K-5176 ✦ Software ReEngineering ✦", speed: 3, curveAmount: -80, direction: "right", opacity: 0.12, top: "calc(50% + 5%)", zIndex: 0 },
  { marqueeText: "Visit our main page ✦ BOLTFORGED ✦", speed: 5, curveAmount: 400, direction: "right", opacity: 1, bottom: "15%", zIndex: 10 },
];