import data from "@/data/profile.json";

export type Project = {
  title: string;
  year: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export type Profile = {
  site: {
    url: string;
    title: string;
    description: string;
    keywords: string[];
    locale: string;
    twitterHandle?: string;
  };
  person: {
    name: string;
    shortName: string;
    greeting: string;
    headline: string;
    location: string;
    school: string;
    graduationYear: number;
    email: string;
    currently?: string;
  };
  about: {
    paragraphs: string[];
    facts: { label: string; value: string }[];
  };
  ticker?: string[];
  projects: Project[];
  achievements: { year: string; title: string; detail: string }[];
  interests: { title: string; description: string }[];
  hobbies: { name: string; note?: string }[];
  favorites: { label: string; value: string }[];
  friendsIntro?: string;
  friends: { name: string; description?: string; link?: string }[];
  contactIntro?: string;
  socials: { platform: string; handle: string; url: string }[];
};

export const profile: Profile = data;

export const siteUrl = profile.site.url.replace(/\/$/, "");
