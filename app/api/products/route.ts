// app/api/users/route.js

import { ProductProps } from "@/app/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";

// products are always max price of 150,-
const allProducts: ProductProps[] = [
  {
    id: "1",
    url: "https://www.example.com/product1",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation.",
    price: 59.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["muziek", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "2",
    url: "https://www.example.com/product2",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Yoga Mat",
    description: "Eco-friendly yoga mat for all types of workouts.",
    price: 29.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["sport", "natuur"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "3",
    url: "https://www.example.com/product3",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Smart Watch",
    description: "Track your fitness and stay connected with this smartwatch.",
    price: 199.99,
    occasions: ["verjaardag", "bedankje"],
    interests: ["sport", "tech"],
    forWho: ["mannelijk"],
  },
  {
    id: "4",
    url: "https://www.example.com/product4",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Cookbook",
    description: "Delicious recipes from around the world.",
    price: 24.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["koken", "lezen"],
    forWho: ["unisex"],
  },
  {
    id: "5",
    url: "https://www.example.com/product5",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with high-quality sound.",
    price: 49.99,
    occasions: ["verjaardag", "feesten"],
    interests: ["muziek", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "6",
    url: "https://www.example.com/product6",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Fashionable Scarf",
    description: "Stylish scarf made from premium materials.",
    price: 19.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["fashion", "interieur"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "7",
    url: "https://www.example.com/product7",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Travel Backpack",
    description: "Durable and spacious backpack for travel enthusiasts.",
    price: 79.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["reizen", "natuur"],
    forWho: ["mannelijk"],
  },
  {
    id: "8",
    url: "https://www.example.com/product8",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "E-Reader",
    description: "Compact e-reader with a high-resolution display.",
    price: 99.99,
    occasions: ["verjaardag", "diploma"],
    interests: ["lezen", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "9",
    url: "https://www.example.com/product9",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Indoor Plant",
    description: "Beautiful indoor plant to brighten up any space.",
    price: 15.99,
    occasions: ["housewarming", "bedankje"],
    interests: ["interieur", "natuur"],
    forWho: ["unisex"],
  },
  {
    id: "10",
    url: "https://www.example.com/product10",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Wine Glass Set",
    description: "Elegant wine glass set perfect for any occasion.",
    price: 34.99,
    occasions: ["verjaardag", "housewarming"],
    interests: ["feesten", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "11",
    url: "https://www.example.com/product11",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Running Shoes",
    description: "Comfortable running shoes for all types of runners.",
    price: 89.99,
    occasions: ["verjaardag", "bedankje"],
    interests: ["sport", "fashion"],
    forWho: ["mannelijk"],
  },
  {
    id: "12",
    url: "https://www.example.com/product12",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Laptop Stand",
    description: "Ergonomic laptop stand to improve your workspace.",
    price: 39.99,
    occasions: ["diploma", "pensioen"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "13",
    url: "https://www.example.com/product13",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Gourmet Chocolate Box",
    description: "Delicious assortment of gourmet chocolates.",
    price: 24.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["koken", "feesten"],
    forWho: ["unisex"],
  },
  {
    id: "14",
    url: "https://www.example.com/product14",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Electric Toothbrush",
    description: "Advanced electric toothbrush for a cleaner smile.",
    price: 49.99,
    occasions: ["verjaardag", "housewarming"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "15",
    url: "https://www.example.com/product15",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Board Game",
    description: "Fun and engaging board game for all ages.",
    price: 29.99,
    occasions: ["verjaardag", "housewarming"],
    interests: ["feesten", "lezen"],
    forWho: ["unisex"],
  },
  {
    id: "16",
    url: "https://www.example.com/product16",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Wireless Charger",
    description: "Fast and convenient wireless charger for your devices.",
    price: 29.99,
    occasions: ["diploma", "bedankje"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "17",
    url: "https://www.example.com/product17",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Perfume",
    description: "Exquisite perfume with a long-lasting fragrance.",
    price: 69.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["fashion", "interieur"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "18",
    url: "https://www.example.com/product18",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Electric Kettle",
    description: "Fast-boiling electric kettle with temperature control.",
    price: 39.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["koken", "tech"],
    forWho: ["mannelijk"],
  },
  {
    id: "19",
    url: "https://www.example.com/product19",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Fitness Tracker",
    description: "Track your fitness goals with this advanced fitness tracker.",
    price: 79.99,
    occasions: ["verjaardag", "sportdag"],
    interests: ["sport", "tech"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "20",
    url: "https://www.example.com/product20",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Candle Set",
    description: "Scented candle set to create a cozy atmosphere.",
    price: 19.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["interieur"],
    forWho: ["unisex"],
  },
  {
    id: "21",
    url: "https://www.example.com/product21",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Gaming Headset",
    description: "Immersive gaming headset with surround sound.",
    price: 79.99,
    occasions: ["verjaardag", "bedankje"],
    interests: ["muziek", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "22",
    url: "https://www.example.com/product22",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Coffee Maker",
    description: "Automatic coffee maker with programmable settings.",
    price: 99.99,
    occasions: ["housewarming", "jubileum"],
    interests: ["koken", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "23",
    url: "https://www.example.com/product23",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation.",
    price: 59.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["muziek", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "24",
    url: "https://www.example.com/product24",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Yoga Mat",
    description: "Eco-friendly yoga mat for all types of workouts.",
    price: 29.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["sport", "natuur"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "25",
    url: "https://www.example.com/product25",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Smart Watch",
    description: "Track your fitness and stay connected with this smartwatch.",
    price: 149.99,
    occasions: ["verjaardag", "bedankje"],
    interests: ["sport", "tech"],
    forWho: ["mannelijk"],
  },
  {
    id: "26",
    url: "https://www.example.com/product26",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Cookbook",
    description: "Delicious recipes from around the world.",
    price: 24.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["koken", "lezen"],
    forWho: ["unisex"],
  },
  {
    id: "27",
    url: "https://www.example.com/product27",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with high-quality sound.",
    price: 49.99,
    occasions: ["verjaardag", "feesten"],
    interests: ["muziek", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "28",
    url: "https://www.example.com/product28",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Fashionable Scarf",
    description: "Stylish scarf made from premium materials.",
    price: 19.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["fashion", "interieur"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "29",
    url: "https://www.example.com/product29",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Travel Backpack",
    description: "Durable and spacious backpack for travel enthusiasts.",
    price: 79.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["reizen", "natuur"],
    forWho: ["mannelijk"],
  },
  {
    id: "30",
    url: "https://www.example.com/product30",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "E-Reader",
    description: "Compact e-reader with a high-resolution display.",
    price: 99.99,
    occasions: ["verjaardag", "diploma"],
    interests: ["lezen", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "31",
    url: "https://www.example.com/product31",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Indoor Plant",
    description: "Beautiful indoor plant to brighten up any space.",
    price: 15.99,
    occasions: ["housewarming", "bedankje"],
    interests: ["interieur", "natuur"],
    forWho: ["unisex"],
  },
  {
    id: "32",
    url: "https://www.example.com/product32",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Wine Glass Set",
    description: "Elegant wine glass set perfect for any occasion.",
    price: 34.99,
    occasions: ["verjaardag", "housewarming"],
    interests: ["feesten", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "33",
    url: "https://www.example.com/product33",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Running Shoes",
    description: "Comfortable running shoes for all types of runners.",
    price: 89.99,
    occasions: ["verjaardag", "bedankje"],
    interests: ["sport", "fashion"],
    forWho: ["mannelijk"],
  },
  {
    id: "34",
    url: "https://www.example.com/product34",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Laptop Stand",
    description: "Ergonomic laptop stand to improve your workspace.",
    price: 39.99,
    occasions: ["diploma", "pensioen"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "35",
    url: "https://www.example.com/product35",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Gourmet Chocolate Box",
    description: "Delicious assortment of gourmet chocolates.",
    price: 24.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["koken", "feesten"],
    forWho: ["unisex"],
  },
  {
    id: "36",
    url: "https://www.example.com/product36",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Electric Toothbrush",
    description: "Advanced electric toothbrush for a cleaner smile.",
    price: 49.99,
    occasions: ["verjaardag", "housewarming"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "37",
    url: "https://www.example.com/product37",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Board Game",
    description: "Fun and engaging board game for all ages.",
    price: 29.99,
    occasions: ["verjaardag", "housewarming"],
    interests: ["feesten", "lezen"],
    forWho: ["unisex"],
  },
  {
    id: "38",
    url: "https://www.example.com/product38",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Wireless Charger",
    description: "Fast and convenient wireless charger for your devices.",
    price: 29.99,
    occasions: ["diploma", "bedankje"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "39",
    url: "https://www.example.com/product39",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Perfume",
    description: "Exquisite perfume with a long-lasting fragrance.",
    price: 69.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["fashion", "interieur"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "40",
    url: "https://www.example.com/product40",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Electric Kettle",
    description: "Fast-boiling electric kettle with temperature control.",
    price: 39.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["koken", "tech"],
    forWho: ["mannelijk"],
  },
  {
    id: "41",
    url: "https://www.example.com/product41",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Fitness Tracker",
    description: "Track your fitness goals with this advanced fitness tracker.",
    price: 79.99,
    occasions: ["verjaardag", "sportdag"],
    interests: ["sport", "tech"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "42",
    url: "https://www.example.com/product42",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Candle Set",
    description: "Scented candle set to create a cozy atmosphere.",
    price: 19.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["interieur"],
    forWho: ["unisex"],
  },
  {
    id: "43",
    url: "https://www.example.com/product43",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Wireless Keyboard",
    description: "Compact wireless keyboard with Bluetooth connectivity.",
    price: 49.99,
    occasions: ["diploma", "housewarming"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "44",
    url: "https://www.example.com/product44",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Electric Shaver",
    description: "High-performance electric shaver for a smooth shave.",
    price: 49.99,
    occasions: ["verjaardag", "diploma"],
    interests: ["tech", "fashion"],
    forWho: ["mannelijk"],
  },
  {
    id: "45",
    url: "https://www.example.com/product45",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Luxury Watch",
    description: "Elegant luxury watch for special occasions.",
    price: 149.99,
    occasions: ["jubileum", "bruiloft"],
    interests: ["fashion", "tech"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "46",
    url: "https://www.example.com/product46",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Digital Photo Frame",
    description: "Digital photo frame to display your favorite memories.",
    price: 79.99,
    occasions: ["verjaardag", "housewarming"],
    interests: ["interieur", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "47",
    url: "https://www.example.com/product47",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Smart Light Bulb",
    description: "Smart light bulb with color changing capabilities.",
    price: 29.99,
    occasions: ["housewarming", "jubileum"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "48",
    url: "https://www.example.com/product48",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Leather Wallet",
    description: "Premium leather wallet with multiple compartments.",
    price: 49.99,
    occasions: ["verjaardag", "bedankje"],
    interests: ["fashion", "interieur"],
    forWho: ["mannelijk"],
  },
  {
    id: "49",
    url: "https://www.example.com/product49",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Portable Projector",
    description: "Compact portable projector for home entertainment.",
    price: 149.99,
    occasions: ["verjaardag", "diploma"],
    interests: ["tech", "reizen"],
    forWho: ["unisex"],
  },
  {
    id: "50",
    url: "https://www.example.com/product50",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Electric Grill",
    description: "Electric grill for indoor and outdoor cooking.",
    price: 79.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["koken", "natuur"],
    forWho: ["unisex"],
  },
  {
    id: "51",
    url: "https://www.example.com/product51",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Smart Doorbell",
    description: "Smart doorbell with video and audio capabilities.",
    price: 129.99,
    occasions: ["housewarming", "diploma"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "52",
    url: "https://www.example.com/product52",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Wireless Router",
    description: "High-speed wireless router for seamless connectivity.",
    price: 99.99,
    occasions: ["housewarming", "diploma"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "53",
    url: "https://www.example.com/product53",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Virtual Assistant Speaker",
    description: "Smart speaker with built-in virtual assistant.",
    price: 89.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["muziek", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "54",
    url: "https://www.example.com/product54",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Electric Wine Opener",
    description: "Electric wine opener for effortless uncorking.",
    price: 39.99,
    occasions: ["housewarming", "jubileum"],
    interests: ["koken", "feesten"],
    forWho: ["unisex"],
  },
  {
    id: "55",
    url: "https://www.example.com/product55",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Fitness Mat",
    description: "Comfortable and durable fitness mat for workouts.",
    price: 29.99,
    occasions: ["verjaardag", "sportdag"],
    interests: ["sport", "natuur"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "56",
    url: "https://www.example.com/product56",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Noise-Cancelling Headphones",
    description: "Over-ear headphones with noise-cancelling technology.",
    price: 149.99,
    occasions: ["verjaardag", "bedankje"],
    interests: ["muziek", "tech"],
    forWho: ["unisex"],
  },
  {
    id: "57",
    url: "https://www.example.com/product57",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Digital Alarm Clock",
    description: "Smart digital alarm clock with multiple features.",
    price: 49.99,
    occasions: ["housewarming", "diploma"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "58",
    url: "https://www.example.com/product58",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Portable Power Bank",
    description: "High-capacity power bank for on-the-go charging.",
    price: 39.99,
    occasions: ["diploma", "bedankje"],
    interests: ["tech", "reizen"],
    forWho: ["unisex"],
  },
  {
    id: "59",
    url: "https://www.example.com/product59",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Home Security Camera",
    description: "Wireless home security camera with night vision.",
    price: 99.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "60",
    url: "https://www.example.com/product60",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Bluetooth Keyboard",
    description: "Compact Bluetooth keyboard for all your devices.",
    price: 49.99,
    occasions: ["diploma", "housewarming"],
    interests: ["tech", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "61",
    url: "https://www.example.com/product61",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Photo Printer",
    description: "Portable photo printer for instant prints.",
    price: 129.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["tech", "reizen"],
    forWho: ["unisex"],
  },
  {
    id: "62",
    url: "https://www.example.com/product62",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Stylish Sunglasses",
    description: "UV-protected stylish sunglasses.",
    price: 39.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["fashion", "reizen"],
    forWho: ["vrouwelijk"],
  },
  {
    id: "63",
    url: "https://www.example.com/product63",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Waterproof Bluetooth Speaker",
    description: "Portable waterproof Bluetooth speaker.",
    price: 59.99,
    occasions: ["verjaardag", "feesten"],
    interests: ["muziek", "reizen"],
    forWho: ["unisex"],
  },
  {
    id: "64",
    url: "https://www.example.com/product64",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Electric Skillet",
    description: "Multi-function electric skillet for versatile cooking.",
    price: 49.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["koken", "interieur"],
    forWho: ["unisex"],
  },
  {
    id: "65",
    url: "https://www.example.com/product65",
    image: "https://fakeimg.pl/350x200/?text=voorbeeld",
    title: "Leather Journal",
    description: "Handcrafted leather journal for notes and sketches.",
    price: 29.99,
    occasions: ["verjaardag", "bedankje"],
    interests: ["lezen", "reizen"],
    forWho: ["unisex"],
  },
];

// export async function GET(request: NextRequest) {
//   const users = [
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Doe" },
//   ];

//   return NextResponse.json(users);
// }

// export async function POST(request: NextRequest) {
//   const { query } = await request.json();

//   // If query is empty, return everything
//   if (!query) {
//     return NextResponse.json(allProducts);
//   }

//   // Filter products based on the query
//   const filteredProducts = allProducts.filter((product) => {
//     const matchesOccasions = query.occasions
//       ? product.occasions?.some((occasion) =>
//           query.occasions.includes(occasion)
//         )
//       : true;
//     const matchesInterests = query.interests
//       ? product.interests?.some((interest) =>
//           query.interests.includes(interest)
//         )
//       : true;
//     const matchesforWho = query.forWho
//       ? product.forWho?.some((g) => query.forWho.includes(g))
//       : true;
//     const matchesPrice = query.price
//       ? product.price >= 5 && product.price <= parseFloat(query.price[0])
//       : true;

//     return (
//       matchesOccasions && matchesInterests && matchesforWho && matchesPrice
//     );
//   });

//   // Return the filtered products
//   return NextResponse.json(filteredProducts);
// }

export async function POST(request: NextRequest) {
  try {
    const response = await axios.get(
      "https://api.partnerize.com/user/publisher/1101l356523/feed",
      {
        headers: {
          Authorization: `Basic ${process.env.PARTNERIZE_API_KEY}`,
          Cookie: "session=4b6s3jh2bcf4on9qqir5ho0gng",
        },
      }
    );

    const campaign = response.data.campaigns[0].campaign;

    console.log(campaign);

    const feed = campaign.feeds.find(
      (feed: any) => feed.feed.campaign_feeds_id === "1011l1698"
    );

    if (!feed) {
      return new NextResponse(JSON.stringify({ error: "Feed not found" }), {
        status: 404,
      });
    }

    console.log(feed);

    const csvUrl = feed.feed.location;
    // Fetch the CSV data
    const csvResponse = await axios.get(csvUrl);
    const csvData = csvResponse.data;

    // Parse the CSV data
    const parsedData = Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
    });

    console.log(parsedData.data[0]);

    // Extract and log unique product types (product_type is categoryid)
    const uniqueProductTypes: any[] = [];
    parsedData.data.forEach((product: any) => {
      if (
        product.product_type &&
        !uniqueProductTypes.includes(product.product_type)
      ) {
        uniqueProductTypes.push(product.product_type);
      }
    });

    console.log("Unique product types:", uniqueProductTypes);

    return NextResponse.json(response.data);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: error.response?.status || 500,
    });
  }
}
