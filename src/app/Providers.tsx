"use client";

import { ReactNode, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { hydrate } from "@/lib/features/cart/cartSlice";
import type { RootState } from "@/lib/store";

const store = makeStore();

export default function Providers({ children }: { children: ReactNode }) {
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    try {
      const raw = localStorage.getItem("cart_state");
      if (raw) {
        const parsed = JSON.parse(raw) as RootState["cart"];
        store.dispatch(hydrate(parsed));
      }
    } catch {}

   
    const unsub = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem("cart_state", JSON.stringify(state.cart));
    });
    return unsub;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
