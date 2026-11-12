/**
 * Text for the student volunteer pages: /join/students (English) and
 * /join/studenten (Dutch), plus their thanks pages.
 *
 * Wording rules: every role is volunteer and unpaid. Never call them
 * internships, and never promise pay, university credit or references.
 */

export const studentLangs = ["en", "nl"] as const;
export type StudentLang = (typeof studentLangs)[number];

export const studentPaths = {
  landing: { en: "/join/students", nl: "/join/studenten" },
  thanks: { en: "/join/students/thanks", nl: "/join/studenten/bedankt" },
} as const;

/** Team ids match content/join-teams.json and the Worker's TEAM_IDS. */
export const studentTeamIds = ["ctf", "consultancy", "swe", "marketing", "events"] as const;
export type StudentTeamId = (typeof studentTeamIds)[number];

/** Values the Worker expects; only the labels are translated. */
export const affiliationIds = ["um-student", "other-student", "industry", "other"] as const;
export const hourValues = ["Under 5", "5–10", "10–20", "20+"] as const;

type Item = { title: string; body: string };

export type StudentCopy = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; intro: string; points: string[] };
  formCard: { title: string; intro: string };
  form: {
    team: string;
    chooseTeam: string;
    firstName: string;
    surname: string;
    email: string;
    affiliation: string;
    affiliations: Record<(typeof affiliationIds)[number], string>;
    hours: string;
    hourLabels: Record<(typeof hourValues)[number], string>;
    choose: string;
    studentNumber: string;
    links: string;
    motivation: string;
    submit: string;
    sending: string;
    sendError: string;
    networkError: string;
    privacyNote: string;
    privacyLink: string;
    doneTitle: string;
    doneBody: string;
  };
  about: { title: string; paragraphs: string[] };
  roles: { title: string; intro: string; teams: Record<StudentTeamId, Item> };
  benefits: { title: string; items: string[] };
  time: { title: string; body: string };
  steps: { title: string; items: Item[] };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; body: string; button: string };
  thanks: {
    metaTitle: string;
    title: string;
    intro: string;
    steps: Item[];
    noReply: [string, string];
    aboutButton: string;
  };
};

const en: StudentCopy = {
  meta: {
    title: "Cybersecurity volunteering for students in Maastricht",
    description:
      "Get real cybersecurity experience while you study in Maastricht. Volunteer with MaaSec's CTF, consultancy, software, marketing or events team. No experience needed.",
  },
  hero: {
    eyebrow: "For students in Maastricht · volunteer roles",
    title: "Get real cybersecurity experience while you study",
    intro:
      "MaaSec is a volunteer-run non-profit association from Maastricht. Our volunteer cybersecurity specialists protect small organisations that can't afford professional security, and we run talks, workshops and capture-the-flag events. Students from Maastricht University, Zuyd and other schools in the city can join a team, whatever their experience.",
    points: [
      "Unpaid volunteer roles, flexible around your studies",
      "No experience or CV needed",
      "An English-speaking, international team",
    ],
  },
  formCard: {
    title: "Apply in 30 seconds",
    intro: "Pick a team and tell us a little about yourself. We reply by email, usually within a week.",
  },
  form: {
    team: "Team",
    chooseTeam: "Choose a team",
    firstName: "First name",
    surname: "Surname",
    email: "Email",
    affiliation: "You are",
    affiliations: {
      "um-student": "Maastricht University student",
      "other-student": "Student elsewhere (e.g. Zuyd)",
      industry: "Working",
      other: "Other",
    },
    hours: "Hours per week",
    hourLabels: { "Under 5": "Under 5", "5–10": "5–10", "10–20": "10–20", "20+": "20+" },
    choose: "Choose one",
    studentNumber: "Student number",
    links: "GitHub, LinkedIn or CTFtime profile (optional)",
    motivation: "Why do you want to join? Experience is welcome, but not needed.",
    submit: "Send application",
    sending: "Sending application…",
    sendError: "The application didn't go through. Try again, or email us.",
    networkError: "You appear to be offline. Check your connection and try again.",
    privacyNote: "We use your details only to process your application. See our",
    privacyLink: "privacy page",
    doneTitle: "Application sent.",
    doneBody: "We read every application and reply by email, usually within a week.",
  },
  about: {
    title: "What MaaSec does",
    paragraphs: [
      "MaaSec protects small businesses, non-profits and community organisations that can't afford professional cybersecurity. Our volunteers carry out free security reviews and AI-assisted penetration tests, give practical advice, and run awareness training.",
      "We also organise public talks, hands-on workshops and capture-the-flag (CTF) competitions, and our CTF team competes internationally. Everyone involved is a volunteer, and all income goes back into these activities.",
    ],
  },
  roles: {
    title: "Choose your team",
    intro:
      "All roles are volunteer and unpaid. They're not internships, and they don't come with pay or university credit. What they do come with is real work on real projects.",
    teams: {
      ctf: {
        title: "CTF team",
        body: "Capture-the-flag competitions: solve hacking challenges in web security, cryptography, reverse engineering and forensics, and learn offensive and defensive security from your teammates, starting from zero if you need to.",
      },
      consultancy: {
        title: "Consultancy & security reviews",
        body: "Help carry out free AI pentests and security reviews for small organisations. You work on real websites, and experienced members check everything before it goes to the organisation.",
      },
      swe: {
        title: "Software development",
        body: "Build MaaSec's own security tools in a small team where your code actually gets used.",
      },
      marketing: {
        title: "Marketing & outreach",
        body: "Find small organisations and non-profits that need free security help, build partnerships, and run our social media.",
      },
      events: {
        title: "Events",
        body: "Organise talks, workshops and CTF events: book speakers, plan the day and bring people together.",
      },
    },
  },
  benefits: {
    title: "What you get",
    items: [
      "Hands-on experience with real security work, not just coursework",
      "Real projects you can put on your CV and LinkedIn",
      "A team of people who share your interest, from beginners to experienced players",
      "Talks, workshops and CTF events throughout the year",
    ],
  },
  time: {
    title: "How much time it takes",
    body: "You decide. The application asks how many hours a week you can give, from under five upwards, and the work is flexible around exams and deadlines. If you're busy for a few weeks, just tell your team lead.",
  },
  steps: {
    title: "How it works",
    items: [
      { title: "Apply in 30 seconds", body: "Your name, email and the team you're interested in. No CV needed." },
      { title: "Have a 15-minute chat", body: "A short call with the team lead about your interests and experience." },
      { title: "Onboard and start", body: "Meet the team and pick up your first task." },
    ],
  },
  faq: {
    title: "Questions",
    items: [
      {
        q: "Do I need experience?",
        a: "No. Many members start without any security background. The CTF team trains people from zero, and every team has experienced members to learn from. Curiosity and a few hours a week matter more than a CV.",
      },
      {
        q: "Is it paid?",
        a: "No. All roles at MaaSec are volunteer and unpaid, and they aren't internships or a route to university credit. MaaSec is a non-profit: all income is reinvested in our activities.",
      },
      {
        q: "Do I need to speak Dutch?",
        a: "No. MaaSec works in English and many members are international students. Dutch helps when reaching out to local organisations, but it's never a requirement.",
      },
      {
        q: "Which students can join?",
        a: "Students at Maastricht University, Zuyd University of Applied Sciences and other schools in and around Maastricht, including international and exchange students, from any study programme.",
      },
    ],
  },
  cta: {
    title: "Ready to get started?",
    body: "Applying takes 30 seconds. We reply by email, usually within a week.",
    button: "Apply now",
  },
  thanks: {
    metaTitle: "Application received",
    title: "Thanks, your application is in",
    intro: "We read every application and reply by email, usually within a week. Here's what happens next.",
    steps: [
      { title: "A team lead emails you", body: "To set up a 15-minute chat about your interests and experience." },
      { title: "You meet the team", body: "We get you onboarded and you pick up your first task." },
    ],
    noReply: ["Haven't heard from us within a week? Email", "."],
    aboutButton: "Learn more about MaaSec",
  },
};

const nl: StudentCopy = {
  meta: {
    title: "Vrijwilligerswerk in cybersecurity voor studenten in Maastricht",
    description:
      "Doe echte cybersecurity-ervaring op naast je studie in Maastricht. Word vrijwilliger in het CTF-, consultancy-, software-, marketing- of eventsteam van MaaSec. Geen ervaring nodig.",
  },
  hero: {
    eyebrow: "Voor studenten in Maastricht · vrijwilligersrollen",
    title: "Doe echte cybersecurity-ervaring op naast je studie",
    intro:
      "MaaSec is een non-profitvereniging uit Maastricht die volledig door vrijwilligers wordt gerund. Onze vrijwillige cybersecurityspecialisten beschermen kleine organisaties die zich geen professionele beveiliging kunnen veroorloven, en we organiseren lezingen, workshops en capture-the-flag-evenementen. Studenten van de Universiteit Maastricht, Zuyd en andere scholen in de stad kunnen bij een team, met of zonder ervaring.",
    points: [
      "Onbetaalde vrijwilligersrollen, flexibel naast je studie",
      "Geen ervaring of cv nodig",
      "Een Engelstalig, internationaal team",
    ],
  },
  formCard: {
    title: "Meld je aan in 30 seconden",
    intro: "Kies een team en vertel kort iets over jezelf. We reageren per e-mail, meestal binnen een week.",
  },
  form: {
    team: "Team",
    chooseTeam: "Kies een team",
    firstName: "Voornaam",
    surname: "Achternaam",
    email: "E-mail",
    affiliation: "Je bent",
    affiliations: {
      "um-student": "Student aan de Universiteit Maastricht",
      "other-student": "Student elders (bijv. Zuyd)",
      industry: "Werkend",
      other: "Anders",
    },
    hours: "Uren per week",
    hourLabels: { "Under 5": "Minder dan 5", "5–10": "5–10", "10–20": "10–20", "20+": "20+" },
    choose: "Kies er een",
    studentNumber: "Studentnummer",
    links: "GitHub-, LinkedIn- of CTFtime-profiel (optioneel)",
    motivation: "Waarom wil je meedoen? Ervaring is welkom, maar niet nodig.",
    submit: "Verstuur aanmelding",
    sending: "Aanmelding versturen…",
    sendError: "Je aanmelding is niet verstuurd. Probeer het opnieuw of mail ons.",
    networkError: "Je lijkt offline te zijn. Controleer je verbinding en probeer het opnieuw.",
    privacyNote: "We gebruiken je gegevens alleen om je aanmelding te verwerken. Zie onze",
    privacyLink: "privacypagina",
    doneTitle: "Aanmelding verstuurd.",
    doneBody: "We lezen elke aanmelding en reageren per e-mail, meestal binnen een week.",
  },
  about: {
    title: "Wat MaaSec doet",
    paragraphs: [
      "MaaSec beschermt kleine bedrijven, non-profits en maatschappelijke organisaties die zich geen professionele cybersecurity kunnen veroorloven. Onze vrijwilligers voeren gratis securityreviews en AI-pentests uit, geven praktisch advies en verzorgen bewustwordingstrainingen.",
      "Daarnaast organiseren we openbare lezingen, praktische workshops en capture-the-flag-wedstrijden (CTF's), en ons CTF-team doet internationaal mee. Iedereen is vrijwilliger, en alle inkomsten gaan terug naar deze activiteiten.",
    ],
  },
  roles: {
    title: "Kies je team",
    intro:
      "Alle rollen zijn vrijwillig en onbetaald. Het zijn geen stages, en ze leveren geen salaris of studiepunten op. Wat je wel krijgt: echt werk aan echte projecten.",
    teams: {
      ctf: {
        title: "CTF-team",
        body: "Capture-the-flag-wedstrijden: los hackuitdagingen op in webbeveiliging, cryptografie, reverse engineering en forensisch onderzoek, en leer offensieve en defensieve security van je teamgenoten, desnoods vanaf nul.",
      },
      consultancy: {
        title: "Consultancy & securityreviews",
        body: "Help mee met gratis AI-pentests en securityreviews voor kleine organisaties. Je werkt aan echte websites, en ervaren leden controleren alles voordat het naar de organisatie gaat.",
      },
      swe: {
        title: "Softwareontwikkeling",
        body: "Bouw de eigen securitytools van MaaSec in een klein team waar je code ook echt gebruikt wordt.",
      },
      marketing: {
        title: "Marketing & outreach",
        body: "Vind kleine organisaties en non-profits die gratis securityhulp nodig hebben, bouw samenwerkingen op en beheer onze social media.",
      },
      events: {
        title: "Events",
        body: "Organiseer lezingen, workshops en CTF-evenementen: boek sprekers, plan de dag en breng mensen samen.",
      },
    },
  },
  benefits: {
    title: "Wat je eraan hebt",
    items: [
      "Praktijkervaring met echt securitywerk, niet alleen studiestof",
      "Echte projecten voor op je cv en LinkedIn",
      "Een team van mensen met dezelfde interesse, van beginners tot ervaren spelers",
      "Lezingen, workshops en CTF-evenementen door het hele jaar",
    ],
  },
  time: {
    title: "Hoeveel tijd het kost",
    body: "Dat bepaal je zelf. In de aanmelding geef je aan hoeveel uur per week je kunt, vanaf minder dan vijf, en het werk is flexibel rond tentamens en deadlines. Heb je een paar weken geen tijd? Laat het je teamleider gewoon weten.",
  },
  steps: {
    title: "Hoe het werkt",
    items: [
      { title: "Meld je aan in 30 seconden", body: "Je naam, e-mail en het team dat je interesseert. Geen cv nodig." },
      { title: "Een gesprek van 15 minuten", body: "Een kort gesprek met de teamleider over je interesses en ervaring." },
      { title: "Inwerken en beginnen", body: "Maak kennis met het team en pak je eerste taak op." },
    ],
  },
  faq: {
    title: "Veelgestelde vragen",
    items: [
      {
        q: "Heb ik ervaring nodig?",
        a: "Nee. Veel leden beginnen zonder enige securityachtergrond. Het CTF-team leidt mensen op vanaf nul, en in elk team zitten ervaren leden van wie je kunt leren. Nieuwsgierigheid en een paar uur per week zijn belangrijker dan een cv.",
      },
      {
        q: "Word ik betaald?",
        a: "Nee. Alle rollen bij MaaSec zijn vrijwillig en onbetaald, en het zijn geen stages of manieren om studiepunten te halen. MaaSec is een non-profit: alle inkomsten investeren we opnieuw in onze activiteiten.",
      },
      {
        q: "Moet ik Nederlands spreken?",
        a: "Nee. MaaSec werkt in het Engels en veel leden zijn internationale studenten. Nederlands is handig bij contact met lokale organisaties, maar nooit een vereiste.",
      },
      {
        q: "Welke studenten kunnen meedoen?",
        a: "Studenten van de Universiteit Maastricht, Zuyd Hogeschool en andere scholen in en rond Maastricht, inclusief internationale en exchangestudenten, van elke opleiding.",
      },
    ],
  },
  cta: {
    title: "Klaar om te beginnen?",
    body: "Aanmelden kost 30 seconden. We reageren per e-mail, meestal binnen een week.",
    button: "Meld je aan",
  },
  thanks: {
    metaTitle: "Aanmelding ontvangen",
    title: "Bedankt, je aanmelding is binnen",
    intro: "We lezen elke aanmelding en reageren per e-mail, meestal binnen een week. Dit gebeurt er nu.",
    steps: [
      { title: "Een teamleider mailt je", body: "Om een gesprek van 15 minuten te plannen over je interesses en ervaring." },
      { title: "Je maakt kennis met het team", body: "We werken je in en je pakt je eerste taak op." },
    ],
    noReply: ["Binnen een week niets van ons gehoord? Mail", "."],
    aboutButton: "Meer over MaaSec",
  },
};

export const studentCopy: Record<StudentLang, StudentCopy> = { en, nl };
