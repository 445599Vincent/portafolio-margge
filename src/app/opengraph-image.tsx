/* eslint-disable @next/next/no-img-element -- ImageResponse usa Satori y requiere un elemento img nativo. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { heroPhoto } from "@/data/about";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const portraitData = heroPhoto.src
  ? readFile(join(process.cwd(), "public", heroPhoto.src), "base64")
  : null;

export default async function OpenGraphImage() {
  const portraitSrc = portraitData ? `data:image/jpeg;base64,${await portraitData}` : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          gap: 58,
          background: "#f5f2ec",
          color: "#171614",
          padding: "64px 72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "18px 0 12px",
          }}
        >
          <div style={{ width: 96, height: 6, background: "#9a4a2e" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.02 }}>
              {site.name}
            </div>
            <div style={{ fontSize: 35, lineHeight: 1.2, color: "#9a4a2e" }}>{site.title}</div>
          </div>
          <div
            style={{
              width: 82,
              height: 82,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #9a4a2e",
              borderRadius: 999,
              color: "#9a4a2e",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            MJ
          </div>
        </div>
        {portraitSrc && (
          <div
            style={{
              width: 410,
              height: 502,
              display: "flex",
              overflow: "hidden",
              borderRadius: 28,
              border: "2px solid rgba(23, 22, 20, 0.12)",
            }}
          >
            <img
              src={portraitSrc}
              alt={heroPhoto.alt}
              width={410}
              height={502}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
            />
          </div>
        )}
      </div>
    ),
    size,
  );
}
