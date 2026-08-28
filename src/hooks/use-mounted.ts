"use client";

import { useEffect, useState } from "react";

/** False during SSR and the first client paint. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
