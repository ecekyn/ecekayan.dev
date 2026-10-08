// The list. Edit freely.
// tier:  "free" | "small" | "big"
// when:  any of "christmas", "birthday", "random"
const GIFTS = [
  { emoji: "🎨", title: "Oil paint, any colour", note: "Titanium white runs out first. It always runs out first.", tier: "small", when: ["christmas", "birthday", "random"] },
  { emoji: "🖼️", title: "Stretched canvases", note: "Bigger than you think is reasonable.", tier: "small", when: ["christmas", "birthday"] },
  { emoji: "🖌️", title: "Nice brushes", note: "The ones that don't shed hairs into the sky I just painted.", tier: "small", when: ["christmas", "birthday", "random"] },
  { emoji: "☕", title: "A coffee, delivered", note: "Unprompted. Mid-afternoon. Life-changing.", tier: "free", when: ["random"] },
  { emoji: "🥐", title: "A croissant", note: "Same rules as the coffee. Ideally with the coffee.", tier: "free", when: ["random"] },
  { emoji: "🍫", title: "Good chocolate", note: "Dark. Not the kind from the petrol station.", tier: "small", when: ["christmas", "birthday", "random"] },
  { emoji: "📚", title: "A book you loved", note: "Write something on the first page so I know it's from you.", tier: "small", when: ["christmas", "birthday"] },
  { emoji: "🪴", title: "A plant", note: "Low maintenance. I can keep a cron job alive, plants are another story.", tier: "small", when: ["birthday", "random"] },
  { emoji: "🍝", title: "Dinner somewhere nice", note: "You pick, I'll pretend to look at the menu, then order the pasta.", tier: "big", when: ["birthday"] },
  { emoji: "✈️", title: "Plane tickets", note: "Anywhere. I'm not fussy. (I'm a little fussy.)", tier: "big", when: ["christmas", "birthday"] },
  { emoji: "🧑‍🎨", title: "An actual art class", note: "So I can finally say I've had one.", tier: "big", when: ["christmas", "birthday"] },
  { emoji: "🖼️", title: "Buy one of my paintings", note: "Technically a gift to both of us. Mostly to me.", tier: "big", when: ["christmas", "birthday", "random"] },
  { emoji: "💬", title: "A nice message", note: "\"Saw this and thought of you.\" Ten seconds. Elite gift.", tier: "free", when: ["christmas", "birthday", "random"] },
  { emoji: "🐛", title: "Fix a bug for me", note: "Any bug. I have several. Some are in my code.", tier: "free", when: ["random"] },
  { emoji: "🧦", title: "Fun socks", note: "Look, they're always a good gift. Don't fight it.", tier: "small", when: ["christmas"] },
  { emoji: "🎂", title: "A cake with my name on it", note: "Spelled correctly. E-C-E. There is no second E in the middle.", tier: "small", when: ["birthday"] },
];

const TIERS = {
  free: { name: "Free", hint: "costs you nothing but effort" },
  small: { name: "Small", hint: "roughly a nice lunch" },
  big: { name: "Big", hint: "you really, really like me" },
};

const shelf = document.getElementById("shelf");
const chips = document.querySelectorAll(".chip");
const pickBtn = document.getElementById("pick");
let occasion = "all";

function visible() {
  return GIFTS.filter((g) => occasion === "all" || g.when.includes(occasion));
}

function render() {
  shelf.innerHTML = "";
  const list = visible();

  if (!list.length) {
    shelf.innerHTML = '<p class="empty">Nothing here. Which means anything goes.</p>';
    return;
  }

  for (const [key, tier] of Object.entries(TIERS)) {
    const items = list.filter((g) => g.tier === key);
    if (!items.length) continue;

    const section = document.createElement("section");
    section.className = "tier";
    section.innerHTML = `
      <div class="tier-head"><h2>${tier.name}</h2><span>${tier.hint}</span></div>
      <div class="grid"></div>`;
    const grid = section.querySelector(".grid");

    for (const g of items) {
      const card = document.createElement("article");
      card.className = "gift";
      card.innerHTML = `
        <div class="emoji" aria-hidden="true">${g.emoji}</div>
        <h3>${g.title}</h3>
        <p>${g.note}</p>
        <div class="meta">${g.when.map((w) => `<span>${w}</span>`).join("")}</div>`;
      grid.appendChild(card);
    }
    shelf.appendChild(section);
  }
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    occasion = chip.dataset.when;
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    render();
  });
});

pickBtn.addEventListener("click", () => {
  const cards = [...shelf.querySelectorAll(".gift")];
  if (!cards.length) return;
  cards.forEach((c) => c.classList.remove("chosen"));

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const steps = reduced ? 0 : 10;
  let i = 0;
  pickBtn.disabled = true;

  const tick = () => {
    cards.forEach((c) => c.classList.add("shuffling"));
    const card = cards[Math.floor(Math.random() * cards.length)];
    card.classList.remove("shuffling");

    if (i++ < steps) {
      setTimeout(tick, 60 + i * 12);
      return;
    }
    cards.forEach((c) => c.classList.remove("shuffling"));
    card.classList.add("chosen");
    card.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    pickBtn.disabled = false;
  };
  tick();
});

render();
