import { ImageResponse } from "next/og";
import { IDENTITY, content } from "@/lib/content";

export const alt = content.en.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "#FAFAFA",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#A1A1AA",
          }}
        >
          {IDENTITY.city} · {IDENTITY.country}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {IDENTITY.name}
          </div>

          <div
            style={{
              display: "flex",
              height: 3,
              width: "100%",
              background: "#FF5C1A",
              marginTop: 40,
              marginBottom: 32,
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 26,
              color: "#A1A1AA",
            }}
          >
            <span style={{ color: "#FAFAFA" }}>Marketing Lead &amp; Builder</span>
            <span>ajdin.grow.ba</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
