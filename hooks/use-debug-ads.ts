"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const COOKIE_NAME = "console_debug";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function useDebugAds() {
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const param = searchParams.get("console_debug");

    if (param === "1") {
      setCookie(COOKIE_NAME, "1", 30);
      setEnabled(true);
    } else if (param === "0") {
      deleteCookie(COOKIE_NAME);
      setEnabled(false);
    } else {
      setEnabled(getCookie(COOKIE_NAME) === "1");
    }
  }, [searchParams]);

  return enabled;
}
