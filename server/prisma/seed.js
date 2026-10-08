import "dotenv/config";
import { PrismaClient } from "../src/generated/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Starting database seed...");

  // Create the owner first
  const user = await prisma.user.upsert({
    where: {
      email: "demo@estatehub.com",
    },
    update: {},
    create: {
      name: "EstateHub Demo",
      email: "demo@estatehub.com",
      password: "demo123",
    },
  });

  console.log(`User created: ${user.email}`);

  // Create properties owned by the user
  const properties = [
    {
      title: "Modern Family Villa",
      location: "Bole, Addis Ababa",
      type: "Villa",
      purpose: "Sale",
      price: 8500000,
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      description:
        "A spacious modern family villa in a desirable area of Bole.",
      ownerId: user.id,
    },
    {
      title: "Luxury City Apartment",
      location: "Kazanchis, Addis Ababa",
      type: "Apartment",
      purpose: "Rent",
      price: 85000,
      bedrooms: 3,
      bathrooms: 2,
      area: 140,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      description:
        "A modern luxury apartment located in the heart of Kazanchis.",
      ownerId: user.id,
    },
    {
      title: "Cozy Two Bedroom Apartment",
      location: "CMC, Addis Ababa",
      type: "Apartment",
      purpose: "Rent",
      price: 45000,
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      description:
        "A comfortable two-bedroom apartment suitable for a small family.",
      ownerId: user.id,
    },
    {
      title: "Spacious Family House",
      location: "Gerji, Addis Ababa",
      type: "House",
      purpose: "Sale",
      price: 6200000,
      bedrooms: 5,
      bathrooms: 3,
      area: 300,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      description:
        "A spacious family house with a large living area and garden.",
      ownerId: user.id,
    },
    {
      title: "Modern Studio Apartment",
      location: "Sarbet, Addis Ababa",
      type: "Apartment",
      purpose: "Rent",
      price: 30000,
      bedrooms: 1,
      bathrooms: 1,
      area: 55,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      description:
        "A modern studio apartment ideal for a single professional.",
      ownerId: user.id,
    },
    {
      title: "Elegant Premium Villa",
      location: "Old Airport, Addis Ababa",
      type: "Villa",
      purpose: "Sale",
      price: 12500000,
      bedrooms: 6,
      bathrooms: 4,
      area: 420,
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      description:
        "An elegant premium villa with spacious rooms and high-quality finishes.",
      ownerId: user.id,
    },
  ];

  for (const property of properties) {
    await prisma.property.create({
      data: property,
    });
  }

  console.log(`${properties.length} properties added successfully.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });