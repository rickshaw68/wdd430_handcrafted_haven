import { NextResponse } from "next/server";
import { deleteProduct } from "@/app/lib/products";

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string}> }
) {
    try {
        const { id } = await params;
        const deletedProduct = await deleteProduct(Number(id));

        if (!deletedProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Product deleted successfully" });

    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: 500 }
        );        
    }
}