// components/OrderTable.tsx
export default function OrderTable({ orders, onAction }: { orders: any[], onAction: (id: number, action: any) => void }) {
  return (
    <table className="w-full text-left text-black">
      {orders.map(order => (
        <tr key={order.id}>
           <td>{order.productName}</td>
           <td>{order.status}</td>
           <td>
             <button onClick={() => onAction(order.id, 'Confirmed')}>Accept</button>
           </td>
        </tr>
      ))}
    </table>
  );
}