import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export async function getProducts() {
  const products = await sql`
    SELECT
      id,
      name,
      price::float AS price,
      category,
      rating::float AS rating,
      image,
      seller,
      seller_id AS "sellerId",
      description
    FROM products
    ORDER BY id;
  `;

  return products;
}

export async function addProduct(product: {
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  seller: string;
  sellerId: number;
  description: string;
}) {
  const result = await sql`
    INSERT INTO products
      (name, price, category, rating, image, seller, seller_id, description)
    VALUES
      (
        ${product.name},
        ${product.price},
        ${product.category},
        ${product.rating},
        ${product.image},
        ${product.seller},
        ${product.sellerId},
        ${product.description}
      )
    RETURNING
      id,
      name,
      price::float AS price,
      category,
      rating::float AS rating,
      image,
      seller,
      seller_id AS "sellerId",
      description;
  `;

  return result[0];
}

export async function deleteProduct(id: number) {
  const result = await sql`
    DELETE FROM products
    WHERE id = ${id}
    RETURNING id;
  `;

  return result[0];
}