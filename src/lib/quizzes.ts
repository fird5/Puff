export type QuizQuestion = {
  id: string;
  tag: "sg" | "sea";
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  wow: string;
  oof: string;
};

export const QUESTION_BANK: QuizQuestion[] = [
  {
    id: "chope",
    tag: "sg",
    prompt: "You see a packet of tissue on a hawker table. What happened?",
    choices: ["Someone forgot their cold", "The table is chopped. Do not sit.", "Free tissue from the stall", "It is a tip for the cleaner"],
    answer: 1,
    wow: "Correct. That tissue has diplomatic immunity.",
    oof: "Ah. You sat. The original chopper is already walking over.",
  },
  {
    id: "kopio",
    tag: "sg",
    prompt: "You order kopi-o kosong. What lands?",
    choices: ["Coffee with milk and sugar", "Tea with evaporated milk", "Black coffee, no sugar", "Iced chocolate"],
    answer: 2,
    wow: "Auntie nods. You are one of us.",
    oof: "That was a different drink. Auntie is disappointed but professional.",
  },
  {
    id: "shiok",
    tag: "sg",
    prompt: "What does shiok mean, roughly?",
    choices: ["Expensive", "Late for the MRT", "A deep, satisfying yes", "Spicy enough to cry"],
    answer: 2,
    wow: "Shiok. Even Puff felt that.",
    oof: "Shiok is the sound of a good bite, not a complaint.",
  },
  {
    id: "padthai",
    tag: "sg",
    prompt: "Which dish is not a Singapore hawker hall-of-famer?",
    choices: ["Hainanese chicken rice", "Laksa", "Chili crab", "Pad thai"],
    answer: 3,
    wow: "Pad thai is a guest. Chicken rice lives here.",
    oof: "Pad thai is Thai. We borrow it, we do not claim it.",
  },
  {
    id: "mrteat",
    tag: "sg",
    prompt: "On Singapore’s MRT, eating is…",
    choices: ["Encouraged if you share", "Fine if it is not durian", "Not allowed", "Only on weekends"],
    answer: 2,
    wow: "Save the bak kwa for the platform.",
    oof: "The uncle with the newspaper already saw you.",
  },
  {
    id: "mrtname",
    tag: "sg",
    prompt: "What does MRT actually stand for?",
    choices: ["Main Rail Tunnel", "Mass Rapid Transit", "Metro Regional Train", "Moving Really Timely"],
    answer: 1,
    wow: "You may board. Doors are closing.",
    oof: "Stand behind the yellow line and try again.",
  },
  {
    id: "merlion",
    tag: "sg",
    prompt: "The Merlion is…",
    choices: ["A real animal from Pulau Ubin", "Lion head, fish body, national mascot", "A dragon that spits kopi", "The old name for Sentosa"],
    answer: 1,
    wow: "Tourist-core, but correct.",
    oof: "It is a lion-fish mashup. Singapore branding 101.",
  },
  {
    id: "changi",
    tag: "sg",
    prompt: "Changi Airport is famous for, among other things…",
    choices: ["Having no terminals", "A waterfall inside the building", "Only serving budget airlines", "Being in Malaysia"],
    answer: 1,
    wow: "Jewel’s rain vortex. People fly in just to stand under it.",
    oof: "There is a giant indoor waterfall. It is extra. It is ours.",
  },
  {
    id: "sentosa",
    tag: "sg",
    prompt: "Sentosa’s old name, Pulau Blakang Mati, roughly means…",
    choices: ["Island of behind the dead", "Island of endless BBQ", "South holiday rock", "Fort of the lion"],
    answer: 0,
    wow: "Dark history, sunny beach. Very Singapore.",
    oof: "It is the grim old name. Now it is theme parks and sunscreen.",
  },
  {
    id: "nday",
    tag: "sg",
    prompt: "Singapore’s National Day is…",
    choices: ["9 August", "1 June", "31 August", "16 September"],
    answer: 0,
    wow: "The flypast is already in your head. Admit it.",
    oof: "9 August 1965 energy. Not Malaysia’s, not Mexico’s.",
  },
  {
    id: "langs",
    tag: "sg",
    prompt: "How many official languages does Singapore have?",
    choices: ["One", "Two", "Three", "Four"],
    answer: 3,
    wow: "English, Malay, Mandarin, Tamil. The full set.",
    oof: "Four. Malay is the national language; English does the daily grind.",
  },
  {
    id: "kiasu",
    tag: "sg",
    prompt: "Kiasu, in everyday Singlish, is closest to…",
    choices: ["Afraid to lose", "Very spicy", "Always late", "Super polite"],
    answer: 0,
    wow: "Queue early. Bring extra. That is the way.",
    oof: "Kiasu is the fear of losing out. National sport, unofficially.",
  },
  {
    id: "unesco",
    tag: "sg",
    prompt: "Singapore hawker culture is recognised by UNESCO as…",
    choices: ["A World Heritage city", "Intangible cultural heritage", "A Michelin region", "A spice route"],
    answer: 1,
    wow: "The plastic stool has diplomatic status now.",
    oof: "Intangible cultural heritage. The chicken rice earned it.",
  },
  {
    id: "esplanade",
    tag: "sg",
    prompt: "Locals joke that the Esplanade looks like…",
    choices: ["A chilli crab", "A durian", "A merlion egg", "A kopitiam bun"],
    answer: 1,
    wow: "The durian. We said it so you don’t have to whisper it.",
    oof: "It is the durian. Spiky arts centre. You knew.",
  },
  {
    id: "psi",
    tag: "sg",
    prompt: "Singapore’s 24-hour air quality index is called the…",
    choices: ["AQI", "Haze-O-Meter", "PSI", "PM Club"],
    answer: 2,
    wow: "Pollutant Standards Index. You are in the right app.",
    oof: "PSI. That big number Puff keeps staring at.",
  },
  {
    id: "hdb",
    tag: "sg",
    prompt: "Most Singapore residents live in homes built by…",
    choices: ["HDB", "IKEA", "the airport", "Sentosa Cove only"],
    answer: 0,
    wow: "Housing & Development Board. The void deck is a public square.",
    oof: "HDB. The blocks with the void decks and the auntie sales.",
  },
  {
    id: "ubin",
    tag: "sg",
    prompt: "Pulau Ubin is best known as…",
    choices: ["A shopping mall", "A kampung-style island off the mainland", "Changi’s fourth terminal", "A casino"],
    answer: 1,
    wow: "Bikes, quarries, and no rush. Puff would nap there.",
    oof: "It is the sleepy island east of the mainland. Chek Jawa energy.",
  },
  {
    id: "laksa",
    tag: "sg",
    prompt: "Katong laksa is a Singapore take on a soup that also lives in…",
    choices: ["Malaysia", "Korea", "India", "Australia"],
    answer: 0,
    wow: "Cut the noodles. Debate the coconut. Carry on.",
    oof: "Malaysia and Singapore share laksa custody. The lawyers are tired.",
  },
  {
    id: "citystate",
    tag: "sg",
    prompt: "The only city-state in ASEAN is…",
    choices: ["Brunei", "Singapore", "Phnom Penh", "Manila"],
    answer: 1,
    wow: "One island, one country, one PSI map.",
    oof: "Singapore. Brunei is a sultanate, not a city-state in the same way.",
  },
  {
    id: "chilicrab",
    tag: "sg",
    prompt: "Chili crab is typically eaten with…",
    choices: ["A fork only, very neatly", "Mantou buns for the gravy", "Plain ice cubes", "A straw"],
    answer: 1,
    wow: "The bun is the point. The crab is the excuse.",
    oof: "Fried mantou. You mop. That is the contract.",
  },
  {
    id: "vanda",
    tag: "sg",
    prompt: "Singapore’s national flower is…",
    choices: ["Rafflesia", "Vanda Miss Joaquim", "Frangipani", "Lotus"],
    answer: 1,
    wow: "A hybrid orchid. Very us.",
    oof: "Vanda Miss Joaquim. Named after the woman who bred it.",
  },
  {
    id: "mbs",
    tag: "sg",
    prompt: "The ship-shaped roof in the Marina Bay skyline sits on…",
    choices: ["The Esplanade", "Marina Bay Sands", "Changi Jewel", "Haw Par Villa"],
    answer: 1,
    wow: "Three towers, one boat, many selfies.",
    oof: "Marina Bay Sands. The infinity pool is upstairs. You are downstairs.",
  },
  {
    id: "durianban",
    tag: "sg",
    prompt: "Durian is famously not welcome on…",
    choices: ["Hawker tables", "The MRT and many hotels", "Orchard Road pavements", "National Day parades"],
    answer: 1,
    wow: "The smell has its own no-entry sign.",
    oof: "Trains, lifts, hotels. The king of fruit is under house arrest.",
  },
  {
    id: "1965",
    tag: "sg",
    prompt: "Singapore became an independent republic in…",
    choices: ["1819", "1959", "1965", "1990"],
    answer: 2,
    wow: "9 August 1965. The rest is flypast.",
    oof: "1965. Raffles dropped by much earlier; independence is the later plot twist.",
  },
  {
    id: "pho",
    tag: "sea",
    prompt: "Pho, the noodle soup, is from…",
    choices: ["Thailand", "Vietnam", "Indonesia", "Brunei"],
    answer: 1,
    wow: "Bowl of heaven. Extra herbs. No notes.",
    oof: "Vietnam. Thailand has tom yum. Different personality.",
  },
  {
    id: "angkor",
    tag: "sea",
    prompt: "Angkor Wat is in…",
    choices: ["Laos", "Myanmar", "Cambodia", "The Philippines"],
    answer: 2,
    wow: "Sunrise temples. Bring water.",
    oof: "Cambodia. It is even on their flag.",
  },
  {
    id: "petronas",
    tag: "sea",
    prompt: "The Petronas Twin Towers stand in…",
    choices: ["Jakarta", "Bangkok", "Kuala Lumpur", "Manila"],
    answer: 2,
    wow: "KL’s skyline handshake.",
    oof: "Kuala Lumpur, Malaysia. You can almost wave from JB.",
  },
  {
    id: "adobo",
    tag: "sea",
    prompt: "Adobo, the vinegar-garlic classic, is most at home in…",
    choices: ["The Philippines", "Singapore", "Timor-Leste", "Malaysia"],
    answer: 0,
    wow: "Comfort food energy. Seconds are implied.",
    oof: "The Philippines. We love it here; we did not invent it.",
  },
  {
    id: "asean",
    tag: "sea",
    prompt: "ASEAN’s secretariat sits in…",
    choices: ["Singapore", "Bangkok", "Jakarta", "Hanoi"],
    answer: 2,
    wow: "Jakarta. The neighbourhood clubhouse.",
    oof: "Jakarta, Indonesia. We host meetings. They host the office.",
  },
  {
    id: "tomyum",
    tag: "sea",
    prompt: "Tom yum is a hot-sour soup most associated with…",
    choices: ["Vietnam", "Thailand", "Laos", "Brunei"],
    answer: 1,
    wow: "Lemongrass, lime, and a gentle threat.",
    oof: "Thailand. The soup that wakes the whole table.",
  },
  {
    id: "bali",
    tag: "sea",
    prompt: "Bali is a province of…",
    choices: ["Malaysia", "the Philippines", "Indonesia", "Timor-Leste"],
    answer: 2,
    wow: "Indonesia. Temples, rice terraces, scooters.",
    oof: "Indonesia. Not its own country, however much the airport feels like one.",
  },
  {
    id: "borobudur",
    tag: "sea",
    prompt: "Borobudur, the vast Buddhist temple, is in…",
    choices: ["Cambodia", "Thailand", "Indonesia", "Myanmar"],
    answer: 2,
    wow: "Java. Sunrise from the stupa is a whole personality.",
    oof: "Indonesia — Central Java. Not Angkor. Different masterpiece.",
  },
  {
    id: "halong",
    tag: "sea",
    prompt: "Hạ Long Bay’s limestone karsts are in…",
    choices: ["Vietnam", "the Philippines", "Malaysia", "Laos"],
    answer: 0,
    wow: "Junk boat, mist, karsts. Correct.",
    oof: "Northern Vietnam. UNESCO and a thousand postcards.",
  },
  {
    id: "nasilemak",
    tag: "sea",
    prompt: "Nasi lemak — coconut rice, sambal, ikan bilis — is a breakfast hero of…",
    choices: ["Vietnam", "Malaysia", "Cambodia", "Myanmar"],
    answer: 1,
    wow: "Malaysia. Singapore serves it too, with feelings.",
    oof: "Malaysia’s national breakfast, argued over at every kopitiam.",
  },
  {
    id: "banhmi",
    tag: "sea",
    prompt: "Bánh mì, the baguette sandwich, comes from…",
    choices: ["France only", "Vietnam", "Singapore", "Thailand"],
    answer: 1,
    wow: "Vietnam, with a French accent and pâté.",
    oof: "Vietnam. The baguette moved in and never left.",
  },
  {
    id: "ringgit",
    tag: "sea",
    prompt: "Malaysia’s currency is the…",
    choices: ["Baht", "Rupiah", "Ringgit", "Dong"],
    answer: 2,
    wow: "RM. Useful if you ever cross the causeway.",
    oof: "Ringgit. Baht is Thailand, rupiah is Indonesia, dong is Vietnam.",
  },
  {
    id: "baht",
    tag: "sea",
    prompt: "Thailand’s currency is the…",
    choices: ["Baht", "Kip", "Riel", "Peso"],
    answer: 0,
    wow: "Baht. Street food math starts here.",
    oof: "Baht. Kip is Laos, riel is Cambodia, peso is the Philippines.",
  },
  {
    id: "rupiah",
    tag: "sea",
    prompt: "Indonesia’s currency is the…",
    choices: ["Ringgit", "Rupiah", "Riel", "Kyat"],
    answer: 1,
    wow: "Lots of zeros. Still rupiah.",
    oof: "Rupiah. Bring a card and a sense of humour about the zeros.",
  },
  {
    id: "members",
    tag: "sea",
    prompt: "ASEAN has how many member states?",
    choices: ["5", "8", "10", "12"],
    answer: 2,
    wow: "Ten neighbours in the club.",
    oof: "Ten. Timor-Leste has been knocking; the ten are already in.",
  },
  {
    id: "brunei",
    tag: "sea",
    prompt: "Brunei is known as a…",
    choices: ["Landlocked desert", "Small sultanate on Borneo", "Pacific atoll", "Himalayan kingdom"],
    answer: 1,
    wow: "Tiny, oil-rich, Borneo. Correct.",
    oof: "It sits on Borneo, next to Malaysia’s Sarawak and Sabah.",
  },
  {
    id: "mekong",
    tag: "sea",
    prompt: "The Mekong River does not flow through…",
    choices: ["Laos", "Cambodia", "Vietnam", "Singapore"],
    answer: 3,
    wow: "Singapore has no Mekong. We have drains with ambition.",
    oof: "Singapore is an island. The Mekong stays on the mainland.",
  },
  {
    id: "luang",
    tag: "sea",
    prompt: "Luang Prabang, temple town extraordinaire, is in…",
    choices: ["Thailand", "Laos", "Myanmar", "Cambodia"],
    answer: 1,
    wow: "Laos. Slow river, saffron, baguettes.",
    oof: "Laos. UNESCO town on the Mekong.",
  },
  {
    id: "peso",
    tag: "sea",
    prompt: "The Philippines uses the…",
    choices: ["Peso", "Dong", "Kyat", "Kip"],
    answer: 0,
    wow: "Philippine peso. Jeepney money.",
    oof: "Peso. Dong is Vietnam, kyat Myanmar, kip Laos.",
  },
  {
    id: "satay",
    tag: "sea",
    prompt: "Satay — grilled skewers with peanut sauce — is most at home across…",
    choices: ["Japan", "maritime Southeast Asia", "the Middle East", "Northern China"],
    answer: 1,
    wow: "Malay world classic. Eat it over the drain like a local.",
    oof: "Indonesia, Malaysia, Singapore — the skewer belt.",
  },
  {
    id: "naypyidaw",
    tag: "sea",
    prompt: "Myanmar’s purpose-built capital is…",
    choices: ["Yangon", "Mandalay", "Naypyidaw", "Bagan"],
    answer: 2,
    wow: "Naypyidaw. Wide roads, quiet capital.",
    oof: "Naypyidaw. Yangon is the old main city; Bagan is the temples.",
  },
  {
    id: "rendang",
    tag: "sea",
    prompt: "Rendang, slow-cooked until the gravy clings, is a pride of…",
    choices: ["Thailand", "Vietnam", "Minangkabau / Indonesia", "Cambodia"],
    answer: 2,
    wow: "Patience in a pot. CNN once called it the world’s best food.",
    oof: "West Sumatra, Indonesia. Malaysia makes a version. The comments are on fire.",
  },
  {
    id: "songkran",
    tag: "sea",
    prompt: "Songkran, the water festival new year, is celebrated in…",
    choices: ["Thailand", "Brunei", "Singapore only", "Timor-Leste"],
    answer: 0,
    wow: "Soak everyone. Reset the year.",
    oof: "Thailand (and neighbours with their own water new years). Bring a dry bag.",
  },
  {
    id: "halohalo",
    tag: "sea",
    prompt: "Halo-halo, the shaved-ice dessert with a little of everything, is from…",
    choices: ["Malaysia", "the Philippines", "Laos", "Myanmar"],
    answer: 1,
    wow: "Mix it. That is the instruction and the name.",
    oof: "The Philippines. Ice, beans, leche flan, chaos, joy.",
  },
  {
    id: "amok",
    tag: "sea",
    prompt: "Fish amok, steamed in banana leaf with coconut and kroeung, is a signature of…",
    choices: ["Cambodia", "Singapore", "Brunei", "Vietnam"],
    answer: 0,
    wow: "Cambodia on a spoon.",
    oof: "Cambodia. If you said laksa, sit down.",
  },
  {
    id: "bagan",
    tag: "sea",
    prompt: "The plain dotted with thousands of temples at sunrise is…",
    choices: ["Bagan, Myanmar", "Borobudur, Java", "Ayutthaya, Thailand", "Hue, Vietnam"],
    answer: 0,
    wow: "Hot air balloons optional. Wonder mandatory.",
    oof: "Bagan. Different from Angkor, different from Borobudur.",
  },
  {
    id: "jeepney",
    tag: "sea",
    prompt: "The jeepney is a colourful public ride most associated with…",
    choices: ["Bangkok", "Jakarta", "Manila and the Philippines", "Bandar Seri Begawan"],
    answer: 2,
    wow: "Chrome, colour, and a tight squeeze.",
    oof: "The Philippines. Converted jeeps that became a national icon.",
  },
  {
    id: "sticky",
    tag: "sea",
    prompt: "Sticky rice eaten by hand as a daily staple is most at home in…",
    choices: ["Laos", "Singapore", "the Philippines", "Brunei"],
    answer: 0,
    wow: "Laos. Roll, dip, repeat.",
    oof: "Laos (and nearby Isan). Not a dessert. A personality.",
  },
  {
    id: "timor",
    tag: "sea",
    prompt: "Timor-Leste, the young nation on Timor island, uses which official languages?",
    choices: ["Only English", "Tetum and Portuguese", "Only Bahasa Indonesia", "Thai and Lao"],
    answer: 1,
    wow: "Tetum and Portuguese, with Indonesian and English in the mix.",
    oof: "Tetum and Portuguese. The neighbour on the island is Indonesia.",
  },
  {
    id: "aodai",
    tag: "sea",
    prompt: "The áo dài is a traditional long tunic from…",
    choices: ["Thailand", "Vietnam", "Myanmar", "Malaysia"],
    answer: 1,
    wow: "Vietnam. Flowing, fitted, unforgettable.",
    oof: "Vietnam. Not a kebaya, not a cheongsam.",
  },
  {
    id: "komodo",
    tag: "sea",
    prompt: "Komodo dragons are native to islands in…",
    choices: ["the Philippines", "Indonesia", "Malaysia", "Cambodia"],
    answer: 1,
    wow: "East Nusa Tenggara. Do not try to chope their rock.",
    oof: "Indonesia. Giant lizards, UNESCO park, keep your snacks close.",
  },
  {
    id: "kip",
    tag: "sea",
    prompt: "The kip is the currency of…",
    choices: ["Laos", "Cambodia", "Myanmar", "Brunei"],
    answer: 0,
    wow: "Lao kip. Street food is still a bargain.",
    oof: "Laos. Cambodia uses the riel (and a lot of dollars).",
  },
  {
    id: "bsb",
    tag: "sea",
    prompt: "Brunei’s capital is…",
    choices: ["Kuching", "Kota Kinabalu", "Bandar Seri Begawan", "Pontianak"],
    answer: 2,
    wow: "BSB. Water village included.",
    oof: "Bandar Seri Begawan. The others are neighbours on Borneo.",
  },
];

export const STAGE_LABEL = ["Baby cloud", "Cheeky puff", "Neighbourhood puff", "Legendary puff"] as const;

export function puffScale(stage: number): number {
  return [0.72, 0.88, 1.04, 1.18][Math.min(3, Math.max(0, stage))] ?? 1;
}

export const QUIZ_STORAGE_KEY = "puff-quiz-v3";

export type QuizSave = {
  rounds: number;
  bestCorrect: number;
  bestTotal: number;
  name: string;
};

export function emptyQuizSave(): QuizSave {
  return { rounds: 0, bestCorrect: 0, bestTotal: 0, name: "" };
}

export function readQuizSave(): QuizSave {
  if (typeof window === "undefined") return emptyQuizSave();
  try {
    const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY) ?? window.localStorage.getItem("puff-quiz-v2");
    if (!raw) return emptyQuizSave();
    const parsed = JSON.parse(raw) as Partial<QuizSave>;
    if (typeof parsed.rounds !== "number") return emptyQuizSave();
    return {
      rounds: parsed.rounds,
      bestCorrect: typeof parsed.bestCorrect === "number" ? parsed.bestCorrect : 0,
      bestTotal: typeof parsed.bestTotal === "number" ? parsed.bestTotal : 0,
      name: typeof parsed.name === "string" ? parsed.name : "",
    };
  } catch {
    return emptyQuizSave();
  }
}

export function writeQuizSave(save: QuizSave) {
  window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(save));
}

export function cleanName(raw: string): string {
  const name = raw.replace(/\s+/g, " ").trim().slice(0, 20);
  if (name.includes("@") || /https?:/i.test(name)) {
    throw new Error("Just a nickname — no emails or links.");
  }
  if (name.length < 2 || !/[a-zA-Z0-9]/.test(name)) {
    throw new Error("Need a nickname of at least 2 characters.");
  }
  return name;
}

export function nameKey(name: string): string {
  return name.trim().toLowerCase();
}

export function stageFromRounds(rounds: number): number {
  return Math.min(3, Math.max(0, rounds));
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = next[i]!;
    next[i] = next[j]!;
    next[j] = a;
  }
  return next;
}

function mixChoices(q: QuizQuestion): QuizQuestion {
  const order = shuffle([0, 1, 2, 3]);
  const choices = order.map((i) => q.choices[i as 0 | 1 | 2 | 3]) as QuizQuestion["choices"];
  const answer = order.indexOf(q.answer) as 0 | 1 | 2 | 3;
  return { ...q, choices, answer };
}

export function dealRound(excludeIds: readonly string[] = []): QuizQuestion[] {
  const size = 5 + Math.floor(Math.random() * 4);
  const excluded = new Set(excludeIds);
  const available = QUESTION_BANK.filter((q) => !excluded.has(q.id));
  const pool = available.length >= size ? available : QUESTION_BANK;

  const sg = shuffle(pool.filter((q) => q.tag === "sg"));
  const sea = shuffle(pool.filter((q) => q.tag === "sea"));
  const sgCount = Math.min(sg.length, Math.ceil(size / 2));
  const seaCount = Math.min(sea.length, size - sgCount);
  const picked: QuizQuestion[] = [...sg.slice(0, sgCount), ...sea.slice(0, seaCount)];

  if (picked.length < size) {
    const used = new Set(picked.map((q) => q.id));
    const rest = shuffle(pool.filter((q) => !used.has(q.id)));
    picked.push(...rest.slice(0, size - picked.length));
  }

  return shuffle(picked).slice(0, size).map(mixChoices);
}

export function percent(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}
