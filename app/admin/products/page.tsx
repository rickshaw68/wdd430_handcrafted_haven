"use client";

import { useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    rating: number;
    image: string;
    seller: string;
    sellerId: number;
    description: string;
};

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        rating: "",
        image: "",
        seller: "",
        sellerId: "",
        description: "",
  });

    async function loadProducts() {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newProduct = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        rating: Number(formData.rating),
        image: formData.image,
        seller: formData.seller,
        sellerId: Number(formData.sellerId),
        description: formData.description,
        };

        const response = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
        });

        const createdProduct = await response.json();

        if (!response.ok) {
            alert(createdProduct.error || "Failed to add product");
            return;
        }

        setProducts((currentProducts) => [...currentProducts, createdProduct]);

        setFormData({
        name: "",
        price: "",
        category: "",
        rating: "",
        image: "",
        seller: "",
        sellerId: "",
        description: "",
        });
    }

  async function handleDelete(id: number) {
        const confirmed = confirm("Are you sure you want to delete this product?");

        if (!confirmed) return;

        await fetch(`/api/products/${id}`, {
        method: "DELETE",
        });

        setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id)
        );
    }

    if (isLoading) {
        return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <p>Loading products...</p>
        </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-bold text-neutral-900">
            Product Admin
        </h1>

        <p className="mb-8 text-neutral-600">
            Manage products stored in the Neon database.
        </p>

        <form
            onSubmit={handleSubmit}
            className="mb-8 grid gap-4 rounded-2xl bg-white p-6 shadow md:grid-cols-2"
        >
            <input
            type="text"
            placeholder="Product name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-black"
            required
            />

            <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-black"
            required
            />

            <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
            }
            className="rounded-lg border border-neutral-300 px-4 py-2 text-black"
            required
            />

            <input
            type="number"
            placeholder="Rating"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-black"
            required
            />

            <input
            type="text"
            placeholder="Image path"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-black"
            required
            />

            <input
            type="text"
            placeholder="Seller"
            value={formData.seller}
            onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-black"
            required
            />

            <input
            type="number"
            placeholder="Seller ID"
            value={formData.sellerId}
            onChange={(e) =>
                setFormData({ ...formData, sellerId: e.target.value })
            }
            className="rounded-lg border border-neutral-300 px-4 py-2 text-black"
            required
            />

            <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
            }
            className="rounded-lg border border-neutral-300 px-4 py-2 md:col-span-2 text-black"
            required
            />

            <button
            type="submit"
            className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white hover:bg-cyan-600 md:col-span-2"
            >
            Add Product
            </button>
        </form>

        <div className="overflow-x-auto rounded-2xl bg-white shadow">
            <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-neutral-100 text-neutral-700">
                <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Seller</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Action</th>
                </tr>
            </thead>

            <tbody>
                {products.map((product) => (
                <tr key={product.id} className="border-t border-neutral-200 text-black">
                    <td className="px-4 py-3">{product.id}</td>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{product.seller}</td>
                    <td className="px-4 py-3">${Number(product.price).toFixed(2)}</td>
                    <td className="px-4 py-3">{product.rating}</td>
                    <td className="px-4 py-3">
                    <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </main>
    );
}