import "server-only";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  seller: string;
  seller_id: number;
  description: string;
};

export async function getProducts(): Promise<Product[]> {
  const products = await sql<Product[]>`
    SELECT id, name, price::float AS price, category, rating::float AS rating, image, seller, seller_id, description
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
export async function getProduct(id: number): Promise<Product | null> {
  const result = await sql<Product[]>`
    SELECT
      id,
      name,
      price,
      category,
      rating,
      image,
      seller,
      seller_id,
      description
    FROM products
    WHERE id = ${id}
  `;

  return result[0] ?? null;
}

export async function getProductsByCategory(
  category: string,
  excludeId: number
): Promise<Product[]> {
  return sql<Product[]>`
    SELECT *
    FROM products
    WHERE category = ${category}
      AND id != ${excludeId}
    LIMIT 4
  `;
}