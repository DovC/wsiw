import { Shirt, Wind, User, Hand, Footprints, LucideIcon } from "lucide-react";

export type GearItem = {
  id: string;
  name: string;
  category: "Head" | "Torso" | "Legs" | "Feet" | "Hands";
  layerType?: "Base" | "Mid" | "Outer";
  warmthRating: number; // 1-10
  iconName?: string;
};

export const GEAR_CLOSET: GearItem[] = [
  // HEAD
  { id: "h1", name: "Baseball Hat", category: "Head", warmthRating: 2 },
  { id: "h2", name: "Beanie", category: "Head", warmthRating: 7 },
  { id: "h3", name: "Buff/Headband", category: "Head", warmthRating: 4 },

  // TORSO
  { id: "t1", name: "Merino Wool Long Sleeve", category: "Torso", layerType: "Base", warmthRating: 6 },
  { id: "t2", name: "Lightweight Windbreaker", category: "Torso", layerType: "Outer", warmthRating: 4 },
  { id: "t3", name: "Tech T-Shirt", category: "Torso", layerType: "Base", warmthRating: 2 },
  { id: "t4", name: "Fleece Midlayer", category: "Torso", layerType: "Mid", warmthRating: 7 },
  { id: "t5", name: "Insulated Vest", category: "Torso", layerType: "Mid", warmthRating: 6 },
  { id: "t6", name: "Rain Shell", category: "Torso", layerType: "Outer", warmthRating: 5 },

  // LEGS
  { id: "l1", name: "Thermal Tights", category: "Legs", warmthRating: 8 },
  { id: "l2", name: "3/4 Length Tights", category: "Legs", warmthRating: 5 },
  { id: "l3", name: "Running Shorts", category: "Legs", warmthRating: 1 },
  { id: "l4", name: "Track Pants", category: "Legs", warmthRating: 6 },

  // FEET
  { id: "f1", name: "Ankle Socks", category: "Feet", warmthRating: 2 },
  { id: "f2", name: "Wool Socks", category: "Feet", warmthRating: 7 },
  { id: "f3", name: "Compression Socks", category: "Feet", warmthRating: 3 },

  // HANDS
  { id: "ha1", name: "Light Gloves", category: "Hands", warmthRating: 4 },
  { id: "ha2", name: "Heavy Mittens", category: "Hands", warmthRating: 9 },
];

export const INITIAL_RECOMMENDATION = [
  { ...GEAR_CLOSET.find(i => i.id === "t1")!, reason: "Moisture wicking, thermoregulation" },
  { ...GEAR_CLOSET.find(i => i.id === "t2")!, reason: "Wind gusts > 15km/h" },
  { ...GEAR_CLOSET.find(i => i.id === "l1")!, reason: "Feels like 4°C" },
  { ...GEAR_CLOSET.find(i => i.id === "ha1")!, reason: "Extremity protection recommended" },
];
