// Product images
import bhailLiquid from "@/assets/products/bhail-liquid.jpg";

import punjabiNimco from "@/assets/products/punjabi-nimco.jpg";
import khattaMeetha from "@/assets/products/khatta-meetha.jpg";
import shahiNimco from "@/assets/products/shahi-nimco.jpg";
import chopatiNimco from "@/assets/products/chopati-nimco.jpg";
import blackPepperNimco from "@/assets/products/blackpepper-nimco.jpg";
import sweetChewra from "@/assets/products/sweet-chewra.jpg";
import mixNimcoAsset from "@/assets/adam nimco item asstes/Mix Nimco.png";
import blackPepperMixNimcoAsset from "@/assets/adam nimco item asstes/Black pepper mix nimco.jpeg";
import masalaNimcoAsset from "@/assets/adam nimco item asstes/Masala Nimco.png";

import namkeenChewra from "@/assets/products/namkeen-chewra.jpg";
import namkeenPara from "@/assets/products/namkeen-para.jpg";
import sweetPara from "@/assets/products/sweet-para.jpg";
import mungDal from "@/assets/products/mung-dal.jpg";
import dalMoth from "@/assets/products/dal-moth.jpg";
import masalaChanaDal from "@/assets/products/masala-chana-dal.jpg";
import sevLarge from "@/assets/products/sev-large.jpg";
import sevMedium from "@/assets/products/sev-medium.jpg";
import sevSmall from "@/assets/products/sev-small.jpg";
import sevMini from "@/assets/products/sev-mini.jpg";
import masalaSev from "@/assets/products/masala-sev.jpg";
import masalaMattar from "@/assets/products/masala-mattar.jpg";
import masalaChana from "@/assets/products/masala-chana.jpg";
import gathiya from "@/assets/products/gathiya.jpg";
import gathiyaBarik from "@/assets/products/gathiya-barik.jpg";
import gathiyaPapri from "@/assets/products/gathiya-papri.jpg";
import murmura from "@/assets/products/murmura.jpg";

import chipsPlain from "@/assets/products/chips-plain.jpg";
import chipsMasala from "@/assets/products/chips-masala.jpg";
import chipsCrinkle from "@/assets/products/chips-crinkle.jpg";
import chipsCrinkleMasala from "@/assets/products/chips-crinkle-masala.jpg";
import chipsFinger from "@/assets/products/chips-finger.jpg";
import chipsFingerMasala from "@/assets/products/chips-finger-masala.jpg";
import chipsFingerPepper from "@/assets/products/chips-finger-pepper.jpg";
import chipsHyderabadi from "@/assets/products/chips-hyderabadi.jpg";
import topPops from "@/assets/products/top-pops.jpg";
import topPopsMasala from "@/assets/products/top-pops-masala.jpg";

import peanutRed from "@/assets/products/peanut-red.jpg";
import peanutSalty from "@/assets/products/peanut-salty.jpg";
import peanutMasala from "@/assets/products/peanut-masala.jpg";
import peanutBesan from "@/assets/products/peanut-besan.jpg";

import papriBatasha from "@/assets/products/papri-batasha.jpg";
import papriZera from "@/assets/products/papri-zera.jpg";
import papriCoin from "@/assets/products/papri-coin.jpg";
import papriCoinMasala from "@/assets/products/papri-coin-masala.jpg";
import papriChat from "@/assets/products/papri-chat.jpg";
import barikBundi from "@/assets/products/barik-bundi.jpg";
import motiBundi from "@/assets/products/moti-bundi.jpg";
import lahoriBundi from "@/assets/products/lahori-bundi.jpg";

import gulabJamun from "@/assets/products/gulab-jamun.jpg";

export type Variant = { label: string; price: number; grams: number };

export type CategoryKey =
  | "bhail-puri"
  | "special"
  | "regular"
  | "chips"
  | "peanuts"
  | "bondi"
  | "papri"
  | "sweets";

export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  variants: Variant[];
  badges?: string[];
  category: CategoryKey;
  special?: boolean;
};

export const CATEGORIES: { key: CategoryKey; label: string; emoji: string }[] = [
  { key: "bhail-puri", label: "Bhail Puri", emoji: "🥗" },
  { key: "special", label: "Special Items", emoji: "🔥" },
  { key: "regular", label: "Regular Items", emoji: "⭐" },
  { key: "chips", label: "Chips", emoji: "🥔" },
  { key: "peanuts", label: "Peanuts", emoji: "🥜" },
  { key: "bondi", label: "Bondi", emoji: "🍥" },
  { key: "papri", label: "Papri", emoji: "🍘" },
  { key: "sweets", label: "Sweets", emoji: "🍮" },
];

// Helper: build weight-scaled variants. Base weight & price come first;
// 500g and 1kg are linearly scaled and rounded to nearest 10.
const round10 = (n: number) => Math.round(n / 10) * 10;
const scaled = (baseGrams: number, basePrice: number, baseLabel: string): Variant[] => {
  const perGram = basePrice / baseGrams;
  const variants: Variant[] = [{ label: baseLabel, price: basePrice, grams: baseGrams }];
  // Add 500g and 1kg if base < 500
  if (baseGrams < 500) variants.push({ label: "500g", price: round10(perGram * 500), grams: 500 });
  if (baseGrams < 1000) variants.push({ label: "1kg", price: round10(perGram * 1000), grams: 1000 });
  return variants;
};

export const PRODUCTS: Product[] = [
  // ============ BHAIL PURI ============
  {
    slug: "bhail-puri-liquid",
    name: "Bhail Puri (Liquid Chatni)",
    short: "Generous tamarind & green chutney",
    description:
      "Bhail puri drowned in tangy tamarind and fresh green mint chutney — the way Karachi loves it.",
    image: bhailLiquid,
    variants: scaled(250, 300, "250g"),
    badges: ["💧 Saucy"],
    category: "bhail-puri",
    special: true,
  },

  // ============ SPECIAL ITEMS ============
  {
    slug: "punjabi-nimco",
    name: "Punjabi Nimco",
    short: "Crispy golden Punjabi-style mix",
    description: "Authentic Punjabi nimco — golden crispy sev with green chili and curry leaves.",
    image: punjabiNimco,
    variants: scaled(200, 190, "200g"),
    badges: ["🔥 Special"],
    category: "special",
    special: true,
  },
  {
    slug: "khatta-meetha-nimco",
    name: "Khatta Meetha Nimco",
    short: "Sweet & tangy snack mix",
    description:
      "Perfect balance of sweet and tangy — sev with raisins, peanuts and a sugary tamarind kick.",
    image: khattaMeetha,
    variants: scaled(200, 190, "200g"),
    badges: ["🔥 Special"],
    category: "special",
    special: true,
  },
  {
    slug: "shahi-nimco",
    name: "Shahi Nimco",
    short: "Royal mix with cashews & almonds",
    description:
      "A truly royal blend — premium cashews, almonds, raisins and golden sev. Our top pick.",
    image: shahiNimco,
    variants: scaled(200, 240, "200g"),
    badges: ["👑 Premium"],
    category: "special",
    special: true,
  },
  {
    slug: "chopati-nimco",
    name: "Chopati Nimco",
    short: "Mumbai chowpatty style mix",
    description: "Bold flavours of Mumbai chowpatty — puffed rice, sev, peanuts and red chili.",
    image: chopatiNimco,
    variants: scaled(200, 240, "200g"),
    badges: ["🔥 Special"],
    category: "special",
    special: true,
  },
  {
    slug: "punjabi-black-paper-nimco",
    name: "Punjabi Black Pepper Nimco",
    short: "Bold black pepper kick",
    description: "Crispy Punjabi-style nimco loaded with cracked black pepper for a sharp finish.",
    image: blackPepperNimco,
    variants: scaled(200, 240, "200g"),
    badges: ["🌶 Bold"],
    category: "special",
    special: true,
  },
  {
    slug: "sweet-chewra-special",
    name: "Sweet Chewra (Special)",
    short: "Sweet flaked rice with raisins",
    description: "Sweet chewra — flaked rice, cashews, raisins and a delicate sugar coating.",
    image: sweetChewra,
    variants: scaled(200, 240, "200g"),
    badges: ["🔥 Special"],
    category: "special",
    special: true,
  },

  // ============ REGULAR ITEMS ============
  {
    slug: "mix-nimco",
    name: "Mix Nimco Salted (16 items)",
    short: "Classic crunchy nimco mix",
    description:
      "A balanced classic nimco mix — crispy sev, lentils and peanuts with the perfect everyday crunch.",
    image: mixNimcoAsset,
    variants: scaled(200, 190, "200g"),
    category: "regular",
  },
  {
    slug: "blackpepper-mix-nimco",
    name: "Black Pepper Mix Nimco",
    short: "Bold black pepper nimco mix",
    description:
      "A punchy nimco mix finished with cracked black pepper for a sharp, savoury kick.",
    image: blackPepperMixNimcoAsset,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "masala-nimco",
    name: "Masala Nimco",
    short: "Spicy masala-coated nimco mix",
    description:
      "Crispy nimco mix tossed with our signature red masala — bold, crunchy and addictive.",
    image: masalaNimcoAsset,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "namkeen-chewra",
    name: "Namkeen Chewra",
    short: "Savoury flaked rice mix",
    description: "Salty flaked rice with peanuts and curry leaves — a classic tea-time snack.",
    image: namkeenChewra,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "sweet-chewra",
    name: "Sweet Chewra",
    short: "Sweet flaked rice classic",
    description: "Lightly sweetened flaked rice with raisins and a touch of cardamom.",
    image: sweetChewra,
    variants: scaled(200, 240, "200g"),
    category: "regular",
  },
  {
    slug: "namkeen-para",
    name: "Namkeen Para",
    short: "Crispy salty diamond crackers",
    description: "Crispy fried salty flour crackers — light, flaky and addictive.",
    image: namkeenPara,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "sweet-para",
    name: "Sweet Pare",
    short: "Sugar-glazed diamond crackers",
    description: "Sweet shakkar pare — fried flour diamonds glazed with sugar syrup.",
    image: sweetPara,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "mung-dal",
    name: "Mung Dal",
    short: "Crispy fried yellow lentils",
    description: "Crispy fried split mung lentils — light, salty and perfect with chai.",
    image: mungDal,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "dal-moth",
    name: "Dal Moth",
    short: "Spicy mixed lentil snack",
    description: "Crunchy fried lentil mix tossed with savoury masala.",
    image: dalMoth,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "masala-chana-dal",
    name: "Masala Chana Dal",
    short: "Spicy fried split chickpea",
    description: "Fried split chickpeas with our signature masala — crunchy and spicy.",
    image: masalaChanaDal,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "sev-large",
    name: "Large Size Sev",
    short: "Thick golden sev noodles",
    description: "Thick gram flour sev — crunchy and full of flavour.",
    image: sevLarge,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "sev-medium",
    name: "Medium Size Sev",
    short: "Medium thickness sev",
    description: "Medium-thickness golden sev — the everyday classic.",
    image: sevMedium,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "sev-small",
    name: "Small Size Sev",
    short: "Thin golden sev",
    description: "Thin sev — great for chaat or snacking on its own.",
    image: sevSmall,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "sev-mini",
    name: "Mini Barik Sev",
    short: "Extra-fine vermicelli sev",
    description: "Ultra-thin barik sev — delicate, crispy, melts in the mouth.",
    image: sevMini,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "masala-sev",
    name: "Masala Sev",
    short: "Spicy red-dusted sev",
    description: "Crispy sev tossed with our fiery red masala blend.",
    image: masalaSev,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "masala-mattar",
    name: "Masala Mattar",
    short: "Spicy fried green peas",
    description: "Crunchy fried green peas coated with our chili masala.",
    image: masalaMattar,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "masala-chana",
    name: "Masala Chana",
    short: "Spicy roasted chickpeas",
    description: "Roasted whole chickpeas with bold red masala — a protein-rich snack.",
    image: masalaChana,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "gathiya",
    name: "Gathiya",
    short: "Thick gram flour sticks",
    description: "Soft yet crunchy thick gathiya — Gujarati teatime favourite.",
    image: gathiya,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "gathiya-barik",
    name: "Barik Gathiya",
    short: "Thin gathiya sticks",
    description: "Thin and extra crispy gathiya sticks.",
    image: gathiyaBarik,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "gathiya-papri",
    name: "Papri Gathiya",
    short: "Flat layered gathiya",
    description: "Flat layered crispy gathiya pieces.",
    image: gathiyaPapri,
    variants: scaled(200, 180, "200g"),
    category: "regular",
  },
  {
    slug: "murmura",
    name: "Murmura",
    short: "Plain puffed rice",
    description: "Light, airy puffed rice — perfect base for your own chaat.",
    image: murmura,
    variants: scaled(200, 160, "200g"),
    category: "regular",
  },

  // ============ CHIPS ============
  {
    slug: "chips-plain",
    name: "Plain Chips",
    short: "Classic golden potato chips",
    description: "Hand-cut golden potato chips — lightly salted, perfectly crisp.",
    image: chipsPlain,
    variants: scaled(100, 100, "100g"),
    category: "chips",
  },
  {
    slug: "chips-plain-masala",
    name: "Plain Masala Chips",
    short: "Round chips with red masala",
    description: "Plain round chips dusted with our signature red masala.",
    image: chipsMasala,
    variants: scaled(100, 100, "100g"),
    category: "chips",
  },
  {
    slug: "chips-crinkle",
    name: "Crinkle Chips",
    short: "Wavy ridged potato chips",
    description: "Crinkle-cut chips — extra crunch in every bite.",
    image: chipsCrinkle,
    variants: scaled(100, 100, "100g"),
    category: "chips",
  },
  {
    slug: "chips-crinkle-masala",
    name: "Crinkle Masala Chips",
    short: "Spicy ridged chips",
    description: "Wavy crinkle chips with bold red masala.",
    image: chipsCrinkleMasala,
    variants: scaled(100, 100, "100g"),
    category: "chips",
  },
  {
    slug: "chips-finger",
    name: "Finger Chips",
    short: "Long potato sticks",
    description: "Crispy long-cut finger chips — golden and lightly salted.",
    image: chipsFinger,
    variants: scaled(200, 240, "200g"),
    category: "chips",
  },
  {
    slug: "chips-finger-masala",
    name: "Finger Masala Chips",
    short: "Spicy long potato sticks",
    description: "Long finger chips coated with our fiery red masala.",
    image: chipsFingerMasala,
    variants: scaled(200, 240, "200g"),
    category: "chips",
  },
  {
    slug: "chips-finger-blackpepper",
    name: "Finger Black Pepper Chips",
    short: "Bold black pepper finger chips",
    description: "Long finger chips with cracked black pepper — sharp and savoury.",
    image: chipsFingerPepper,
    variants: scaled(200, 240, "200g"),
    category: "chips",
  },
  {
    slug: "chips-hyderabadi",
    name: "Hyderabadi Chips",
    short: "Fiery red chili chips",
    description: "Hyderabadi-style spicy chips with bright red chili coating.",
    image: chipsHyderabadi,
    variants: scaled(100, 120, "100g"),
    category: "chips",
  },
  {
    slug: "top-pops",
    name: "Top Pops",
    short: "Puffed corn ball snack",
    description: "Light puffed corn balls — fun, crunchy, perfect for kids.",
    image: topPops,
    variants: [
      { label: "60g", price: 50, grams: 60 },
      { label: "120g", price: 100, grams: 120 },
      { label: "180g", price: 140, grams: 180 },
    ],
    category: "chips",
  },
  {
    slug: "top-pops-masala",
    name: "Top Pops Masala",
    short: "Spicy puffed corn balls",
    description: "Puffed corn balls with our signature red masala spice.",
    image: topPopsMasala,
    variants: [
      { label: "60g", price: 50, grams: 60 },
      { label: "120g", price: 100, grams: 120 },
      { label: "180g", price: 140, grams: 180 },
    ],
    category: "chips",
  },

  // ============ PEANUTS ============
  {
    slug: "peanut-red",
    name: "Red Peanut",
    short: "Roasted red-skin peanuts",
    description: "Premium red-skin roasted peanuts — earthy, nutty and protein-rich.",
    image: peanutRed,
    variants: scaled(200, 240, "200g"),
    category: "peanuts",
  },
  {
    slug: "peanut-salty",
    name: "Salty Peanut",
    short: "Lightly salted roasted peanuts",
    description: "Roasted golden peanuts with a perfect light salt finish.",
    image: peanutSalty,
    variants: scaled(200, 240, "200g"),
    category: "peanuts",
  },
  {
    slug: "peanut-masala",
    name: "Masala Peanut",
    short: "Spicy roasted peanuts",
    description: "Roasted peanuts coated in our fiery red chili masala.",
    image: peanutMasala,
    variants: scaled(200, 240, "200g"),
    category: "peanuts",
  },
  {
    slug: "peanut-besan",
    name: "Besan Wali Peanut",
    short: "Gram-flour coated peanuts",
    description: "Peanuts wrapped in crispy gram flour batter — Indian-style classic.",
    image: peanutBesan,
    variants: scaled(200, 240, "200g"),
    category: "peanuts",
  },

  // ============ BONDI ============
  {
    slug: "barik-bundi",
    name: "Barik Bundi",
    short: "Fine, crispy boondi pearls",
    description:
      "Extra-fine barik bundi — crunchy, light and perfect for snacking or raita.",
    image: barikBundi,
    variants: scaled(200, 180, "200g"),
    category: "bondi",
  },
  {
    slug: "moti-bundi",
    name: "Moti Bundi",
    short: "Bigger, crunchy boondi pearls",
    description:
      "Moti bundi — larger pearls with a satisfying crunch and classic savoury flavour.",
    image: motiBundi,
    variants: scaled(200, 180, "200g"),
    category: "bondi",
  },
  {
    slug: "lahori-bundi",
    name: "Lahori Bundi",
    short: "Lahori-style spicy bundi",
    description:
      "Lahori bundi — a bold, spicy bundi with a desi masala profile.",
    image: lahoriBundi,
    variants: scaled(200, 180, "200g"),
    category: "bondi",
  },

  // ============ PAPRI ============
  {
    slug: "papri-batasha",
    name: "Batasha Papri",
    short: "Hollow puffed crispy puris",
    description: "Round hollow puffed batasha — perfect for pani puri or snacking.",
    image: papriBatasha,
    variants: scaled(200, 180, "200g"),
    category: "papri",
  },
  {
    slug: "papri-zera",
    name: "Zera Papri",
    short: "Cumin-spiced flat crackers",
    description: "Crispy flat papri infused with aromatic cumin seeds.",
    image: papriZera,
    variants: scaled(200, 200, "200g"),
    category: "papri",
  },
  {
    slug: "papri-coin",
    name: "Coin Papri Salted",
    short: "Small round crackers",
    description: "Coin-sized round crispy crackers — bite-sized and addictive.",
    image: papriCoin,
    variants: scaled(200, 180, "200g"),
    category: "papri",
  },
  {
    slug: "papri-coin-masala",
    name: "Coin Masala Papri",
    short: "Spicy round crackers",
    description: "Coin papri with bold red masala coating.",
    image: papriCoinMasala,
    variants: scaled(200, 180, "200g"),
    category: "papri",
  },
  {
    slug: "papri-chat",
    name: "Chat Papri",
    short: "Flat crispy papri for chaat",
    description: "Golden flat papri — the perfect base for your favourite chaat.",
    image: papriChat,
    variants: scaled(200, 140, "200g"),
    category: "papri",
  },

  // ============ SWEETS ============
  {
    slug: "gulab-jamun",
    name: "Gulab Jamun",
    short: "Soft sweets in sugar syrup",
    description:
      "Classic gulab jamun — soft milk-solid balls soaked in fragrant cardamom sugar syrup.",
    image: gulabJamun,
    variants: scaled(250, 240, "250g"),
    badges: ["🍮 Sweet"],
    category: "sweets",
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsByCategory = (cat: CategoryKey) =>
  PRODUCTS.filter((p) => p.category === cat);
