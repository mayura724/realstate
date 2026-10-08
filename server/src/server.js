import bcrypt from "bcryptjs";
import { signToken, requireAuth } from "./lib/auth.js";
import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.post("/api/auth/register",async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const existing = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(String(password), 10);

    const user = await prisma.user.create({
      data: {
        name: String(name),
        email: String(email).toLowerCase(),
        password: hashed,
      },
    });

    const token = signToken({ id: user.id, email: user.email, name: user.name });

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Failed to register" });
  }
});



app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email: String(email).toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(String(password), user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({ id: user.id, email: user.email, name: user.name });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

app.get("/api/auth/me", requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Me error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "EstateHub server is running!",
  });
});

app.get("/api/properties", async (req, res) => {
  try {
    const { type, purpose, location, minPrice, maxPrice, minBedrooms, search } = req.query;

    const where = {};

    if (type) where.type = String(type);
    if (purpose) where.purpose = String(purpose);
    if (location) {
      where.location = { contains: String(location), mode: "insensitive" };
    }

    if (minBedrooms) {
      where.bedrooms = { gte: Number(minBedrooms) };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: "insensitive" } },
        { location: { contains: String(search), mode: "insensitive" } },
      ];
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(properties);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});



app.get("/api/properties/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch property" });
  }
});


app.post("/api/properties",requireAuth, async (req, res) => {
  try {
    const {
      title,
      location,
      type,
      purpose,
      price,
      bedrooms,
      bathrooms,
      area,
      image,
      description,
      ownerId,
    } = req.body;


    // Basic validation

    if (
  !title ||
  !location ||
  !type ||
  !purpose ||
  Number.isNaN(Number(price)) ||
  Number.isNaN(Number(bedrooms)) ||
  Number.isNaN(Number(bathrooms)) ||
  Number.isNaN(Number(area))
) {
  return res.status(400).json({
    error: "Missing or invalid property information",
  });
}

// Validate purpose value
if (!["Sale", "Rent"].includes(String(purpose))) {
  return res.status(400).json({
    error: "Purpose must be 'Sale' or 'Rent'",
  });
}

    // Temporary owner ID.
    // Later this will come from authentication.

    const finalOwnerId =
      req.user.id;


    const property =
      await prisma.property.create({
        data: {
          title: String(title),
          location: String(location),
          type: String(type),
          purpose: String(purpose),

          price: Number(price),

          bedrooms: Number(bedrooms),

          bathrooms: Number(bathrooms),

          area: Number(area),

          image:
            image
              ? String(image)
              : null,

          description:
            description
              ? String(description)
              : null,

          ownerId: finalOwnerId,
        },
      });


    console.log(
      "Property created:",
      property.id
    );


    res.status(201).json(property);

  } catch (error) {
    console.error(
      "Create property error:",
      error
    );

    res.status(500).json({
      error: "Failed to create property",
    });
  }
});




app.put("/api/properties/:id",requireAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const {
      title,
      location,
      type,
      purpose,
      price,
      bedrooms,
      bathrooms,
      area,
      image,
      description,
    } = req.body;

    // Validation
    if (
      !title ||
      !location ||
      !type ||
      !purpose ||
      Number.isNaN(Number(price)) ||
      Number.isNaN(Number(bedrooms)) ||
      Number.isNaN(Number(bathrooms)) ||
      Number.isNaN(Number(area))
    ) {
      return res.status(400).json({
        error: "Missing or invalid property information",
      });
    }

    if (!["Sale", "Rent"].includes(String(purpose))) {
      return res.status(400).json({
        error: "Purpose must be 'Sale' or 'Rent'",
      });
    }

    
    const existing = await prisma.property.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Property not found" });
    }
if (existing.ownerId !== req.user.id) {
  return res.status(403).json({
    error: "You can only edit your own properties",
  });
}

    const updated = await prisma.property.update({
      where: { id },
      data: {
        title: String(title),
        location: String(location),
        type: String(type),
        purpose: String(purpose),
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        image: image ? String(image) : null,
        description: description ? String(description) : null,
      },
    });

    console.log("Property updated:", id);
    res.json(updated);

  } catch (error) {
    console.error("Update property error:", error);
    res.status(500).json({ error: "Failed to update property" });
  }
});

app.delete("/api/properties/:id",requireAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid property ID",
      });
    }


    

    const existingProperty =
      await prisma.property.findUnique({
        where: {
          id,
        },
      });


    if (!existingProperty) {
      return res.status(404).json({
        error: "Property not found",
      });
    }

if (existingProperty.ownerId !== req.user.id) {
  return res.status(403).json({
    error: "You can only delete your own properties",
  });
}

    // Delete property

    await prisma.property.delete({
      where: {
        id,
      },
    });


    console.log(
      "Property deleted:",
      id
    );


    res.json({
      message: "Property deleted successfully",
      id,
    });

  } catch (error) {
    console.error(
      "Delete property error:",
      error
    );

    res.status(500).json({
      error: "Failed to delete property",
    });
  }
});



const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});