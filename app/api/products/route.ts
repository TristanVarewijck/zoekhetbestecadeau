// app/api/users/route.js

import { ProductProps } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

const allProducts: ProductProps[] = [
  {
    id: "1",
    url: "https://www.example.com/product1",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation.",
    price: 59.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["muziek", "tech"],
    gender: ["unisex"],
  },
  {
    id: "2",
    url: "https://www.example.com/product2",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Yoga Mat",
    description: "Eco-friendly yoga mat for all types of workouts.",
    price: 29.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["sport", "natuur"],
    gender: ["vrouwelijk"],
  },
  {
    id: "3",
    url: "https://www.example.com/product3",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Smart Watch",
    description: "Track your fitness and stay connected with this smartwatch.",
    price: 199.99,
    occasions: ["verjaardag", "bedankje"],
    interests: ["sport", "tech"],
    gender: ["mannelijk"],
  },
  {
    id: "4",
    url: "https://www.example.com/product4",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Cookbook",
    description: "Delicious recipes from around the world.",
    price: 24.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["koken", "lezen"],
    gender: ["unisex"],
  },
  {
    id: "5",
    url: "https://www.example.com/product5",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with high-quality sound.",
    price: 49.99,
    occasions: ["verjaardag", "feesten"],
    interests: ["muziek", "tech"],
    gender: ["unisex"],
  },
  {
    id: "6",
    url: "https://www.example.com/product6",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Fashionable Scarf",
    description: "Stylish scarf made from premium materials.",
    price: 19.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["fashion", "interieur"],
    gender: ["vrouwelijk"],
  },
  {
    id: "7",
    url: "https://www.example.com/product7",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Travel Backpack",
    description: "Durable and spacious backpack for travel enthusiasts.",
    price: 79.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["reizen", "natuur"],
    gender: ["mannelijk"],
  },
  {
    id: "8",
    url: "https://www.example.com/product8",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "E-Reader",
    description: "Compact e-reader with a high-resolution display.",
    price: 99.99,
    occasions: ["verjaardag", "diploma"],
    interests: ["lezen", "tech"],
    gender: ["unisex"],
  },
  {
    id: "9",
    url: "https://www.example.com/product9",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Indoor Plant",
    description: "Beautiful indoor plant to brighten up any space.",
    price: 15.99,
    occasions: ["housewarming", "bedankje"],
    interests: ["interieur", "natuur"],
    gender: ["unisex"],
  },
  {
    id: "10",
    url: "https://www.example.com/product10",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Wine Glass Set",
    description: "Elegant wine glass set perfect for any occasion.",
    price: 34.99,
    occasions: ["verjaardag", "housewarming"],
    interests: ["feesten", "interieur"],
    gender: ["unisex"],
  },
  {
    id: "11",
    url: "https://www.example.com/product11",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Running Shoes",
    description: "Comfortable running shoes for all types of runners.",
    price: 89.99,
    occasions: ["verjaardag", "bedankje"],
    interests: ["sport", "fashion"],
    gender: ["mannelijk"],
  },
  {
    id: "12",
    url: "https://www.example.com/product12",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Laptop Stand",
    description: "Ergonomic laptop stand to improve your workspace.",
    price: 39.99,
    occasions: ["diploma", "pensioen"],
    interests: ["tech", "interieur"],
    gender: ["unisex"],
  },
  {
    id: "13",
    url: "https://www.example.com/product13",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Gourmet Chocolate Box",
    description: "Delicious assortment of gourmet chocolates.",
    price: 24.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["koken", "feesten"],
    gender: ["unisex"],
  },
  {
    id: "14",
    url: "https://www.example.com/product14",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Electric Toothbrush",
    description: "Advanced electric toothbrush for a cleaner smile.",
    price: 49.99,
    occasions: ["verjaardag", "housewarming"],
    interests: ["tech", "interieur"],
    gender: ["unisex"],
  },
  {
    id: "15",
    url: "https://www.example.com/product15",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Board Game",
    description: "Fun and engaging board game for all ages.",
    price: 29.99,
    occasions: ["verjaardag", "housewarming"],
    interests: ["feesten", "lezen"],
    gender: ["unisex"],
  },
  {
    id: "16",
    url: "https://www.example.com/product16",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Wireless Charger",
    description: "Fast and convenient wireless charger for your devices.",
    price: 29.99,
    occasions: ["diploma", "bedankje"],
    interests: ["tech", "interieur"],
    gender: ["unisex"],
  },
  {
    id: "17",
    url: "https://www.example.com/product17",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Perfume",
    description: "Exquisite perfume with a long-lasting fragrance.",
    price: 69.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["fashion", "interieur"],
    gender: ["vrouwelijk"],
  },
  {
    id: "18",
    url: "https://www.example.com/product18",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Electric Kettle",
    description: "Fast-boiling electric kettle with temperature control.",
    price: 39.99,
    occasions: ["housewarming", "verjaardag"],
    interests: ["koken", "tech"],
    gender: ["mannelijk"],
  },
  {
    id: "19",
    url: "https://www.example.com/product19",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Fitness Tracker",
    description: "Track your fitness goals with this advanced fitness tracker.",
    price: 79.99,
    occasions: ["verjaardag", "sportdag"],
    interests: ["sport", "tech"],
    gender: ["vrouwelijk"],
  },
  {
    id: "20",
    url: "https://www.example.com/product20",
    image: "https://fakeimg.pl/350x200/?text=product_image",
    title: "Candle Set",
    description: "Scented candle set to create a cozy atmosphere.",
    price: 19.99,
    occasions: ["verjaardag", "jubileum"],
    interests: ["interieur"],
    gender: ["unisex"],
  },
];

export async function GET(request: NextRequest) {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  console.log(query);

  // If query is empty, return everything
  if (!query) {
    return NextResponse.json(allProducts);
  }

  // Filter products based on the query
  const filteredProducts = allProducts.filter((product) => {
    const matchesOccasions = query.occasions
      ? product.occasions?.some((occasion) =>
          query.occasions.includes(occasion)
        )
      : true;
    const matchesInterests = query.interests
      ? product.interests?.some((interest) =>
          query.interests.includes(interest)
        )
      : true;
    const matchesGender = query.gender
      ? product.gender?.some((g) => query.gender.includes(g))
      : true;
    const matchesPrice = query.price
      ? product.price >= 5 && product.price <= parseFloat(query.price[0])
      : true;

    return (
      matchesOccasions && matchesInterests && matchesGender && matchesPrice
    );
  });

  // Return the filtered products
  return NextResponse.json(filteredProducts);
}
