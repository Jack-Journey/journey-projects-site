"use client";

import { useEffect, useCallback } from "react";

const SCROLL_KEY = "jp-scroll-y";

export function useScrollSave() {
  return useCallback(() => {
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
  }, []);
}

export function ScrollRestorer() {
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      sessionStorage.removeItem(SCROLL_KEY);
      const y = parseInt(saved, 10);
      if (!isNaN(y)) {
        window.scrollTo(0, y);
      }
    }
  }, []);

  return null;
}
