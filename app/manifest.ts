import type { MetadataRoute } from "next";
import { profile } from "@/lib/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.person.name,
    short_name: profile.person.shortName,
    description: profile.site.description,
    start_url: "/",
    display: "browser",
    background_color: "#fff4e0",
    theme_color: "#fff4e0",
  };
}
