'use client';

import { cn } from "@/lib/utils"
import Image from "next/image";


const Logo = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <img
    src="/logo.png"
    alt="QAIU Logo"
    className={className}
    style={{ height: 40, ...style }}
    draggable={false}
  />
);

export default Logo;