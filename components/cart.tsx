import { useState } from 'react';
import { CartContext } from './context';

export default function Cart() {
    const [cartItems, setCartItems] = useState(CartContext.selectedItems);
}