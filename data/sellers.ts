type Seller = {
    id: number
    name: string
    rating: number
    description: string
    logo: string
    location: string
    date: string
    sales: number
}

export const sellers: Seller[] = [
    {
        id: 1,
        name: "CozyCrafts",
        rating: 4.5,
        description: "Cozy in our name, cozy in our products. We specialize in soft, high-quality yarns made from the finiest selections and materials. Our yarn is selctively sourced from sustainable farms and carefully crafted to ensure a luxurious feel and vibrant colors. Whether you're knitting a cozy sweater or crocheting a warm blanket, our yarn will provide the perfect touch of comfort and style to your handmade creations. Leave us a review and let us share in favorite projects using our yarn together. Let us know how our yarn has inspired your crafting journey!",
        logo: "/images/logos/cozycrafts.webp",
        location: "New York, NY USA",
        date: "January 2020",
        sales: 602,
    },
    {
        id: 2,
        name: "ColorfulCreations",
        rating: 4.8,
        description: "Bringing vibrant colors to your everyday life. We are passionate about creating colorful and unique yarns that inspire creativity and add a pop of color to your crafting projects. Our yarns are carefully hand-dyed in small batches to ensure rich, vibrant colors that will make your creations stand out. Whether you're knitting a cozy scarf or crocheting a colorful blanket, our yarns will bring your projects to life with their bold and beautiful hues. We take pride in our commitment to quality and customer satisfaction, and we can't wait to see the amazing creations you make with our yarns! Leave us a review on our page or visit our website to share your colorful creations with us!",
        logo: "/images/logos/colorfulcreations.webp",
        location: "Los Angeles, CA USA",
        date: "March 2019",
        sales: 1538,
    },
    {
        id: 3,
        name: "BrushMasters",
        rating: 4.9,
        description: "Premium brushes for artists and crafters. We are dedicated to providing true artists and master crafters with the highest quality brushes that enhance and elevate their creative experience. Our brushes are meticulously crafted using premium materials, ensuring exceptional performance and durability. Whether you're a professional artist or a passionate hobbyist, our brushes will help you achieve precise strokes and vibrant colors in your artwork. We take pride in our commitment to customer satisfaction and strive to provide excellent service. Leave us a review here and share your artistic creations with us!",
        logo: "/images/logos/brushmasters.webp",
        location: "Chicago, IL USA",
        date: "June 2018",
        sales: 2054,
    }
];