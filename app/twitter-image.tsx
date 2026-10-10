import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const alt = profile.site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generates the preview card shown when the site is shared on social media / messaging apps.
export default function OpengraphImage() {
  const { person } = profile;
  const chips = [
    { text: person.location, bg: "#7cb7ff" },
    { text: `Class of ${person.graduationYear}`, bg: "#7ee08a" },
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#fff4e0",
          color: "#15131a",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>{person.greeting}</div>
        <div
          style={{
            display: "flex",
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: -6,
            lineHeight: 1,
            marginTop: 8,
            padding: "0 12px",
            background: "linear-gradient(transparent 58%, #ffd93d 58%, #ffd93d 90%, transparent 90%)",
            alignSelf: "flex-start",
          }}
        >
          {person.name}
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 48 }}>
          {chips.map((c) => (
            <div
              key={c.text}
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 700,
                padding: "10px 26px",
                border: "4px solid #15131a",
                borderRadius: 999,
                background: c.bg,
                boxShadow: "5px 5px 0 #15131a",
              }}
            >
              {c.text}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
