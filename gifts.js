// The list. Edit freely.
// tier:  "small" | "big"
// when:  any of "christmas", "birthday", "random"
const GIFTS = [
  { title: "Oil paint, any colour", note: "Titanium white runs out first. It always runs out first.", tier: "small", when: ["christmas", "birthday", "random"] },
  { title: "Stretched canvases", note: "Bigger than you think is reasonable.", tier: "small", when: ["christmas", "birthday"] },
  { title: "Nice brushes", note: "The ones that don't shed hairs into the sky I just painted.", tier: "small", when: ["christmas", "birthday", "random"] },
  { title: "Good chocolate", note: "Dark. Not the kind from the petrol station.", tier: "small", when: ["christmas", "birthday", "random"] },
  { title: "A book you loved", note: "Write something on the first page so I know it's from you.", tier: "small", when: ["christmas", "birthday"] },
  { title: "A plant", note: "Low maintenance. I can keep a cron job alive, plants are another story.", tier: "small", when: ["birthday", "random"] },
  { title: "Fun socks", note: "Look, they're always a good gift. Don't fight it.", tier: "small", when: ["christmas"] },
  { title: "A cake with my name on it", note: "Spelled correctly. E-C-E. There is no second E in the middle.", tier: "small", when: ["birthday"] },
  { title: "Dinner somewhere nice", note: "You pick, I'll pretend to look at the menu, then order the pasta.", tier: "big", when: ["birthday"] },
  { title: "Plane tickets", note: "Anywhere. I'm not fussy. (I'm a little fussy.)", tier: "big", when: ["christmas", "birthday"] },
  { title: "An actual art class", note: "So I can finally say I've had one.", tier: "big", when: ["christmas", "birthday"] },
  { title: "Buy one of my paintings", note: "Technically a gift to both of us. Mostly to me.", tier: "big", when: ["christmas", "birthday", "random"] },
];

const TIERS = {
  small: { name: "Small", hint: "roughly a nice lunch" },
  big: { name: "Big", hint: "you really, really like me" },
};

const shelf = document.getElementById("shelf");
const chips = document.querySelectorAll(".chip");
const pickBtn = document.getElementById("pick");
let occasion = "all";

function render() {
  shelf.innerHTML = "";
  const list = GIFTS.filter((g) => occasion === "all" || g.when.includes(occasion));

  for (const [key, tier] of Object.entries(TIERS)) {
    const items = list.filter((g) => g.tier === key);
    if (!items.length) continue;

    const section = document.createElement("section");
    section.className = "tier";
    section.innerHTML = `<h2>${tier.name} <span>· ${tier.hint}</span></h2><ul class="gifts"></ul>`;
    const ul = section.querySelector("ul");

    for (const g of items) {
      const li = document.createElement("li");
      li.className = "gift";
      li.innerHTML = `<h3>${g.title}</h3><p>${g.note}</p>`;
      ul.appendChild(li);
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
  const items = [...shelf.querySelectorAll(".gift")];
  if (!items.length) return;
  items.forEach((i) => i.classList.remove("chosen"));
  const pick = items[Math.floor(Math.random() * items.length)];
  pick.classList.add("chosen");
  pick.scrollIntoView({ behavior: "smooth", block: "center" });
});

render();
