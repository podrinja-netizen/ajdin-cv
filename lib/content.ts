/**
 * Single source of truth for every word on the site.
 * Edit here — both languages live side by side. Nothing else needs touching.
 */

export type Lang = "en" | "bs";

/* -------------------------------------------------------------- constants */

export const IDENTITY = {
  name: "Ajdin Podrinja",
  initials: "AP",
  age: 31,
  city: "Sarajevo",
  country: "Bosnia and Herzegovina",
  instagram: "https://www.instagram.com/swpodrinja/",
  instagramHandle: "@swpodrinja",
  // TODO: replace with the real address — used in the contact section, the
  // command palette, the CV route and the JSON-LD.
  email: "TODO@grow.ba",
  // TODO: optional. Leave as null to hide the phone line everywhere.
  phone: null as string | null,
  site: "https://ajdin.grow.ba",
  cvFile: "/ajdin-podrinja-cv.pdf", // TODO: drop the PDF into /public
};

/** Live sites. One sentence each, never two. */
export const WEB_PROJECTS = [
  {
    domain: "remex.ba",
    en: "Industrial supplier — catalogue, inquiry flow, full CMS.",
    bs: "Industrijski dobavljač — katalog, upiti, kompletan CMS.",
  },
  {
    domain: "swordsecurity.ba",
    en: "Security firm — services, certifications, lead capture.",
    bs: "Zaštitarska firma — usluge, certifikati, prikupljanje upita.",
  },
  {
    domain: "arra.ba",
    en: "Brand site built around a single product story.",
    bs: "Brend sajt građen oko jedne priče o proizvodu.",
  },
  {
    domain: "edico.ba",
    en: "Distribution business — product lines and dealer network.",
    bs: "Distribucija — linije proizvoda i mreža dilera.",
  },
  {
    domain: "hoteluna.ba",
    en: "Hotel — rooms, availability, direct booking inquiries.",
    bs: "Hotel — sobe, dostupnost, direktni upiti za rezervaciju.",
  },
  {
    domain: "strollerica.com",
    en: "E-commerce for baby gear — catalogue, cart, checkout.",
    bs: "E-commerce za bebi opremu — katalog, korpa, naplata.",
  },
  {
    domain: "ngv.ba",
    en: "Corporate presentation with a multi-language structure.",
    bs: "Korporativna prezentacija s višejezičnom strukturom.",
  },
  {
    domain: "dentalcorner.ba",
    en: "Dental clinic — treatments, team, appointment requests.",
    bs: "Stomatološka ordinacija — tretmani, tim, zahtjevi za termin.",
  },
  {
    domain: "energycentar.ba",
    en: "Energy services — projects, references, contact funnel.",
    bs: "Energetske usluge — projekti, reference, kontakt lijevak.",
  },
];

export const SYSTEMS = [
  {
    domain: "rec.ba",
    // TODO: add the screenshot (REC admin — company search, 938 companies)
    shot: "/projects/rec-admin.png",
    shotAlt: {
      en: "REC admin panel — company search across 938 registered companies",
      bs: "REC admin panel — pretraga među 938 registrovanih firmi",
    },
    en: {
      kicker: "Corporate platform + CRM + CMS",
      body: "The whole company runs on it: users, companies, subscriptions, seminars, the magazine, reporting and push notifications. Built from scratch, not assembled from plugins.",
      stat: "938 companies in the registry",
    },
    bs: {
      kicker: "Korporativna platforma + CRM + CMS",
      body: "Cijela firma radi na njoj: korisnici, firme, pretplate, seminari, časopis, izvještaji i push notifikacije. Građeno od nule, ne sklapano od plugina.",
      stat: "938 firmi u registru",
    },
  },
  {
    domain: "grow.ba",
    // TODO: add the screenshot (Grow CRM — Meta Lead Ads dashboard, 92 leads)
    shot: "/projects/grow-crm.png",
    shotAlt: {
      en: "Grow CRM — Meta Lead Ads dashboard showing 92 captured leads",
      bs: "Grow CRM — Meta Lead Ads dashboard sa 92 prikupljena leada",
    },
    en: {
      kicker: "Agency site + in-house CRM & CMS",
      body: "Lead management wired straight into Meta Lead Ads, campaign tracking, mail, and an automated site health check. The agency sells what it runs on.",
      stat: "92 leads in the pipeline",
    },
    bs: {
      kicker: "Sajt agencije + vlastiti CRM i CMS",
      body: "Lead management spojen direktno na Meta Lead Ads, praćenje kampanja, mail i automatska provjera sajta. Agencija prodaje ono na čemu i sama radi.",
      stat: "92 leada u pipelineu",
    },
  },
  {
    domain: "navijajuzcarlsberg.ba",
    shot: null,
    shotAlt: { en: "", bs: "" },
    en: {
      kicker: "Campaign platform — Carlsberg",
      body: "A national campaign platform built to take traffic spikes without blinking: entries, validation, and live standings.",
      stat: "Carlsberg",
    },
    bs: {
      kicker: "Kampanjska platforma — Carlsberg",
      body: "Nacionalna kampanjska platforma građena da izdrži nalete prometa: prijave, validacija i live rang lista.",
      stat: "Carlsberg",
    },
  },
  {
    domain: "timeoutzasomersby.ba",
    shot: null,
    shotAlt: { en: "", bs: "" },
    en: {
      kicker: "Prize game platform — Somersby",
      body: "Code entry, prize logic, draw mechanics and back-office reporting — the boring parts done properly.",
      stat: "Somersby",
    },
    bs: {
      kicker: "Nagradna igra — Somersby",
      body: "Unos kodova, logika nagrada, mehanika izvlačenja i back-office izvještaji — dosadni dijelovi odrađeni kako treba.",
      stat: "Somersby",
    },
  },
];

export const TIKTOKS = [
  "https://www.tiktok.com/@grow.387/video/7676466023503154452",
  "https://www.tiktok.com/@grow.387/video/7674744773495770388",
];

export const SECTION_IDS = ["work", "timeline", "systems", "stack", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/* ------------------------------------------------------------------ copy */

export const content = {
  en: {
    meta: {
      title: "Ajdin Podrinja — Marketing Lead & Builder",
      description:
        "6+ years turning marketing into systems. Web, CRM, SaaS, AI automation. Sarajevo.",
    },
    nav: {
      work: "Work",
      timeline: "Timeline",
      systems: "Systems",
      stack: "Stack",
      contact: "Contact",
      menu: "Menu",
      theme: "Theme",
      command: "Command",
      language: "Language",
    },
    hero: {
      role: "Marketing Lead & Builder",
      claim: "6+ years turning marketing into systems — and systems into revenue.",
      meta: {
        based: "Based in",
        basedValue: "Sarajevo, BiH",
        disciplines: "Disciplines",
        disciplinesValue: "Marketing · Development · Systems",
        status: "Status",
        statusValue: "Open to work",
      },
      scroll: "Scroll",
    },
    manifesto: {
      index: "01 — About",
      lead: "I left economics one thesis short of a degree. Not a regret — a redirect.",
      body: [
        "It took me until 25 to find the thing I'd actually run at full speed. That thing was marketing. Then it became code. Then it became systems.",
        "I'm at my peak right now, in the middle of the AI era. My only complaint is that a day is too short for what's currently possible.",
      ],
      highlight: "systems",
    },
    timeline: {
      index: "02 — Timeline",
      title: "Where the reps came from.",
      items: [
        {
          year: "2020",
          org: "Mozzart",
          role: "Marketing Manager",
          body: "Digital marketing, data analysis, OOH promotion, brand management. The first serious school — big campaigns, big budgets, a fast feedback loop.",
          tags: ["Campaigns", "Data", "OOH", "Brand"],
        },
        {
          year: "2021",
          org: "Own marketing agency",
          role: "Founder",
          body: "Clients across every industry. Meta advertising, Google Ads, web development, SEO, email, SMS and Viber marketing. 50+ clients over the years.",
          tags: ["Meta Ads", "Google Ads", "SEO", "Email", "Web"],
        },
        {
          year: "2023 — now",
          org: "REC · Refam Creative Solutions",
          role: "Director of Marketing & Development",
          body: "Running the whole of marketing and digital development: the web platform, CRM, CMS, campaigns, and the code underneath. Full ownership of the system.",
          tags: ["Platform", "CRM", "CMS", "Campaigns"],
        },
        {
          year: "Now",
          org: "Grow.ba",
          role: "Founder",
          body: "An agency for websites, software, custom systems, CRM, CMS, SaaS, automation and AI API integrations. Built to outbuild, not to out-pitch.",
          tags: ["SaaS", "Automation", "AI APIs"],
        },
      ],
    },
    work: {
      index: "03 — Web",
      title: "Sites currently in the wild.",
      note: "Hover a row to see it live.",
      more: "+ 40 more",
      visit: "Visit",
    },
    systems: {
      index: "04 — Systems",
      title: "Platforms, not websites.",
      lead: "Every one of these started from an empty folder — schema, back office, permissions, reporting. No page builders.",
      view: "Live",
      pending: "Screenshot pending",
      campaign: "Campaign",
    },
    ai: {
      index: "05 — AI & Content",
      title: "I also make the thing that runs in the ad.",
      body: "Content and graphic design for companies — not just development. Lately that means AI-generated video: script, generation, edit, publish.",
      watch: "Watch on TikTok",
      videoLabel: "AI generated · Higgsfield",
    },
    stack: {
      index: "06 — Stack",
      title: "What I actually work with.",
      groups: [
        {
          name: "Marketing",
          items: [
            "Meta Ads",
            "Google Ads",
            "SEO",
            "Email marketing",
            "SMS / Viber",
            "Brand strategy",
            "Data analytics",
            "OOH",
          ],
        },
        {
          name: "Development",
          items: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind",
            "PHP",
            "MySQL",
            "Supabase",
            "Vercel",
            "CRM / CMS / SaaS architecture",
            "Automation",
            "AI API integration",
          ],
        },
        {
          name: "AI & Creative",
          items: [
            "Claude",
            "ChatGPT",
            "Kimi",
            "Higgsfield",
            "ElevenLabs",
            "21st.dev",
            "Canva",
            "Photoshop",
            "Illustrator",
            "CapCut",
          ],
        },
      ],
      footnote: "And this is a small part of what I actually do.",
    },
    numbers: {
      index: "07 — Numbers",
      items: [
        { value: 6, suffix: "+", label: "Years in marketing" },
        { value: 50, suffix: "+", label: "Clients served" },
        { value: 40, suffix: "+", label: "Websites & platforms shipped" },
        { value: 4, suffix: "", label: "Custom systems built from scratch" },
      ],
    },
    life: {
      index: "08 — Off the clock",
      items: [
        { name: "Work", body: "Build, ship, repeat." },
        { name: "Training", body: "The gym, every day, after work." },
        { name: "Nature", body: "Mountains, water, movement." },
      ],
    },
    next: {
      index: "09 — What's next",
      lead: "Expanding the network of people and markets beyond Bosnia.",
      statement:
        "Grow.ba: the number one web agency in the region within 12 months.",
      highlight: "number one",
    },
    contact: {
      index: "10 — Contact",
      title: "Let's build something.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      copy: "Copy",
      copied: "Email copied to clipboard",
      copyFailed: "Couldn't copy — the address is above, select it manually.",
      instagram: "Instagram",
      noLinkedin: "No LinkedIn. I'd rather build than network.",
      download: "Download CV (PDF)",
      availability: "Sarajevo · Remote · Open to Dubai / Perth",
      availabilityLabel: "Availability",
      colophon: "Built from scratch — Next.js, TypeScript, Motion. No template.",
    },
    cmd: {
      placeholder: "Jump to a section, copy the email…",
      empty: "Nothing matches.",
      sections: "Sections",
      actions: "Actions",
      copyEmail: "Copy email address",
      downloadCv: "Download CV (PDF)",
      printCv: "Open the print version",
      openInstagram: "Open Instagram",
      switchLang: "Switch to Bosnian",
      toggleTheme: "Toggle light / dark",
      hint: "for commands",
    },
    cv: {
      back: "Back to the site",
      print: "Print / Save as PDF",
      profile: "Profile",
      experience: "Experience",
      selected: "Selected web work",
      more: "and 40 more",
      systems: "Custom systems",
      skills: "Skills",
      details: "Details",
    },
  },

  bs: {
    meta: {
      title: "Ajdin Podrinja — Marketing i razvoj",
      description:
        "6+ godina pretvaranja marketinga u sisteme. Web, CRM, SaaS, AI automatizacije. Sarajevo.",
    },
    nav: {
      work: "Web",
      timeline: "Put",
      systems: "Sistemi",
      stack: "Alati",
      contact: "Kontakt",
      menu: "Meni",
      theme: "Tema",
      command: "Komande",
      language: "Jezik",
    },
    hero: {
      role: "Marketing i razvoj",
      claim: "6+ godina pretvaranja marketinga u sisteme — i sistema u prihod.",
      meta: {
        based: "Lokacija",
        basedValue: "Sarajevo, BiH",
        disciplines: "Discipline",
        disciplinesValue: "Marketing · Razvoj · Sistemi",
        status: "Status",
        statusValue: "Otvoren za saradnju",
      },
      scroll: "Skrolaj",
    },
    manifesto: {
      index: "01 — O meni",
      lead: "Ostavio sam ekonomiju jedan diplomski prije diplome. Nije kajanje — skretanje.",
      body: [
        "Trebalo mi je do 25. da nađem stvar u koju ću stvarno ući punim gasom. Ta stvar je bio marketing. Onda je postala kod. Onda su postali sistemi.",
        "Na vrhuncu sam upravo sada, usred AI ere. Jedina žalba mi je što je dan prekratak za ono što je danas moguće.",
      ],
      highlight: "sistemi",
    },
    timeline: {
      index: "02 — Put",
      title: "Odakle dolazi kilometraža.",
      items: [
        {
          year: "2020",
          org: "Mozzart",
          role: "Marketing Manager",
          body: "Digitalni marketing, analiza podataka, OOH promocije, brand management. Prva ozbiljna škola — velike kampanje, veliki budžeti, brz feedback loop.",
          tags: ["Kampanje", "Podaci", "OOH", "Brend"],
        },
        {
          year: "2021",
          org: "Vlastita marketinška agencija",
          role: "Osnivač",
          body: "Klijenti iz svih branši. Meta oglašavanje, Google Ads, web razvoj, SEO, email, SMS i Viber marketing. 50+ klijenata kroz godine.",
          tags: ["Meta Ads", "Google Ads", "SEO", "Email", "Web"],
        },
        {
          year: "2023 — danas",
          org: "REC · Refam Creative Solutions",
          role: "Direktor marketinga i razvoja",
          body: "Vodim kompletan marketing i digitalni razvoj: web platformu, CRM, CMS, kampanje i kod ispod svega toga. Puno vlasništvo nad sistemom.",
          tags: ["Platforma", "CRM", "CMS", "Kampanje"],
        },
        {
          year: "Danas",
          org: "Grow.ba",
          role: "Osnivač",
          body: "Agencija za web sajtove, software, custom sisteme, CRM, CMS, SaaS, automatizacije i AI API integracije. Građena da nadgradi, a ne da nadpriča.",
          tags: ["SaaS", "Automatizacije", "AI API"],
        },
      ],
    },
    work: {
      index: "03 — Web",
      title: "Sajtovi koji su trenutno vani.",
      note: "Pređi mišem preko reda za live pregled.",
      more: "i mnogo drugih",
      visit: "Otvori",
    },
    systems: {
      index: "04 — Sistemi",
      title: "Platforme, ne sajtovi.",
      lead: "Svaki od ovih je počeo iz praznog foldera — šema, back office, dozvole, izvještaji. Bez page buildera.",
      view: "Live",
      pending: "Screenshot u pripremi",
      campaign: "Kampanja",
    },
    ai: {
      index: "05 — AI i sadržaj",
      title: "Radim i ono što se vrti u reklami.",
      body: "Sadržaj i grafički dizajn za firme — ne samo razvoj. U zadnje vrijeme to znači AI video: scenario, generacija, montaža, objava.",
      watch: "Pogledaj na TikToku",
      videoLabel: "AI generisano · Higgsfield",
    },
    stack: {
      index: "06 — Alati",
      title: "S čim stvarno radim.",
      groups: [
        {
          name: "Marketing",
          items: [
            "Meta Ads",
            "Google Ads",
            "SEO",
            "Email marketing",
            "SMS / Viber",
            "Brend strategija",
            "Analitika",
            "OOH",
          ],
        },
        {
          name: "Razvoj",
          items: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind",
            "PHP",
            "MySQL",
            "Supabase",
            "Vercel",
            "CRM / CMS / SaaS arhitektura",
            "Automatizacije",
            "AI API integracije",
          ],
        },
        {
          name: "AI i kreativa",
          items: [
            "Claude",
            "ChatGPT",
            "Kimi",
            "Higgsfield",
            "ElevenLabs",
            "21st.dev",
            "Canva",
            "Photoshop",
            "Illustrator",
            "CapCut",
          ],
        },
      ],
      footnote: "I ovo je mali dio onoga što sve znam.",
    },
    numbers: {
      index: "07 — Brojke",
      items: [
        { value: 6, suffix: "+", label: "Godina u marketingu" },
        { value: 50, suffix: "+", label: "Klijenata" },
        { value: 40, suffix: "+", label: "Sajtova i platformi" },
        { value: 4, suffix: "", label: "Sistema građena od nule" },
      ],
    },
    life: {
      index: "08 — Van posla",
      items: [
        { name: "Posao", body: "Gradi, isporuči, ponovi." },
        { name: "Trening", body: "Teretana, svaki dan, poslije posla." },
        { name: "Priroda", body: "Planina, voda, kretanje." },
      ],
    },
    next: {
      index: "09 — Šta dalje",
      lead: "Širenje mreže ljudi i tržišta izvan Bosne.",
      statement:
        "Grow.ba: broj jedan agencija za web rješenja u regiji u narednih 12 mjeseci.",
      highlight: "broj jedan",
    },
    contact: {
      index: "10 — Kontakt",
      title: "Hajmo graditi.",
      emailLabel: "Email",
      phoneLabel: "Telefon",
      copy: "Kopiraj",
      copied: "Email kopiran",
      copyFailed: "Kopiranje nije uspjelo — adresa je iznad, označi je ručno.",
      instagram: "Instagram",
      noLinkedin: "Nema LinkedIna. Radije gradim nego što networkam.",
      download: "Preuzmi CV (PDF)",
      availability: "Sarajevo · Remote · Otvoren za Dubai / Perth",
      availabilityLabel: "Dostupnost",
      colophon: "Građeno od nule — Next.js, TypeScript, Motion. Bez templatea.",
    },
    cmd: {
      placeholder: "Skoči na sekciju, kopiraj email…",
      empty: "Nema rezultata.",
      sections: "Sekcije",
      actions: "Akcije",
      copyEmail: "Kopiraj email adresu",
      downloadCv: "Preuzmi CV (PDF)",
      printCv: "Otvori verziju za štampu",
      openInstagram: "Otvori Instagram",
      switchLang: "Prebaci na engleski",
      toggleTheme: "Svijetla / tamna tema",
      hint: "za komande",
    },
    cv: {
      back: "Nazad na sajt",
      print: "Štampaj / Sačuvaj kao PDF",
      profile: "Profil",
      experience: "Iskustvo",
      selected: "Izabrani web radovi",
      more: "i mnogo drugih",
      systems: "Custom sistemi",
      skills: "Vještine",
      details: "Detalji",
    },
  },
};

export type Content = (typeof content)["en"];
