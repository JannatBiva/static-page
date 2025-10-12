"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    toggleSelect,
    selectAll,
    deselectAll,
} from "@/lib/features/cart/cartSlice";
import { BsGift, BsTrash } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function CartPage() {
    const { items } = useAppSelector((s) => s.cart);
    const dispatch = useAppDispatch();
    const selectedItems = useMemo(() => items.filter((i) => i.selected), [items]);

    const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
    const detailsBtnRef = useRef<HTMLButtonElement>(null);
    const detailsPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!showDeliveryInfo) return;
        const onDown = (e: MouseEvent) => {
            const t = e.target as Node;
            if (detailsBtnRef.current?.contains(t) || detailsPanelRef.current?.contains(t)) return;
            setShowDeliveryInfo(false);
        };
        const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setShowDeliveryInfo(false);
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onEsc);
        };
    }, [showDeliveryInfo]);

    const computedDiscount = selectedItems.reduce((sum, it) => {
        const orig = it.compareAtPrice ?? it.price;
        const disc = Math.max(0, orig - it.price);
        return sum + disc * it.qty;
    }, 0);

    const subTotal = selectedItems.reduce((sum, it) => sum + it.price * it.qty, 0);
    const VAT = 0;
    const deliveryCharge = 150;
    const totalPayable = subTotal + VAT + deliveryCharge;

    if (!items.length) {
        return (
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
                <h1 className="text-2xl font-semibold mb-6">My Cart</h1>
                <div className="p-10 text-center rounded-lg bg-white shadow-lg">
                    Your cart is empty 🛍️
                    <div className="mt-4">
                        <Link href="/" className="text-brand-green underline hover:brightness-95">
                            Continue shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const allSelected = items.length > 0 && items.every((i) => i.selected);

    return (
        <div className="w-full max-w-none px-2 md:px-4 lg:px-6 py-8 md:py-10">
            <h1 className="text-2xl font-semibold mb-6">My Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                <div className="lg:col-span-8">
                    <div className="rounded-xl bg-zinc-50 shadow-2xl shadow-black/10">

                        <div className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-2 mt-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-brand-green text-sm font-semibold">
                                    WP
                                </div>
                                <div className="font-semibold">{items[0]?.vendor ?? "Wetopian Partnership"}</div>
                            </div>

                            <label className="flex items-center gap-2 text-sm text-zinc-700">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 [appearance:auto] accent-brand-green focus:ring-2 focus:ring-brand-green/30"
                                    checked={allSelected}
                                    onChange={(e) => (e.target.checked ? dispatch(selectAll()) : dispatch(deselectAll()))}
                                />
                                Select all
                            </label>
                        </div>


                        <div className="relative px-5 py-3 flex items-center justify-between text-sm text-zinc-600">
                            <span>Product(s) details</span>
                            <span className="pr-1">Price</span>
                            <span className="pointer-events-none absolute bottom-0 left-5 right-5 h-px bg-zinc-500" />
                        </div>


                        <ul>
                            {items.map((it) => {
                                const orig = it.compareAtPrice ?? it.price;
                                const hasDiscount = orig > it.price;
                                const pct = it.discountPct ?? (hasDiscount ? Math.round(((orig - it.price) / orig) * 100) : 0);

                                return (
                                    <li
                                        key={it.id}
                                        className="
                      relative px-5 py-5
                      after:content-[''] after:pointer-events-none
                      after:absolute after:bottom-0 after:left-5 after:right-5
                      after:h-px after:bg-zinc-200 last:after:hidden
                    "
                                    >

                                        <div className="flex gap-4">
                                            <div className="flex items-start gap-3 shrink-0">
                                                <div className="pt-1">
                                                    <input
                                                        type="checkbox"
                                                        aria-label="Select item"
                                                        className="h-4 w-4 [appearance:auto] accent-brand-green focus:ring-2 focus:ring-brand-green/30"
                                                        checked={!!it.selected}
                                                        onChange={() => dispatch(toggleSelect(it.id))}
                                                    />
                                                </div>

                                                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-md border">
                                                    {it.imageUrl ? (
                                                        <Image
                                                            src={it.imageUrl}
                                                            alt={it.title}
                                                            width={112}
                                                            height={112}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full bg-zinc-100" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="min-w-0 flex-1">

                                                <Link
                                                    href={`/news/${it.id}`}
                                                    className="block text-lg font-medium hover:underline line-clamp-1"
                                                    title={it.title}
                                                >
                                                    {it.title}
                                                </Link>


                                                <div className="mt-2 flex flex-wrap items-center gap-3">
                                                    {pct > 0 && (
                                                        <span className="text-xs rounded-md border px-2 py-1 border-brand-green text-brand-green">
                                                            -{pct}%
                                                        </span>
                                                    )}

                                                    <div className="inline-flex items-center rounded-md border">
                                                        <button
                                                            className="px-3 py-1.5 text-lg"
                                                            onClick={() => dispatch(decreaseQty(it.id))}
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <FiMinus className="text-zinc-600" />
                                                        </button>
                                                        <span className="px-3 select-none">{it.qty}</span>
                                                        <button
                                                            className="px-3 py-1.5 text-lg"
                                                            onClick={() => dispatch(increaseQty(it.id))}
                                                            aria-label="Increase quantity"
                                                        >
                                                            <FiPlus className="text-zinc-600" />
                                                        </button>
                                                    </div>

                                                    <div className="ml-auto flex items-baseline gap-2">
                                                        {hasDiscount && <span className="text-zinc-400 line-through">{orig.toFixed(0)} ৳</span>}
                                                        <span className="text-lg font-semibold">{it.price.toFixed(0)} ৳</span>
                                                    </div>
                                                </div>

                                                <button
                                                    className="mt-3 text-zinc-500 hover:text-red-600"
                                                    onClick={() => dispatch(removeFromCart(it.id))}
                                                    aria-label="Remove item"
                                                    title="Remove"
                                                >
                                                    <BsTrash size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <aside className="lg:col-span-4">
                    <div className="rounded-xl bg-white p-4 shadow-2xl shadow-black/10 sticky top-20">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-3 text-sm">
                            <Row label="Total discount" value={`- ৳ ${computedDiscount.toFixed(2)}`} />
                            <Row label="Sub total" value={`৳ ${subTotal.toFixed(2)}`} />
                            <Row label="Total VAT" value={`৳ ${VAT.toFixed(2)}`} />

                            <Row
                                label={
                                    <span className="relative inline-flex items-center gap-1">
                                        <span>Delivery charge</span>
                                        <button
                                            ref={detailsBtnRef}
                                            type="button"
                                            className="text-brand-green underline underline-offset-2 hover:brightness-95"
                                            aria-haspopup="dialog"
                                            aria-expanded={showDeliveryInfo}
                                            onClick={() => setShowDeliveryInfo((v) => !v)}
                                        >
                                            (see details)
                                        </button>

                                        {showDeliveryInfo && (
                                            <div
                                                ref={detailsPanelRef}
                                                role="dialog"
                                                aria-label="Delivery charge details"
                                                className="absolute z-40 top-full mt-2 right-0 w-64 rounded-lg bg-white shadow-xl ring-1 ring-black/5 p-3 text-sm"
                                            >
                                                <span
                                                    aria-hidden
                                                    className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-white ring-1 ring-black/5"
                                                />
                                                <table className="w-full text-left text-zinc-700">
                                                    <thead className="text-zinc-500">
                                                        <tr>
                                                            <th className="py-1.5 px-2">
                                                                Delivery<br />charge
                                                            </th>
                                                            <th className="py-1.5 px-2 text-right">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="py-1.5 px-2">Base charge</td>
                                                            <td className="py-1.5 px-2 text-right">৳ {deliveryCharge.toFixed(0)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-1.5 px-2 font-medium">Total delivery charge</td>
                                                            <td className="py-1.5 px-2 text-right font-medium">৳ {deliveryCharge.toFixed(0)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </span>
                                }
                                value={`৳ ${deliveryCharge.toFixed(2)}`}
                            />

                            <hr className="my-2" />
                            <Row
                                label={<span className="font-semibold">Total payable</span>}
                                value={<span className="font-semibold">৳ {totalPayable.toFixed(2)}</span>}
                            />
                        </div>

                        <button
                            className="mt-5 w-full rounded-lg bg-brand-green text-white py-3 font-medium hover:brightness-95"
                            onClick={() => alert("Proceed to checkout")}
                        >
                            Check Out ({selectedItems.reduce((n, i) => n + i.qty, 0)} item
                            {selectedItems.reduce((n, i) => n + i.qty, 0) > 1 ? "s" : ""})
                        </button>

                        <button
                            className="mt-3 w-full rounded-lg border py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear Cart
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between">
            <div className="text-zinc-600">{label}</div>
            <div>{value}</div>
        </div>
    );
}
