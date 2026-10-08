// The list. Edit freely.
// tier:  "small" | "big"
// url:   optional link to where to buy it
// when:  any of "christmas", "birthday", "random"
const GIFTS = [
  { title: "A plant", note: "Anything from the hoya, monstera or pothos family. Or a snake plant or ZZ plant. Anything happy in low light.", tier: "small", when: ["birthday", "random"] },
  { title: "Winsor & Newton oil paint", note: "Ultramarine Blue, Cadmium Red Medium, Cadmium Yellow Medium, Titanium White, Burnt Umber or Yellow Ochre. Titanium white runs out first. It always runs out first.", tier: "small", when: ["christmas", "birthday", "random"] },
  { title: "Cole & Mason salt pig", note: "The ceramic one with a lid.", url: "https://www.amazon.co.uk/dp/B09RN9XT4L", tier: "small", when: ["christmas", "birthday", "random"] },
  { title: "A book you loved", note: "Fiction, mostly. No self-help or personal development, please.", tier: "small", when: ["christmas", "birthday"] },
  { title: "Stretched canvases", note: "Any size, though bigger is better.", tier: "small", when: ["christmas", "birthday"] },
  { title: "Nice brushes", note: "Good quality ones that don't shed.", tier: "small", when: ["christmas", "birthday", "random"] },
  { title: "Dinner somewhere nice", note: "Somewhere you like.", tier: "big", when: ["birthday"] },
  { title: "Plane tickets", note: "Anywhere. I'm not fussy. (I'm a little fussy.)", tier: "big", when: ["christmas", "birthday"] },
  { title: "An actual art class", note: "I've never had one.", tier: "big", when: ["christmas", "birthday"] },
  { title: "Cello lessons", note: "Plus a rented cello, since I don't have one.", tier: "big", when: ["christmas", "birthday"] },
  { title: "A cabin getaway in nature", note: "Somewhere quiet, with trees and a fireplace.", tier: "big", when: ["christmas", "birthday", "random"] },
  { title: "Buy one of my paintings", note: "Technically a gift to both of us. Mostly to me.", tier: "big", when: ["christmas", "birthday", "random"] },
];

const TIERS = {
  small: { name: "Small", hint: "roughly a nice lunch" },
  big: { name: "Big", hint: "for special occasions" },
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
      const title = g.url ? `<a href="${g.url}" rel="noopener" target="_blank">${g.title} ↗</a>` : g.title;
      li.innerHTML = `<h3>${title}</h3><p>${g.note}</p>`;
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
