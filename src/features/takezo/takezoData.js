import { layouts } from "./mosaicLayout.js";
import showcase from "./showcaseManifest.js";
import artworks from "./artworkManifest.js";

const card = (id, title, kicker, color, art, description) => ({
  id,
  title,
  kicker,
  color,
  art,
  description,
});

export const nodes = {
  home: {
    title: "The index",
    parent: null,
    cards: [
      card(
        "identity",
        "TAKEZO",
        "01 / THE PERSON",
        "red",
        "sculpture",
        "Independent mind. Collective force.",
      ),
      card(
        "work",
        "SELECTED\nWORK",
        "02 / THE PRACTICE",
        "ochre",
        "arrow",
        "Ideas made tangible. Digital experiences with a point of view.",
      ),
      card(
        "experiments",
        "OFF THE\nGRID",
        "03 / THE PLAYGROUND",
        "sage",
        "orbital",
        "Experiments / studies / happy accidents",
      ),
      card(
        "connect",
        "GOOD\nCHEMISTRY.",
        "04 / THE CONNECTION",
        "bone",
        "asterisk",
        "Every good thing starts with a conversation.",
      ),
    ],
  },
  identity: {
    title: "The person",
    parent: "home",
    cards: [
      card(
        null,
        "TAKEZO",
        "01 / THE PERSON",
        "red",
        "sculpture",
        "A personal practice within BoltForged. Exploring the space between precise engineering and expressive design.",
      ),
      card(
        "approach",
        "INTENT\nIN EVERY\nDETAIL.",
        "01.1 / PHILOSOPHY",
        "bone",
        "arrow",
        "How I think. How I build.",
      ),
      card(
        "capabilities",
        "FORM ×\nFUNCTION",
        "01.2 / CAPABILITIES",
        "sage",
        "orbital",
        "Design / code / motion",
      ),
      card(
        "principles",
        "STAY\nCURIOUS.",
        "01.3 / PRINCIPLES",
        "ochre",
        "asterisk",
        "A few things worth building around.",
      ),
    ],
  },
  work: {
    title: "Selected work",
    parent: "home",
    cards: [
      card(
        null,
        "WORK\nINDEX.",
        "02 / SELECTED WORK",
        "ochre",
        "arrow",
        "Three concept directions. A sample collection built to explore this portfolio’s hierarchy.",
      ),
      card(
        "signal",
        "SIGNAL / 01",
        "02.1 / DIGITAL EXPERIENCE",
        "red",
        "signal",
        "A human interface for a world of information.",
      ),
      card(
        "form",
        "FORM\nSTUDIES",
        "02.2 / VISUAL SYSTEM",
        "bone",
        "sculpture",
        "A modular identity with room to move.",
      ),
      card(
        "kinetic",
        "IN\nMOTION.",
        "02.3 / INTERACTION DESIGN",
        "sage",
        "orbital",
        "Movement with meaning.",
      ),
    ],
  },
  experiments: {
    title: "Off the grid",
    parent: "home",
    cards: [
      card(
        null,
        "OFF THE\nGRID",
        "03 / EXPERIMENTS",
        "sage",
        "orbital",
        "An open sketchbook. Small questions explored through form, rhythm, and interaction.",
      ),
      card(
        "motion",
        "CONTROLLED\nCHAOS.",
        "03.1 / MOTION STUDY",
        "red",
        "signal",
        "A study in order, interruption, and rhythm.",
      ),
      card(
        "objects",
        "STRANGE\nOBJECTS",
        "03.2 / FORM STUDY",
        "ochre",
        "sculpture",
        "Impossible things. Plausible feelings.",
      ),
      card(
        "type",
        "TYPE\nAS IMAGE.",
        "03.3 / TYPE STUDY",
        "bone",
        "asterisk",
        "Letters with a little more to say.",
      ),
    ],
  },
  connect: {
    title: "Good chemistry",
    parent: "home",
    cards: [
      card(
        null,
        "LET’S\nMAKE\nCONTACT.",
        "04 / CONNECTION",
        "bone",
        "asterisk",
        "Takezo × BoltForged. A place for ambitious ideas and thoughtful collaborations.",
      ),
      card(
        null,
        "A GOOD\nSTART.",
        "COLLABORATION / BRIEF",
        "ochre",
        null,
        "What are you imagining? Who is it for? What should it feel like? A clear question is the beginning of a good project.",
      ),
      card(
        null,
        "BUILD\nTOGETHER.",
        "DESIGN + ENGINEERING",
        "sage",
        null,
        "Digital experiences, visual identities, and interactions. From the first sketch to the final detail.",
      ),
      card(
        null,
        "CHANNEL\nPENDING.",
        "CONTACT / SAMPLE CONTENT",
        "red",
        null,
        "Your preferred email and social channels will live here. Contact details have not been added to this sample.",
      ),
    ],
  },
};

const details = {
  approach: [
    "identity",
    "The approach",
    "bone",
    "INTENT\nFIRST.",
    "Start with the question.",
    "Before a shape, a system, or a line of code: understand what the experience needs to do.",
    "Make the idea tangible.",
    "Prototype early. Put the interaction in someone’s hands. Let what happens guide the next iteration.",
    "Refine the feeling.",
    "Spacing, timing, hierarchy, and behavior should all tell the same story.",
  ],
  capabilities: [
    "identity",
    "Capabilities",
    "sage",
    "FORM ×\nFUNCTION",
    "Visual direction",
    "Typography, composition, and a coherent visual language that makes an idea recognizable.",
    "Creative engineering",
    "Responsive interfaces, interactive prototypes, and systems that work beyond the perfect screenshot.",
    "Motion design",
    "Transitions that communicate relationships. Feedback that feels immediate. Rhythm that supports the content.",
  ],
  principles: [
    "identity",
    "Principles",
    "ochre",
    "STAY\nCURIOUS.",
    "Make it purposeful.",
    "Every element earns its place. Every interaction has something to communicate.",
    "Care about the edges.",
    "Small screens, keyboard navigation, interrupted transitions. The details are part of the design.",
    "Keep exploring.",
    "Leave room for an unexpected direction. Make, observe, and make again.",
  ],
  signal: [
    "work",
    "Signal / 01",
    "red",
    "SIGNAL\n/ 01",
    "The question",
    "How can a dense information space feel calm, legible, and unmistakably human?",
    "The direction",
    "A concept built around editorial hierarchy, warm surfaces, and an interface that reveals detail progressively.",
    "The interaction",
    "Choose a panel. Follow the connection. Return without losing your place. This portfolio demonstrates that spatial navigation.",
  ],
  form: [
    "work",
    "Form studies",
    "bone",
    "FORM\nSTUDIES",
    "The question",
    "Can a small family of geometric parts produce an identity that keeps surprising you?",
    "The direction",
    "Sculptural forms, a disciplined palette, and a modular grid. A sample visual system with recognizable ingredients.",
    "The application",
    "An identity that can expand from a compact mark to a complete digital composition.",
  ],
  kinetic: [
    "work",
    "In motion",
    "sage",
    "IN\nMOTION.",
    "The question",
    "What makes a transition feel like a continuation of your action?",
    "The direction",
    "Preserve an object through changes of state. Its color, position, and momentum become a guide.",
    "The prototype",
    "The circle transition in this portfolio is a working example: selection becomes movement, and movement becomes the next view.",
  ],
  motion: [
    "experiments",
    "Controlled chaos",
    "red",
    "CONTROLLED\nCHAOS.",
    "Rhythm",
    "Repeated lines form a field. Small shifts in timing make an ordered system feel alive.",
    "Interruption",
    "Hover changes the balance. The composition responds around the selected object.",
    "Resolution",
    "The system always returns to a readable arrangement. Expression follows a structure.",
  ],
  objects: [
    "experiments",
    "Strange objects",
    "ochre",
    "STRANGE\nOBJECTS",
    "Material",
    "A study of folded geometry, hard edges, and soft light. Built as crisp vector artwork.",
    "Tension",
    "Heavy forms seem suspended. Repetition produces depth without adding visual noise.",
    "Possibility",
    "A small visual experiment can become a mark, an interaction, or the beginning of a larger identity.",
  ],
  type: [
    "experiments",
    "Type as image",
    "bone",
    "TYPE\nAS IMAGE.",
    "Scale",
    "Large letters become architecture. Small labels provide orientation.",
    "Contrast",
    "An expressive headline and a measured monospaced voice share the same surface.",
    "Space",
    "The empty areas are doing work too. They give the typography room to be seen.",
  ],
};

Object.entries(details).forEach(
  ([id, [parent, title, color, headline, a, b, c, d, e, f]]) => {
    nodes[id] = {
      title,
      parent,
      cards: [
        card(
          null,
          headline,
          `${parent === "work" ? "CONCEPT PROJECT" : "FIELD NOTES"} / ${title.toUpperCase()}`,
          color,
          parent === "work" ? "signal" : "orbital",
          parent === "work"
            ? "Portfolio concept / sample case study"
            : "An evolving personal practice.",
        ),
        card(null, a, "01 / OBSERVATION", "bone", null, b),
        card(null, c, "02 / EXPLORATION", "sage", null, d),
        card(null, e, "03 / RESOLUTION", "ochre", null, f),
      ],
    };
  },
);

// Home deliberately retains its original composition and content.
Object.assign(nodes.identity, { layout: layouts.spire });
Object.assign(nodes.work, { layout: layouts.workGallery });
nodes.work.cards.push(
  card(
    "archive",
    "THE\nARCHIVE",
    "02.4 / CONTACT SHEET",
    "bone",
    "asterisk",
    "Twelve small directions. A collection of forms, marks, and visual questions.",
  ),
  card(
    "process",
    "FROM FIRST\nTO FINISHED",
    "02.5 / THE PROCESS",
    "red",
    "signal",
    "Six stages. One continuous thread from the initial question to the final detail.",
  ),
);
nodes.work.cards.push({
  ...card("gallery", "GALLERY", "02.6 / THE GALLERY", "ochre", "gallery",
    "Thirteen projects. Images, motion, and work in progress."),
  tags: ["logo", "gradient", "Halftone", "expansion-max"],
  logo: "/takezo/gallery.svg",
});
Object.assign(nodes.experiments, { layout: layouts.cabinet });
nodes.experiments.cards.push(
  card(
    "nine",
    "NINE\nPOSSIBILITIES",
    "03.4 / COMPOSITION",
    "bone",
    "arrow",
    "A nine-part exploration of balance, contrast, and negative space.",
  ),
  card(
    "materials",
    "MATERIAL",
    "03.5 / MATERIAL LIBRARY",
    "sage",
    "sculpture",
    "Six narrow specimens, each with its own surface and character.",
  ),
  card(
    "process",
    "METHOD",
    "03.6 / PROCESS NOTES",
    "red",
    "signal",
    "An idea develops through observation, experimentation, and refinement.",
  ),
  card(
    "atlas",
    "ATLAS / 36",
    "03.7 / THE COMPLETE ATLAS",
    "ochre",
    "orbital",
    "Thirty-six studies sharing one surface. Give any one of them room to speak.",
  ),
);
Object.assign(nodes.connect, { layout: layouts.canopy });
["approach", "form", "objects"].forEach((id) => {
  nodes[id].layout = layouts.folio;
});
["capabilities", "kinetic", "type"].forEach((id) => {
  nodes[id].layout = layouts.caption;
});
["principles", "signal", "motion"].forEach((id) => {
  nodes[id].layout = layouts.spire;
});

const studies = [
  ["FOLD", "A plane becomes a volume through a single decisive fold."],
  ["PULSE", "A rhythm gathers momentum, pauses, and begins again."],
  ["ORBIT", "A family of curves finds balance around a shared center."],
  ["GRAIN", "A small irregularity gives a perfect surface its character."],
  ["ECHO", "Repetition carries an idea across changes in scale."],
  ["VOID", "Space makes the surrounding forms easier to understand."],
  ["TENSION", "Opposing forces hold a composition in balance."],
  ["TRACE", "A movement leaves behind the beginning of a new shape."],
  ["DRIFT", "A measured system leaves room for an unexpected shift."],
  ["FRAME", "A boundary directs attention toward what matters."],
  ["PHASE", "A familiar form changes as the point of view moves."],
  ["LIGHT", "An edge appears, a surface opens, a form becomes clear."],
  ["SEAM", "Two surfaces meet. The join becomes the most interesting part."],
  ["WEIGHT", "A dark shape changes the balance of an otherwise empty field."],
  ["FLUX", "A steady arrangement responds to a force moving through it."],
  ["RIFT", "An interruption opens a narrow view into another layer."],
  ["MESH", "Separate threads create a structure neither could hold alone."],
  ["ARC", "A simple curve connects two positions with a sense of intent."],
  ["STACK", "Small repeated parts accumulate into a larger silhouette."],
  ["SHIFT", "One displaced element gives a quiet pattern a new direction."],
  ["FOIL", "A thin surface catches light and changes as the viewer moves."],
  ["EDGE", "A sharp boundary sets two soft fields into contrast."],
  ["WAVE", "A change travels through the system without breaking its rhythm."],
  ["HALO", "A faint surrounding field makes a central form feel present."],
  [
    "GRID",
    "A regular structure creates room for deliberately irregular ideas.",
  ],
  [
    "LOOP",
    "The end reconnects with the beginning through a continuous gesture.",
  ],
  ["DUSK", "Muted tones settle into a composition with very little light."],
  ["PRISM", "One direction separates into several equally plausible paths."],
  ["INK", "A dense mark establishes a clear point of attention."],
  ["CHORD", "Several independent elements arrive at the same moment."],
  ["RANGE", "A family of forms stays recognizable across changes in scale."],
  ["GLOW", "A restrained highlight gives an otherwise flat surface depth."],
  ["AXIS", "A single line organizes a field of competing directions."],
  ["PAUSE", "An interval gives the next movement its significance."],
  ["AFTER", "What remains when the movement has finished becomes a new image."],
  [
    "AGAIN",
    "Return to the first question with everything the process has taught you.",
  ],
];
const palette = ["red", "bone", "sage", "ochre"];
const art = ["sculpture", "signal", "orbital", "asterisk", "arrow"];
function collection(title, parent, layout, count, offset = 0) {
  return {
    title,
    parent,
    layout,
    cards: Array.from({ length: count }, (_, i) => {
      const [name, description] = studies[(i + offset) % studies.length];
      return {
        ...card(
          null,
          name,
          `${String(i + 1).padStart(2, "0")} / ${title.toUpperCase()} / ${name}`,
          palette[(i + offset) % 4],
          art[(i + offset) % 5],
          description,
        ),
        footer: `STUDY ${String(i + 1).padStart(2, "0")} — ${name} / FORM, FEELING & FUNCTION`,
      };
    }),
  };
}
nodes.archive = collection("The archive", "work", layouts.contactSheet, 12);
nodes.nine = collection(
  "Nine possibilities",
  "experiments",
  layouts.nine,
  9,
  3,
);
nodes.materials = collection(
  "Material library",
  "experiments",
  layouts.slats,
  6,
  5,
);
nodes.atlas = collection("Atlas / 36", "experiments", layouts.atlas, 36);
nodes.process = {
  title: "The process",
  parent: "work",
  layout: layouts.ribbons,
  cards: [
    [
      "OBSERVE",
      "Understand the people, the setting, and the question. Collect observations before choosing a direction.",
    ],
    [
      "DEFINE",
      "Find the central idea. Give the project a clear purpose and a simple way to judge whether it works.",
    ],
    [
      "EXPLORE",
      "Follow several possibilities. Draw, arrange, and prototype until a promising direction begins to emerge.",
    ],
    [
      "BUILD",
      "Turn the chosen direction into something tangible. Connect the visual system to real interaction.",
    ],
    [
      "REFINE",
      "Pay attention to the edges: timing, spacing, readability, and the way the experience responds.",
    ],
    [
      "RELEASE",
      "Put the work into the world. Observe what people do, learn from it, and keep improving.",
    ],
  ].map(([name, description], i) => ({
    ...card(
      null,
      name,
      `${String(i + 1).padStart(2, "0")} / THE PROCESS / ${name}`,
      palette[i % 4],
      art[i % 5],
      description,
    ),
    footer: `TAKEZO / A BOLTFORGED PRACTICE / STAGE ${i + 1} OF 6`,
  })),
};

// Modular surface studies. Home intentionally has no feature defaults.
nodes.materials.panelDefaults = { tags: ["logo", "gradient", "Dirty", "expansion-max"] };
nodes.atlas.panelDefaults = { tags: ["logo", "gradient", "Halftone", "expansion-max"] };
nodes.process.panelDefaults = { tags: ["logo", "gradient", "Halftone", "expansion-max"] };
nodes.nine.panelDefaults = { tags: ["gradient", "Dirty"] };
["materials", "atlas", "process"].forEach((id) => {
  nodes[id].cards.forEach((panel, i) => {
    panel.logo = ["/takezo/mark.svg", "/takezo/orbit.svg", "/takezo/fold.svg"][i % 3];
  });
});
Object.assign(nodes.work.cards[0], {
  tags: ["logo", "gradient", "Halftone", "expansion-max"],
  logo: "/takezo/fold.svg",
});
Object.assign(nodes.work.cards[1], { tags: ["gradient", "Dirty"], baseColor: "#B95745" });

const showcaseByYear = [...showcase].map((project, index) => ({ project, index }))
  .sort((a, b) => {
    const latestYear = (item) => Math.max(0, ...[...item.project.year.matchAll(/\b(?:19|20)\d{2}\b/g)].map(([year]) => Number(year)));
    return latestYear(b) - latestYear(a) || b.index - a.index;
  })
  .map(({ project }) => project);

nodes.gallery = {
  title: "Projects",
  parent: "home",
  mode: "gallery",
  cards: showcaseByYear.map((project) => ({
    ...card(`showcase-${project.id}`, project.title, project.year, "bone", null, project.short),
    project,
  })),
};
showcase.forEach((project) => {
  nodes[`showcase-${project.id}`] = {
    title: project.title,
    parent: "gallery",
    mode: project.video ? "video" : "image",
    project,
    cards: [card(null, project.title, project.year, "bone", null, project.short)],
  };
});

nodes.artworks = {
  title: "Artworks",
  parent: "home",
  mode: "artworks-gallery",
  cards: artworks.map((project) => ({
    ...card(`artwork-${project.id}`, project.title, project.year, "bone", null, project.short),
    project,
  })),
};
artworks.forEach((project) => {
  nodes[`artwork-${project.id}`] = {
    title: project.title,
    parent: "artworks",
    mode: "image",
    project,
    cards: [card(null, project.title, project.year, "bone", null, project.short)],
  };
});

const readingStudy = `A practice built around attention.

Every project begins by looking closely at the people who will use it. What do they notice first? What do they need to understand? Where does the experience ask for too much effort? These questions guide the composition before color, typography, or movement enters the picture.

The first direction is deliberately tangible. A sketch becomes a small working surface: a sequence of panels, a relationship between words, or a movement that makes an idea easier to follow. The purpose is to discover what the design actually feels like in use. A polished still image can suggest a direction, but interaction reveals whether that direction holds together.

Form and behavior develop together. A compact mark becomes a recognizable point of return. A title gives each space a clear identity. Supporting text offers enough context to invite exploration, then reveals more when the reader chooses to spend time with it. The composition should make these changes feel like parts of the same object.

The quieter decisions matter just as much. Internal margins protect the words. Type follows the available space without asking the reader to wait. Surface texture adds character while leaving the reading area calm. Movement communicates which object is active and how it relates to the surrounding pieces.

Refinement means checking the edges of the experience. Move quickly between panels. Read it on a narrow screen. Use a keyboard. Return to the beginning. A system that works only when approached in one perfect way is still a sketch. The finished direction must remain understandable when the reader brings their own pace.

These are sample portfolio notes, intended to demonstrate the reading behavior. The final case studies can replace them with project context, decisions, observations, and outcomes. Each panel can carry its own short introduction and extended narrative while sharing the same responsive structure.`;
[[nodes.work.cards[0], "A collection of ideas made tangible."],
 [nodes.work.cards[1], "A human interface for a world of information."],
 [nodes.materials.cards[0], "Space gives the surrounding forms room to speak."],
 [nodes.process.cards[0], "Observe closely before choosing a direction."]].forEach(([panel, summary]) => {
  panel.tags = [...(panel.tags || ["logo", "gradient", "Dirty", "expansion-max"]), "cursor-read"];
  panel.content = [
    { tag: "unhovered", text: summary },
    { tag: "hovered", text: readingStudy },
  ];
});

Object.assign(nodes.home.cards[3], {
  tags: ["breakdown"],
  breakdown: {
    caption: "Connect\nOn",
    hoverMode: "contract",
    showLinkArrows: false,
    links: [
      { name: "X", icon: "/images/socials/x.svg", href: "https://x.com/RentAsunderer" },
      { name: "Facebook", icon: "/images/socials/facebook.svg", href: "https://www.facebook.com/profile.php?id=61587874779147" },
      { name: "itch.io", hoverName: "Itch.io", icon: "/images/socials/itch.svg", iconScale: 1.2, href: "https://takezoshinmen.itch.io/" },
      { name: "LinkedIn", icon: "/images/socials/linkedin.svg", href: "https://www.linkedin.com/in/muhammad-uzair-940685172/" },
      { name: "Instagram", icon: "/images/socials/instagram.svg", href: "https://www.instagram.com/rentasundererx/" },
      { name: "Sketchfab", icon: "/images/socials/sketchfab.svg", href: "https://sketchfab.com/takezoshinmen" },
      { name: "ArtStation", icon: "/images/socials/artstation.svg", iconScale: 1.85, href: "https://takezoshinmenx.artstation.com/" },
      { name: "Discord", icon: "/images/socials/discord.svg", href: "https://discord.com/users/436117892816175134" },
    ],
  },
});

Object.assign(nodes.home.cards[1], {
  title: "SHOWCASE",
  kicker: "02 / THE SHOWCASE",
  description: "Projects and artworks, gathered in one place.",
  tags: ["breakdown"],
  breakdown: {
    layout: "strips",
    ariaLabel: "Showcase gallery choices",
    strips: [
      { name: "SHOWCASE\nGALLERY", arrow: true },
      { name: "PROJECTS", destination: "gallery", tags: ["spreading"],
        assetImages: [1, 2, 3].map((i) => `/takezo/showcase/projects/project${i}.webp`),
        assetMotion: { x: 62, y: 46, width: 58, spread: 29, rotation: 16, endScale: .82, parallax: 9 } },
      { name: "ARTWORKS", destination: "artworks", tags: ["falling"],
        assetImages: [1, 2, 3].map((i) => `/takezo/showcase/artworks/artwork${i}.webp`),
        assetMotion: { x: 66, y: 45, width: 54, spread: 17, rotation: 12, startScale: 1.55, endScale: .8, parallax: 9 } },
    ],
  },
});

const skills = [
  ["Blender", "Blender"], ["JavaScript", "JS"], ["Adobe Photoshop", "PS"],
  ["Substance 3D", "SP3D"], ["Unity 3D", "Unity3D"],
  ["ZBrush", "ZBrush"], ["Adobe After Effects", "AE"],
  ["Marvelous Designer 3D", "MD3D"],
];
Object.assign(nodes.home.cards[2], {
  title: "SKILLSET",
  kicker: "03 / THE SKILLSET",
  description: "A toolkit in constant motion.",
  tags: ["breakdown"],
  breakdown: {
    ariaLabel: "Skillset",
    hoverMode: "expand",
    centre: { name: "Adept\nat", destination: "skillset" },
    links: skills.map(([name, icon]) => ({ name, icon: `/takezo/${icon}.svg` })),
  },
});
nodes.skillset = {
  title: "Skillset",
  parent: "home",
  layout: layouts.cabinet,
  cards: skills.map(([name, icon], index) => card(null, name.toUpperCase(), `03.${index + 1} / TOOL`, ["sage", "bone", "ochre", "red"][index % 4], `skill:${icon}`, "Tools for form, motion, and interaction.")),
};

const motionImages = showcase.filter((project) => project.images.length).slice(0, 3).map((project) => project.images[0].thumb);
nodes["asset-motion"] = {
  title: "Asset motion studies",
  parent: "home",
  layout: [[1, 1, 3, 6], [4, 1, 3, 6]],
  cards: [
    { ...card(null, "SPREAD\nTHE FIELD", "01 / SPREADING", "ochre", null, "A deck of images unfolding from the edge."), tags: ["spreading"], assetImages: motionImages, assetMotion: { x: 70, y: 60, width: 52, spread: 35, rotation: 23 } },
    { ...card(null, "A SOFTER\nLANDING", "02 / FALLING", "sage", null, "Scale, gravity, and a quiet landing."), tags: ["falling"], assetImages: motionImages, assetMotion: { x: 68, y: 60, width: 52, startScale: 2, endScale: .9 } },
  ],
};

export function trailFor(id) {
  const trail = [];
  for (let key = id; key; key = nodes[key].parent) trail.unshift(key);
  return trail;
}
