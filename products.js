const productsData = [
    {
        id: "MGR001",
        name: "Classic Gold Band",
        category: "mens",
        subcategory: "gold_rings",
        price: 350,
        description: "A timeless 22K gold band for men, perfect for daily wear or special occasions. Smooth finish and comfortable fit.",
        specifications: {
            material: "22K Gold",
            weight: "8 grams",
            width: "5mm",
            finish: "Polished",
            sizes_available: ["8", "9", "10", "11", "12"]
        },
        images: [
            "assets/images/mens/gold_rings/mgr001_main.jpg", // Example: You'll need to create mgr001_main.jpg
            "assets/images/mens/gold_rings/mgr001_angle.jpg",
            "assets/images/general/placeholder.jpg" // Fallback
        ],
        videos: [
            "assets/videos/mens/gold_rings/mgr001_showcase.mp4" // Example: You'll need to create this video file
        ],
        tags: ["gold", "ring", "men", "classic", "band", "wedding"],
        stock: 15,
        featured: true
    },
    {
        id: "WNE002", // Matched from your static example
        name: "Silver Swirl Necklace",
        category: "womens",
        subcategory: "necklaces",
        price: 150,
        description: "A beautiful silver necklace with an intricate swirl design, perfect for any occasion.",
        specifications: {
            material: "Sterling Silver",
            chain_length: "16 inches",
            finish: "High Polish"
        },
        images: [
            "assets/images/womens/necklaces/wne002_main.jpg", // Create wne002_main.jpg
            "assets/images/womens/necklaces/wne002_detail.jpg",
            "assets/images/general/placeholder.jpg"
        ],
        videos: [],
        tags: ["silver", "necklace", "women", "swirl", "everyday"],
        stock: 20,
        featured: true
    },
    {
        id: "WER001", // Matched from your static example
        name: "Gold Hoop Earrings",
        category: "womens",
        subcategory: "earrings",
        price: 250,
        description: "Elegant gold hoop earrings, a classic design for a sophisticated look.",
        specifications: {
            material: "18K Gold Plated",
            diameter: "30mm",
            type: "Hoop"
        },
        images: [
            "assets/images/womens/earrings/wer001_main.jpg", // Create wer001_main.jpg
            "assets/images/womens/earrings/wer001_side.jpg",
            "assets/images/general/placeholder.jpg"
        ],
        videos: [],
        tags: ["gold", "earrings", "women", "hoop", "classic"],
        stock: 12,
        featured: false
    },
    {
        id: "WBR001", // Example new ID for Pearl Bracelet
        name: "Pearl Bracelet",
        category: "womens",
        subcategory: "bracelets",
        price: 180,
        description: "A delicate pearl bracelet, adding a touch of sophistication.",
        specifications: {
            material: "Freshwater Pearls, Sterling Silver Clasp",
            length: "7.5 inches",
            pearl_size: "6-7mm"
        },
        images: [
            "assets/images/womens/bracelets/wbr001_main.jpg", // Create wbr001_main.jpg
            "assets/images/general/placeholder.jpg"
        ],
        videos: [],
        tags: ["pearl", "bracelet", "women", "classic", "elegant"],
        stock: 0, // Example: Out of stock
        featured: true
    },
    {
        id: "WRI001", // Example new ID for Diamond Ring
        name: "Diamond Solitaire Ring",
        category: "womens",
        subcategory: "rings",
        price: 500,
        description: "A sparkling diamond solitaire ring, a timeless symbol of love.",
        specifications: {
            material: "14K White Gold, 0.5 Carat Diamond",
            diamond_clarity: "SI1",
            diamond_color: "G",
            sizes_available: ["5", "6", "7", "8"]
        },
        images: [
            "assets/images/womens/rings/wri001_main.jpg", // Create wri001_main.jpg
            "assets/images/womens/rings/wri001_detail.jpg",
            "assets/images/general/placeholder.jpg"
        ],
        videos: [],
        tags: ["diamond", "ring", "women", "solitaire", "engagement"],
        stock: 5,
        featured: false
    }
];
