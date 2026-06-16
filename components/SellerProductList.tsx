import sql  from '@/lib/db'
import { deleteProduct } from '@/app/lib/actions';
import { getSellerProducts } from '@/app/lib/actions';

export default async function SellerProductList({ userId }: { userId: string }) {
  const products = await getSellerProducts(userId)

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow mt-6">
      <table className="w-full border-collapse text-left text-sm text-black">
        <thead className="bg-neutral-100 text-neutral-700">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Action</th> 
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-neutral-200">
              <td className="px-4 py-3">{product.id}</td>
              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3">${Number(product.price).toFixed(2)}</td>
              <td className="px-4 py-3">
                
                <form action={deleteProduct.bind(null, product.id)}>
                  <button
                    type="submit"
                    className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}