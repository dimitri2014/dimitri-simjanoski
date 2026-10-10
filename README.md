# Portfolio

A single-page portfolio built with Next.js. All content lives in **`data/profile.json`**.

## Editing your content

Open `data/profile.json` and change the text. Save the file, and the page updates.

- `site`: SEO settings. **Set `url` to your real domain before you deploy.**
- `person`: name, greeting, headline, location, school, email, and `currently` (the "Right now:" box)
- `about`, `projects`, `achievements`, `interests`, `hobbies`, `favorites`, `friends`, `socials`: the page sections
- `friendsIntro`, `contactIntro`: the short lines above the friends and "Say hi" sections

Sections hide themselves when their list is empty (`[]`), and the remaining sections are renumbered automatically.
For a project, leave `link` or `repo` as `""` to hide that link.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying

Push this folder to GitHub and import it on [Vercel](https://vercel.com). It works with the default settings.

## SEO features

- Title, description, keywords, canonical URL, Open Graph and Twitter tags (`app/layout.tsx`)
- Social preview image and favicon, generated from your data (`app/opengraph-image.tsx`, `app/icon.tsx`)
- `sitemap.xml`, `robots.txt` and a web manifest
- Schema.org `Person` structured data, so Google can link your social profiles to you
- A fully static page with semantic HTML (one `h1`, labelled sections)
