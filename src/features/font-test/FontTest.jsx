import "./fontTest.css";

const previewText = "تاكيزو";
const fonts = [
  { name: "Qoronfull Bold", file: "Qoronfull-Bold.otf", format: "opentype" },
  { name: "Zafran Arabic", file: "ZafranArabic-Regular.otf", format: "opentype" },
  { name: "KO Lemaza", file: "KOLemaza-Regular.otf", format: "opentype" },
  { name: "KO Sindeed VF", file: "KOSindeedVF.ttf", format: "truetype" },
  { name: "Ko Banzeen", file: "Ko_Banzeen-Normal.otf", format: "opentype" },
  // { name: "Safaa Regular", file: "TS-Safaa-Regular.otf", format: "opentype" },
];

export default function FontTest() {
  return (
    <main className="font-test" dir="ltr">
      <header className="font-test-header">
        <p>TAKEZO / TYPE TEST</p>
        <h1>Arabic font specimens</h1>
        <p>Preview text: <span dir="rtl">{previewText}</span></p>
      </header>
      <section className="font-test-grid" aria-label="Arabic font previews">
        {fonts.map((font, index) => (
          <article className="font-test-card" key={font.file}>
            <div className="font-test-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{font.name}</span>
            </div>
            <p
              className="font-test-sample"
              dir="rtl"
              lang="ar"
              style={{
                fontFamily: `font-test-${index}`,
              }}
            >
              {previewText}
            </p>
            <p className="font-test-file">{font.file}</p>
            <style>{`@font-face { font-family: font-test-${index}; src: url("/fonts/${encodeURIComponent(font.file)}") format("${font.format}"); font-display: swap; }`}</style>
          </article>
        ))}
      </section>
    </main>
  );
}
