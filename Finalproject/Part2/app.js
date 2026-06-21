// ─────────────────────────────────────────
//  StyleFit — app.js
//  Firebase Realtime Database + UI Logic
// ─────────────────────────────────────────

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ── Firebase Config ──────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyC6kaIv-xwt_KUGRazWEHt6iPkTVdEwmfk",
  authDomain: "app-development-a4704.firebaseapp.com",
  projectId: "app-development-a4704",
  storageBucket: "app-development-a4704.firebasestorage.app",
  messagingSenderId: "743378393790",
  appId: "1:743378393790:web:648e3d9982abfa0c9a1cef",
  databaseURL: "https://app-development-a4704-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log("✅ Firebase Connected");

// ── App State ────────────────────────────
const state = {
  gender: null,
  bodyShape: null,
  dressup: [], // multi-select
  vibes: [], // multi-select
};

// ── Outfit Recommendations DB ─────────────
const outfitDB = {
  // [gender][bodyShape][dressupCategory] → { tip, items[] }
  Female: {
    Hourglass: {
      "Casual/Daywear": {
        tip: "Highlight your waist — wrap dresses and fitted tees are your best friends.",
        items: [
          "Wrap Dress",
          "High-waist Skinny Jeans + Tucked-in Blouse",
          "Crop Top + A-line Skirt",
          "Bodycon Co-ord Set",
        ],
      },
      "Work/Office": {
        tip: "Tailored pieces that follow your silhouette look effortlessly polished.",
        items: [
          "Fitted Blazer + Pencil Skirt",
          "Wrap Blouse + Wide-leg Trousers",
          "Shirt Dress with Belt",
          "Tailored Jumpsuit",
        ],
      },
      "Formal/Event": {
        tip: "Go floor-length — your proportions carry it beautifully.",
        items: [
          "Fitted Evening Gown",
          "Mermaid Silhouette Dress",
          "Two-Piece Crop Top Skirt Set",
          "Deep-V Wrap Maxi",
        ],
      },
      "Gym/Sport": {
        items: [
          "High-Waist Leggings + Sports Bra",
          "Fitted Tank + Bike Shorts",
          "Crop Hoodie + Yoga Pants",
        ],
      },
      Travel: {
        items: [
          "Maxi Wrap Dress",
          "High-waist Joggers + Fitted Tee",
          "Linen Shirt Dress",
        ],
      },
      Party: {
        items: [
          "Sequin Bodycon Dress",
          "Halter Top + Flared Pants",
          "Mini Wrap Dress",
        ],
      },
      Holiday: {
        items: [
          "Floral Wrap Midi",
          "Belted Linen Dress",
          "Tropical Co-ord Set",
        ],
      },
      "Date Night": {
        tip: "A subtle wrap silhouette or fitted midi never fails.",
        items: [
          "Satin Slip Dress",
          "Fitted Midi + Block Heels",
          "Off-Shoulder Bodycon",
        ],
      },
    },
    Pear: {
      "Casual/Daywear": {
        tip: "Draw attention upward — statement tops balance your silhouette beautifully.",
        items: [
          "A-line Skirt + Embellished Top",
          "Wide-leg Pants + Fitted Blouse",
          "Boat-neck Tee + Dark Flare Jeans",
          "Off-shoulder Top + Straight-leg Pants",
        ],
      },
      "Work/Office": {
        items: [
          "Structured Blazer + Dark Trousers",
          "Peplum Blouse + Pencil Skirt",
          "V-neck Wrap Top + Wide-leg Pants",
        ],
      },
      "Formal/Event": {
        items: [
          "A-line Evening Gown",
          "Empire Waist Dress",
          "Ruffled Shoulder Gown",
        ],
      },
      "Gym/Sport": {
        items: [
          "High-Waist Capri + Bright Sports Bra",
          "Loose Tank + Leggings",
          "Crop Jacket + Wide-waist Shorts",
        ],
      },
      Travel: {
        items: [
          "Wide-leg Linen Pants + Graphic Tee",
          "Maxi Skirt + Tank Top",
          "Floral Blouse + Dark Jeans",
        ],
      },
      Party: {
        items: [
          "Cold-shoulder Top + Flared Mini",
          "Embellished Blouse + Wide-leg Trousers",
          "Wrap Midi Dress",
        ],
      },
      Holiday: {
        items: [
          "Flowy Maxi + Bikini Top",
          "Wide-leg Linen Pants + Crop Top",
          "Cover-up Kaftan",
        ],
      },
      "Date Night": {
        items: [
          "Fit-and-Flare Midi Dress",
          "Ruffle-shoulder Top + Dark Jeans",
          "Off-shoulder Dress",
        ],
      },
    },
    Rectangle: {
      "Casual/Daywear": {
        tip: "Create curves with ruched, belted, or layered silhouettes.",
        items: [
          "Ruched Midi Dress",
          "High-waist Wide-leg Jeans + Crop Top + Belt",
          "Peplum Top + Skinny Jeans",
          "Ruffled Blouse + Straight Pants",
        ],
      },
      "Work/Office": {
        items: [
          "Belted Blazer Dress",
          "Peplum Blouse + Pencil Skirt",
          "Tailored Wide-leg Suit",
        ],
      },
      "Formal/Event": {
        items: [
          "Ball Gown with Full Skirt",
          "Tiered Ruffle Dress",
          "Bustier Gown",
        ],
      },
      "Gym/Sport": {
        items: [
          "Colourblock Leggings + Crop Tee",
          "Ruched Sports Bra + Shorts",
          "Fitted Tracksuit",
        ],
      },
      Travel: {
        items: [
          "Belted Shirt Dress",
          "Tiered Midi Skirt + Fitted Top",
          "Linen Wide-leg Co-ord",
        ],
      },
      Party: {
        items: [
          "Ruffled Mini Dress",
          "Sequin Shift Dress",
          "Wrap Mini + Statement Belt",
        ],
      },
      Holiday: {
        items: [
          "Ruffled Bikini + Sarong",
          "Belted Linen Dress",
          "Striped Co-ord Set",
        ],
      },
      "Date Night": {
        items: [
          "Wrap Dress with Cinched Waist",
          "Ruched Satin Midi",
          "Asymmetric Mini Dress",
        ],
      },
    },
    Apple: {
      "Casual/Daywear": {
        tip: "V-necks and empire waists elongate and flatter your frame.",
        items: [
          "V-neck Tunic + Straight-leg Jeans",
          "Empire Waist Dress",
          "Flowy Blouse + Wide-leg Pants",
          "Wrap Top + Bootcut Jeans",
        ],
      },
      "Work/Office": {
        items: [
          "Open-front Blazer + Straight Pants",
          "Wrap Dress",
          "V-neck Blouse + Wide-leg Trousers",
        ],
      },
      "Formal/Event": {
        items: [
          "A-line Gown",
          "Empire Waist Evening Dress",
          "Flowy Chiffon Maxi",
        ],
      },
      "Gym/Sport": {
        items: [
          "High-waist Leggings + Long Fitted Tank",
          "Loose Crop Hoodie + Shorts",
          "Full-length Yoga Set",
        ],
      },
      Travel: {
        items: [
          "Drawstring Linen Pants + Tunic",
          "Flowy Midi Dress",
          "Open-front Cardigan + Fitted Tee",
        ],
      },
      Party: {
        items: [
          "Flowy Cocktail Dress",
          "Empire-waist Mini + Blazer",
          "Wrap Midi Dress",
        ],
      },
      Holiday: {
        items: [
          "Kaftan Cover-up",
          "Empire Waist Maxi",
          "Flowy Palazzo Pants + Fitted Crop",
        ],
      },
      "Date Night": {
        items: ["Wrap Dress", "Flowy Satin Midi", "V-neck Bodycon Maxi"],
      },
    },
    Inverted: {
      "Casual/Daywear": {
        tip: "Add volume below the waist to balance broader shoulders.",
        items: [
          "A-line Skirt + Simple Tee",
          "Wide-leg Trousers + Fitted Cami",
          "Flared Jeans + Boat-neck Top",
          "Midi Skirt + Tucked Blouse",
        ],
      },
      "Work/Office": {
        items: [
          "Flared Trousers + Structured Blazer",
          "Pencil Skirt + V-neck Blouse",
          "Wide-leg Suit Pants + Simple Top",
        ],
      },
      "Formal/Event": {
        items: ["A-line Gown", "Ball Gown", "Tiered Maxi Dress"],
      },
      "Gym/Sport": {
        items: [
          "Flared Yoga Pants + Tank Top",
          "High-waist Wide-leg Shorts + Sports Bra",
          "Bootleg Leggings + Fitted Tee",
        ],
      },
      Travel: {
        items: [
          "Wide-leg Linen Pants + Sleeveless Top",
          "Tiered Midi Skirt + Simple Tee",
          "Flared Jeans + Lightweight Jacket",
        ],
      },
      Party: {
        items: [
          "Flared Mini Skirt + Cami",
          "Tiered Ruffle Dress",
          "Flowy Wide-leg Co-ord",
        ],
      },
      Holiday: {
        items: [
          "Sarong Wrap Skirt + Bikini",
          "Flowy Maxi Dress",
          "Wide-leg Palazzo + Bandeau Top",
        ],
      },
      "Date Night": {
        items: [
          "A-line Midi Dress",
          "Flared Trousers + Satin Blouse",
          "Wrap Skirt + Sleeveless Turtleneck",
        ],
      },
    },
  },

  Male: {
    Hourglass: {
      "Casual/Daywear": {
        tip: "Fitted basics show your balanced proportions best.",
        items: [
          "Fitted Crew-neck Tee + Slim Jeans",
          "Henley + Chinos",
          "Bomber Jacket + Fitted Tee",
        ],
      },
      "Work/Office": {
        items: [
          "Tailored Slim-fit Suit",
          "Oxford Shirt + Slim Trousers",
          "Fitted Blazer + Dark Jeans",
        ],
      },
      "Formal/Event": {
        items: [
          "Fitted Tuxedo",
          "Double-breasted Suit",
          "Slim-cut Dress Shirt + Slim Tie",
        ],
      },
      "Gym/Sport": {
        items: [
          "Fitted Compression Tee + Shorts",
          "Slim Track Pants + Tank",
          "Athletic Slim Joggers + Sports Tee",
        ],
      },
      Travel: {
        items: [
          "Slim Chinos + Linen Shirt",
          "Fitted Joggers + Hoodie",
          "Lightweight Jacket + Slim Jeans",
        ],
      },
      Party: {
        items: [
          "Fitted Roll-neck + Slim Trousers",
          "Tailored Blazer + Dark Jeans",
          "Satin Shirt + Slim-cut Pants",
        ],
      },
      Holiday: {
        items: [
          "Linen Shirt + Shorts",
          "Fitted Swim Shorts",
          "Lightweight Co-ord Set",
        ],
      },
      "Date Night": {
        tip: "Tailored always wins.",
        items: [
          "Fitted Turtleneck + Slim Trousers",
          "Smart Blazer + Slim Jeans",
          "Fitted Linen Shirt + Chinos",
        ],
      },
    },
    Pear: {
      "Casual/Daywear": {
        tip: "Structured tops and jackets balance broader lower body.",
        items: [
          "Structured Jacket + Slim Pants",
          "Layered Hoodie + Dark Chinos",
          "Oversized Tee + Tapered Jeans",
        ],
      },
      "Work/Office": {
        items: [
          "Structured Blazer + Slim Trousers",
          "Oxford Shirt + Tapered Pants",
          "Layered Vest + Dress Trousers",
        ],
      },
      "Formal/Event": {
        items: [
          "Broad-shoulder Suit Jacket + Tapered Trousers",
          "Double-breasted Blazer + Slim Pants",
        ],
      },
      "Gym/Sport": {
        items: [
          "Structured Tank + Tapered Joggers",
          "Fitted Top + Slim Shorts",
        ],
      },
      Travel: {
        items: [
          "Structured Overshirt + Tapered Joggers",
          "Lightweight Jacket + Slim Chinos",
        ],
      },
      Party: {
        items: [
          "Structured Blazer + Dark Slim Pants",
          "Layered Chain + Structured Tee + Tapered Joggers",
        ],
      },
      Holiday: {
        items: ["Patterned Shirt + Slim Shorts", "Linen Blazer + Linen Shorts"],
      },
      "Date Night": {
        items: [
          "Structured Jacket + Slim Trousers",
          "Fitted Roll-neck + Tapered Pants",
        ],
      },
    },
    Rectangle: {
      "Casual/Daywear": {
        tip: "Layering adds dimension and creates visual depth.",
        items: [
          "Layered Shirt + Chinos",
          "Patterned Tee + Straight Jeans",
          "Open Overshirt + Fitted Tee + Slim Pants",
        ],
      },
      "Work/Office": {
        items: [
          "Textured Blazer + Slim Trousers",
          "Striped Oxford + Chinos",
          "Layered Vest + Dress Shirt + Slim Pants",
        ],
      },
      "Formal/Event": {
        items: [
          "Patterned Suit",
          "Double-breasted Blazer + Slim Trousers",
          "Classic Tuxedo with Cummerbund",
        ],
      },
      "Gym/Sport": {
        items: [
          "Oversized Tee + Loose Shorts",
          "Jogger Set",
          "Layered Zip Hoodie + Track Pants",
        ],
      },
      Travel: {
        items: [
          "Utility Jacket + Slim Jeans",
          "Linen Co-ord Set",
          "Patterned Shirt + Chinos",
        ],
      },
      Party: {
        items: [
          "Patterned Shirt + Slim Trousers",
          "Statement Jacket + Plain Tee + Slim Pants",
        ],
      },
      Holiday: {
        items: [
          "Printed Shorts + Open Linen Shirt",
          "Co-ord Vacation Set",
          "Swim Shorts + Rash Guard",
        ],
      },
      "Date Night": {
        items: [
          "Patterned Blazer + Dark Jeans",
          "Turtleneck + Slim Trousers",
          "Smart Casual Layered Look",
        ],
      },
    },
    Apple: {
      "Casual/Daywear": {
        tip: "Vertical lines and V-necks elongate your torso.",
        items: [
          "V-neck Tee + Slim Chinos",
          "Open Linen Shirt + Slim Jeans",
          "Straight-cut Dark Jeans + Fitted Tee",
        ],
      },
      "Work/Office": {
        items: [
          "V-neck Sweater + Slim Trousers",
          "Open Blazer + Oxford Shirt + Slim Pants",
          "Dark Dress Pants + Light Shirt",
        ],
      },
      "Formal/Event": {
        items: [
          "Dark Solid Suit",
          "Longline Blazer + Slim Trousers",
          "Monochrome Suit",
        ],
      },
      "Gym/Sport": {
        items: [
          "Long Fitted Tank + Slim Shorts",
          "Jogger Set in Dark Tones",
          "Zip-up Jacket + Track Pants",
        ],
      },
      Travel: {
        items: [
          "Straight-cut Chinos + Linen Shirt",
          "Bomber Jacket + Dark Jeans",
          "Loose Linen Co-ord Set",
        ],
      },
      Party: {
        items: [
          "Dark Slim Trousers + Stylish Shirt",
          "Longline Blazer + Dark Jeans",
          "Monochrome Casual Set",
        ],
      },
      Holiday: {
        items: [
          "Dark Swim Shorts + Linen Shirt",
          "Co-ord Linen Set",
          "Vertical Stripe Polo + Chinos",
        ],
      },
      "Date Night": {
        items: [
          "Monochrome Smart Casual",
          "V-neck Sweater + Dark Slim Jeans",
          "Dark Slim Suit",
        ],
      },
    },
    Inverted: {
      "Casual/Daywear": {
        tip: "Straight-cut trousers and relaxed bottoms balance broader shoulders.",
        items: [
          "Wide-leg Pants + Simple Tee",
          "Relaxed Chinos + Light Shirt",
          "Slim Bootcut Jeans + Fitted Top",
        ],
      },
      "Work/Office": {
        items: [
          "Wide-leg Trousers + Fitted Blazer",
          "Slim Dress Pants + V-neck Shirt",
          "Straight-cut Suit",
        ],
      },
      "Formal/Event": {
        items: [
          "Straight-cut Tuxedo",
          "Simple One-button Suit",
          "Wide-leg Dress Pants + Fitted Shirt",
        ],
      },
      "Gym/Sport": {
        items: [
          "Relaxed Shorts + Fitted Tee",
          "Wide-leg Track Pants + Tank",
          "Bootleg Sweatpants + Sports Top",
        ],
      },
      Travel: {
        items: [
          "Wide-leg Linen Pants + Simple Top",
          "Relaxed Cargo Pants + Tee",
          "Straight Jeans + Lightweight Jacket",
        ],
      },
      Party: {
        items: [
          "Wide-leg Slim Suit",
          "Loose-fit Trousers + Statement Top",
          "Relaxed Blazer Set",
        ],
      },
      Holiday: {
        items: [
          "Boardshorts + Simple Tee",
          "Wide-leg Linen Shorts + Open Shirt",
          "Swim Trunks + Linen Cover-up",
        ],
      },
      "Date Night": {
        items: [
          "Straight-cut Slim Trousers + Fitted Turtleneck",
          "Wide-leg Dress Pants + Satin Shirt",
        ],
      },
    },
  },

  Others: {
    // Uses Female OR Male based on body shape only — we just use a blended set
    Hourglass: {
      "Casual/Daywear": {
        tip: "Wrap silhouettes and belted styles celebrate your shape.",
        items: [
          "Wrap Dress or Wrap Shirt",
          "High-waist Pants + Tucked-in Top",
          "Fitted Jumpsuit",
        ],
      },
      "Work/Office": {
        items: [
          "Tailored Wrap Blouse + Wide-leg Pants",
          "Belted Blazer + Slim Trousers",
        ],
      },
      "Formal/Event": {
        items: [
          "Fitted Evening Suit",
          "Sleek Jumpsuit",
          "Mermaid Silhouette Gown",
        ],
      },
      "Gym/Sport": { items: ["High-waist Leggings + Fitted Tank"] },
      Travel: { items: ["Wrap Midi Dress", "Fitted Co-ord Set"] },
      Party: { items: ["Sequin Wrap Dress", "Tailored Jumpsuit + Heels"] },
      Holiday: { items: ["Wrap Dress + Sandals", "Linen Co-ord + Hat"] },
      "Date Night": {
        items: ["Fitted Slip Dress", "Tailored Blazer + High-waist Trousers"],
      },
    },
    Pear: {
      "Casual/Daywear": {
        tip: "Statement tops and structured shoulders create balance.",
        items: [
          "Structured Jacket + Slim Trousers",
          "Bold-print Top + Simple Bottoms",
          "A-line Skirt + Fitted Blouse",
        ],
      },
      "Work/Office": {
        items: ["Peplum Blazer + Slim Pants", "Wide-leg Suit + Structured Top"],
      },
      "Formal/Event": {
        items: ["A-line Gown or Suit", "Ruffled Shoulder Dress"],
      },
      "Gym/Sport": { items: ["Bright Sports Bra/Tank + Leggings"] },
      Travel: { items: ["Wide-leg Pants + Patterned Top"] },
      Party: { items: ["Embellished Top + Dark Flared Pants"] },
      Holiday: { items: ["Flowy Maxi + Bikini Top"] },
      "Date Night": {
        items: ["Fit-and-Flare Dress", "Statement Blouse + Flared Trousers"],
      },
    },
    Rectangle: {
      "Casual/Daywear": {
        tip: "Add dimension with layers, ruffles, and belts.",
        items: [
          "Ruched Top + Straight Pants",
          "Belted Dress",
          "Layered Look + Slim Bottoms",
        ],
      },
      "Work/Office": {
        items: [
          "Belted Blazer + Straight Trousers",
          "Textured Blouse + Slim Suit Pants",
        ],
      },
      "Formal/Event": {
        items: ["Tiered Dress or Gown", "Peplum Top + Wide-leg Trousers"],
      },
      "Gym/Sport": { items: ["Colourblock Set", "Cropped Jacket + Leggings"] },
      Travel: { items: ["Linen Belted Set", "Layered Casual Look"] },
      Party: { items: ["Ruffled Mini Dress", "Sequin Shift"] },
      Holiday: { items: ["Ruffled Bikini + Sarong", "Flowy Co-ord"] },
      "Date Night": { items: ["Wrap Dress or Jumpsuit", "Asymmetric Dress"] },
    },
    Apple: {
      "Casual/Daywear": {
        tip: "V-necks and flowy silhouettes elongate your frame.",
        items: [
          "V-neck Tunic + Wide-leg Pants",
          "Empire Dress",
          "Open-front Cardigan + Slim Jeans",
        ],
      },
      "Work/Office": {
        items: [
          "V-neck Wrap Blouse + Wide-leg Trousers",
          "Open Blazer + Tailored Pants",
        ],
      },
      "Formal/Event": { items: ["Empire Gown", "Flowy Chiffon Dress"] },
      "Gym/Sport": { items: ["Long Tank + High-waist Leggings"] },
      Travel: { items: ["Drawstring Linen Set", "Flowy Dress"] },
      Party: { items: ["Flowy Cocktail Dress", "Empire Jumpsuit"] },
      Holiday: { items: ["Kaftan + Swim Set"] },
      "Date Night": { items: ["Wrap Dress", "V-neck Maxi"] },
    },
    Inverted: {
      "Casual/Daywear": {
        tip: "Volume at the hem balances broader shoulders.",
        items: [
          "Wide-leg Pants + Simple Top",
          "A-line Skirt + Simple Blouse",
          "Flared Jeans + Fitted Top",
        ],
      },
      "Work/Office": {
        items: ["Wide-leg Suit + Simple Shirt", "A-line Skirt + Fitted Blazer"],
      },
      "Formal/Event": {
        items: ["A-line Gown", "Flared Tuxedo Trousers + Jacket"],
      },
      "Gym/Sport": { items: ["Flared Yoga Pants + Tank"] },
      Travel: { items: ["Wide-leg Linen Pants + Sleeveless Top"] },
      Party: {
        items: ["Tiered Skirt + Cami", "Flared Trousers + Statement Top"],
      },
      Holiday: { items: ["Flowy Maxi + Bikini Top"] },
      "Date Night": {
        items: ["A-line Midi Dress", "Wide-leg Trousers + Satin Top"],
      },
    },
  },
};

// Styling Tips per vibe
const vibeTips = {
  Classic:
    "Stick to timeless pieces — neutrals, clean cuts, and minimal accessories.",
  Bold: "Don't be afraid of colour-blocking and statement prints.",
  Minimal: "Less is more — invest in quality basics and let silhouette speak.",
  Romantic: "Soft fabrics, florals, and delicate details elevate any look.",
  Streetwear:
    "Mix high and low — a luxury piece with a casual base always lands.",
  Boho: "Layer textures, mix patterns, and add earthy accessories.",
};

// ── Navigation ────────────────────────────
export function goTo(screenId) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
  window.scrollTo(0, 0);
}

export function goBack(screenId) {
  goTo(screenId);
}

export function restart() {
  state.gender = null;
  state.bodyShape = null;
  state.dressup = [];
  state.vibes = [];
  document
    .querySelectorAll(".option-card, .pill")
    .forEach((el) => el.classList.remove("selected"));
  document.getElementById("btn-gender").disabled = true;
  document.getElementById("btn-body").disabled = true;
  document.getElementById("btn-dressup").disabled = true;
  document.getElementById("btn-vibe").disabled = true;
  document.getElementById("guide-panel").hidden = true;
  goTo("screen-splash");
}

// ── Gender Selection ─────────────────────
export function selectGender(btn) {
  document
    .querySelectorAll("#screen-gender .option-card")
    .forEach((c) => c.classList.remove("selected"));
  btn.classList.add("selected");
  state.gender = btn.dataset.value;
  document.getElementById("btn-gender").disabled = false;
}

// ── Single-select Pill ────────────────────
export function selectPill(btn, group) {
  const listId = group === "body" ? "body-list" : "";
  if (listId) {
    document
      .querySelectorAll(`#${listId} .pill`)
      .forEach((p) => p.classList.remove("selected"));
  }
  btn.classList.add("selected");

  if (group === "body") {
    state.bodyShape = btn.dataset.value;
    document.getElementById("btn-body").disabled = false;
  }
}

// ── Multi-select Pill ─────────────────────
export function togglePill(btn, group) {
  btn.classList.toggle("selected");

  if (group === "dressup") {
    const val = btn.dataset.value;
    if (btn.classList.contains("selected")) {
      state.dressup.push(val);
    } else {
      state.dressup = state.dressup.filter((v) => v !== val);
    }
    document.getElementById("btn-dressup").disabled =
      state.dressup.length === 0;
  }

  if (group === "vibe") {
    const val = btn.dataset.value;
    if (btn.classList.contains("selected")) {
      state.vibes.push(val);
    } else {
      state.vibes = state.vibes.filter((v) => v !== val);
    }
    document.getElementById("btn-vibe").disabled = state.vibes.length === 0;
  }
}

// ── Guide Panel ───────────────────────────
export function toggleGuide() {
  const panel = document.getElementById("guide-panel");
  panel.hidden = !panel.hidden;
}

// ── Build Results ─────────────────────────
function buildResults() {
  const genderData = outfitDB[state.gender] || outfitDB["Female"];
  const bodyData = genderData[state.bodyShape] || genderData["Rectangle"];

  const container = document.getElementById("results-cards");
  container.innerHTML = "";

  // Body-level tip (first non-null tip found across selected categories)
  let globalTip = null;
  state.dressup.forEach((cat) => {
    if (!globalTip && bodyData[cat]?.tip) globalTip = bodyData[cat].tip;
  });

  // Vibe tip
  const vibeTipText = state.vibes
    .map((v) => vibeTips[v])
    .filter(Boolean)
    .join(" ");

  document.getElementById("results-sub").textContent =
    `Styled for ${state.bodyShape} · ${state.gender}`;
  document.getElementById("results-tip").textContent =
    vibeTipText ||
    globalTip ||
    "Mix and match these picks to create your signature look.";

  state.dressup.forEach((cat) => {
    const catData = bodyData[cat];
    if (!catData) return;

    const card = document.createElement("div");
    card.className = "result-card";

    const title = document.createElement("div");
    title.className = "result-card-title";
    title.textContent = cat;
    card.appendChild(title);

    if (catData.tip) {
      const tipEl = document.createElement("p");
      tipEl.style.cssText =
        "font-size:12px;color:#6B6660;margin-bottom:8px;font-style:italic;";
      tipEl.textContent = catData.tip;
      card.appendChild(tipEl);
    }

    const itemList = document.createElement("div");
    itemList.className = "result-card-items";
    catData.items.forEach((item) => {
      const span = document.createElement("span");
      span.textContent = item;
      itemList.appendChild(span);
    });
    card.appendChild(itemList);
    container.appendChild(card);
  });
}

// ── Submit to Firebase + Show Results ─────
export async function submitAndShow() {
  const loading = document.getElementById("loading");
  loading.hidden = false;

  const entry = {
    gender: state.gender,
    bodyShape: state.bodyShape,
    dressup: state.dressup,
    vibes: state.vibes,
    timestamp: new Date().toISOString(),
  };

  try {
    const stylesRef = ref(db, "stylefit/sessions");
    const newRef = await push(stylesRef, entry);
    console.log("✅ Saved to Firebase:", newRef.key, entry);
  } catch (err) {
    console.error("❌ Firebase save error:", err);
    // Still show results even if Firebase fails
  } finally {
    loading.hidden = true;
    buildResults();
    goTo("screen-results");
  }
}

// ── Expose functions to global scope ─────
//    (needed because HTML uses onclick="...")
window.goTo = goTo;
window.goBack = goBack;
window.restart = restart;
window.selectGender = selectGender;
window.selectPill = selectPill;
window.togglePill = togglePill;
window.toggleGuide = toggleGuide;
window.submitAndShow = submitAndShow;
