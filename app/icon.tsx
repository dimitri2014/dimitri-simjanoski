import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffd93d",
          color: "#15131a",
          fontSize: 30,
          fontWeight: 800,
          borderRadius: 32, border: "4px solid #15131a",
        }}
      >
        {profile.person.shortName}
      </div>
    ),
    size
  );
}
