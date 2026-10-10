import { profile, siteUrl } from "@/lib/profile";

const { person, about, projects, achievements, interests, hobbies, favorites, friends, socials } = profile;

// Cards cycle through these colors (defined in globals.css).
const COLORS = ["red", "yellow", "blue", "green", "orange", "purple"];
const color = (i: number, offset = 0) => `c-${COLORS[(i + offset) % COLORS.length]}`;

// Small alternating tilts so the stickers don't look machine-placed.
const TILTS = [-2, 1.5, -1, 2, -1.5, 1];
const tilt = (i: number) => ({ "--tilt": `${TILTS[i % TILTS.length]}deg` }) as React.CSSProperties;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Arrow() {
  return (
    <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12L12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section-title">
        <span className={`section-num ${color(index, 1)}`}>{String(index).padStart(2, "0")}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: siteUrl,
    description: profile.site.description,
    address: { "@type": "PostalAddress", addressLocality: person.location },
    affiliation: { "@type": "EducationalOrganization", name: person.school },
    knowsAbout: interests.map((i) => i.title),
    sameAs: socials.map((s) => s.url),
  };
}

export default function Home() {
  // Sections only render (and get numbered) when they have content in profile.json.
  const sections = [
    about.paragraphs.length > 0 && "about",
    projects.length > 0 && "projects",
    achievements.length > 0 && "wins",
    interests.length > 0 && "interests",
    hobbies.length > 0 && "hobbies",
    favorites.length > 0 && "favorites",
    friends.length > 0 && "friends",
    "hi",
  ].filter(Boolean) as string[];
  const n = (id: string) => sections.indexOf(id) + 1;

  const nav = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "friends", label: "Friends" },
    { id: "hi", label: "Say hi" },
  ].filter((item) => sections.includes(item.id));

  // The scrolling banner uses "ticker" from profile.json, or falls back to interests + hobbies.
  const ticker = profile.ticker?.length
    ? profile.ticker
    : [...interests.map((i) => i.title), ...hobbies.map((h) => h.name)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <a href="#main" className="skip">
        Skip to content
      </a>

      <header className="topbar">
        <a href="#top" className="logo" aria-label={`${person.name}, back to top`}>
          {person.shortName}
        </a>
        <nav aria-label="Primary">
          <ul>
            {nav.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={item.id === "hi" ? "nav-cta" : undefined} data-i={i}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="hero wrap" aria-label="Introduction">
          <div className="hero-text">
            <p className="greeting">
              Greetings, I&apos;m: <span aria-hidden="true">😊</span>
            </p>
            <h1 className="hero-name">
              <span className="highlight">{person.name}</span>
            </h1>
            <p className="hero-headline">{person.headline}</p>
            <ul className="hero-stickers">
              <li className="sticker c-blue" style={tilt(0)}>
                {person.location}
              </li>
              <li className="sticker c-green" style={tilt(1)}>
                Class of {person.graduationYear}
              </li>
              <li className="sticker c-red" style={tilt(2)}>
                {person.school}
              </li>
            </ul>
          </div>

          <div className="hero-art" aria-hidden="true">
            <svg className="burst" viewBox="0 0 200 200">
              <path d="M100 0l17 37 38-15-9 40 40 8-31 26 26 32-41 3 1 41-36-19-20 36-14-38-39 13 13-39-39-14 36-21-19-36 41 1 2-41 32 25z" />
            </svg>
            <span className="burst-text">{person.shortName}</span>
          </div>

          {person.currently && (
            <p className="currently">
              <span className="dot" aria-hidden="true" />
              <span className="currently-label">Right now:</span> {person.currently}
            </p>
          )}
        </section>

        {ticker.length > 0 && (
          <div className="ticker" aria-hidden="true">
            <div className="ticker-track">
              {[0, 1].map((copy) => (
                <span key={copy}>
                  {ticker.map((t) => (
                    <span key={t} className="ticker-item">
                      {t} <span className="star">✦</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="wrap">
          {sections.includes("about") && (
            <Section id="about" index={n("about")} title="About me">
              <div className="about">
                <div className="card about-card">
                  {about.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {about.facts.length > 0 && (
                  <dl className="facts">
                    {about.facts.map((f, i) => (
                      <div key={f.label} className={`card fact ${color(i, 1)}`} style={tilt(i)}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </Section>
          )}

          {sections.includes("projects") && (
            <Section id="projects" index={n("projects")} title="Stuff I've built">
              <ul className="projects">
                {projects.map((p, i) => (
                  <li key={p.title} className={`card project ${color(i)}`}>
                    <div className="project-top">
                      <span className="pill">{p.year}</span>
                      <div className="project-links">
                        {p.link && (
                          <ExternalLink href={p.link} className="pill pill-link">
                            Visit <Arrow />
                          </ExternalLink>
                        )}
                        {p.repo && (
                          <ExternalLink href={p.repo} className="pill pill-link">
                            Code <Arrow />
                          </ExternalLink>
                        )}
                      </div>
                    </div>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.description}</p>
                    <ul className="tags" aria-label="Made with">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {sections.includes("wins") && (
            <Section id="wins" index={n("wins")} title="Proud moments">
              <ul className="wins">
                {achievements.map((a, i) => (
                  <li key={a.title + a.year} className="card win">
                    <span className={`medal ${color(i, 1)}`}>{a.detail}</span>
                    <span className="win-title">{a.title}</span>
                    <span className="win-year">{a.year}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {sections.includes("interests") && (
            <Section id="interests" index={n("interests")} title="Things I'm into">
              <ul className="interests">
                {interests.map((it, i) => (
                  <li key={it.title} className={`card interest ${color(i, 2)}`}>
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {sections.includes("hobbies") && (
            <Section id="hobbies" index={n("hobbies")} title="When I'm not studying">
              <ul className="hobbies" style={{ "--cols": hobbies.length } as React.CSSProperties}>
                {hobbies.map((h, i) => (
                  <li key={h.name} className={`card hobby ${color(i, 3)}`} style={tilt(i)}>
                    <span className="hobby-name">{h.name}</span>
                    {h.note && <span className="hobby-note">{h.note}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {sections.includes("favorites") && (
            <Section id="favorites" index={n("favorites")} title="Current favorites">
              <dl className="favorites card" style={{ "--cols": favorites.length } as React.CSSProperties}>
                {favorites.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          {sections.includes("friends") && (
            <Section id="friends" index={n("friends")} title="My people">
              {profile.friendsIntro && <p className="lede">{profile.friendsIntro}</p>}
              <ul className="friends">
                {friends.map((f, i) => {
                  const inner = (
                    <>
                      <span className={`avatar ${color(i, 4)}`}>{initials(f.name)}</span>
                      <span className="friend-name">
                        {f.name}
                        {f.link && <Arrow />}
                      </span>
                      {f.description && <span className="friend-desc">{f.description}</span>}
                    </>
                  );
                  const cls = `card friend${f.description ? "" : " compact"}`;
                  return (
                    <li key={f.name}>
                      {f.link ? (
                        <ExternalLink href={f.link} className={cls}>
                          {inner}
                        </ExternalLink>
                      ) : (
                        <div className={cls}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Section>
          )}

          <section id="hi" className="say-hi card c-red" aria-labelledby="hi-title">
            <h2 id="hi-title" className="say-hi-title">Say hi!</h2>
            {profile.contactIntro && <p className="say-hi-text">{profile.contactIntro}</p>}
            <a href={`mailto:${person.email}`} className="email">
              {person.email}
            </a>
            {socials.length > 0 && (
              <ul className="socials">
                {socials.map((s) => (
                  <li key={s.platform}>
                    <ExternalLink href={s.url} className="social">
                      <span className="social-name">{s.platform}</span>
                      <span className="social-handle">{s.handle}</span>
                      <Arrow />
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <footer className="footer wrap">
        <span>
          Made by {person.name} · {new Date().getFullYear()}
        </span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}