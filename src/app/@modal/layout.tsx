"use client";

import {usePathname} from "next/navigation";
import { ReactNode } from "react";

export default function Layout({children}:{children: ReactNode}) {
  const pathname = usePathname();
  return pathname.startsWith("/signup") || pathname.startsWith("/login") ? children: null;
}