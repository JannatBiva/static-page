import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = { id: string | number; title: string; price: number; imageUrl?: string; compareAtPrice?: number; discountPct?: number; vendor?: string };
export type CartItem = Product & { qty: number; selected: boolean };
export type CartState = { items: CartItem[]; totalQty: number; totalPrice: number };

const initialState: CartState = { items: [], totalQty: 0, totalPrice: 0 };

const recalc = (s: CartState) => {
    s.totalQty = s.items.reduce((n, i) => n + i.qty, 0);
    s.totalPrice = s.items.reduce((n, i) => n + i.qty * i.price, 0);
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        hydrate(state, action: PayloadAction<CartState>) {
            state.items = action.payload.items ?? [];
            recalc(state);
        },
        addToCart(state, action: PayloadAction<Product>) {
            const p = action.payload;
            const found = state.items.find(i => i.id === p.id);
            if (found) {
                found.qty += 1;
            } else {
                state.items.push({ ...p, qty: 1, selected: true }); // 👈 selected
            }
            recalc(state);
        },
        toggleSelect(state, action: PayloadAction<string | number>) {
            const it = state.items.find(i => i.id === action.payload);
            if (it) it.selected = !it.selected;
        },
        selectAll(state) {
            state.items.forEach(i => (i.selected = true));
        },
        deselectAll(state) {
            state.items.forEach(i => (i.selected = false));
        },
        removeFromCart(state, action: PayloadAction<string | number>) {
            state.items = state.items.filter(i => i.id !== action.payload);
            recalc(state);
        },
        increaseQty(state, action: PayloadAction<string | number>) {
            const it = state.items.find(i => i.id === action.payload);
            if (it) it.qty += 1;
            recalc(state);
        },
        decreaseQty(state, action: PayloadAction<string | number>) {
            const it = state.items.find(i => i.id === action.payload);
            if (!it) return;
            it.qty -= 1;
            if (it.qty <= 0) state.items = state.items.filter(i => i.id !== action.payload);
            recalc(state);
        },
        clearCart(state) {
            state.items = [];
            recalc(state);
        },
    },
});

export const { hydrate, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, toggleSelect, selectAll,deselectAll, } =
    cartSlice.actions;
export default cartSlice.reducer;

