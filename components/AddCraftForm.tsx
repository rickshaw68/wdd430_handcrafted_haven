'use client'; // Ensure this is a client component
import { addProduct } from '@/app/lib/actions';
import SellerProductList from '@/components/SellerProductList';

export default function AddCraftForm({ userId, children }: { userId: string, children: React.ReactNode }) {
  
  async function handleSubmit(formData: FormData) {
    const result = await addProduct(userId, formData);
    
    if (result?.error) {
      alert(result.error);
    } else {
      alert("Product added successfully!");
    }
  }

  return (
    <>
      <form action={handleSubmit} className="grid gap-4 bg-white p-6 shadow rounded-lg text-black">
        <input name="name" placeholder="Product Name" className="border p-2 rounded" required />
        <div className="flex gap-4">
          <input name="price" type="number" placeholder="Price" className="border p-2 rounded" required />
          <div className="flex flex-col flex-1 gap-1">
            <input name="category" placeholder="Category" className="border p-2 rounded" required />
          </div>
          <input name="rating" type="number" step="0.1" placeholder="Rating" className="border p-2 rounded" required />
        </div>
        <input name="image" placeholder="Image URL" className="border p-2 rounded" required />
        <textarea name="description" placeholder="Description" className="border p-2 rounded" required />
        
        <button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">
          Add Product
        </button>
      </form>
      <div className="mt-8 border-t pt-8">
        {children}
      </div>
     
    </>
  );
}