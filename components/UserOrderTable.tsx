export default function UserOrderTable({ orders, onAction }: { orders: any[], onAction: (id: number, action: any) => void }) {
  return (
    <table className="w-full text-left text-black">
      <thead>
        <tr className="border-b">
          <th className="py-2">Product</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-b">
            <td className="py-2">{order.productName}</td>
            <td>{order.quantity}</td>
            <td>{order.status}</td>
            <td>{order.total}</td>
            <td className="flex gap-2">
              {order.status === 'Pending' && (
                <>
                  <button onClick={() => onAction(order.id, 'Confirmed')} className="bg-cyan-600 hover:bg-cyan-700 text-xs text-white px-4 py-2 rounded cursor-pointer transition-colors duration-200">Accept</button>
                  <button onClick={() => onAction(order.id, 'Cancelled')} className="bg-gray-500 hover:bg-gray-600 text-xs text-white px-4 py-2 rounded cursor-pointer transition-colors duration-200">Cancel</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}