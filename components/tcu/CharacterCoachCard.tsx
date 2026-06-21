"use client";

import { useState } from "react";

export type CharacterCoachCardProps = {
  name: string;
  role: string;
  description: string;
  imageSrc?: string;
  accent?: "violet" | "amber" | "emerald" | "rose" | "cyan" | "indigo" | "orange" | "slate" | "blue";
  compact?: boolean;
};

const ACCENT_STYLES: Record<NonNullable<CharacterCoachCardProps["accent"]>, string> = {
  violet: "border-violet-500/30 bg-violet-500/8 text-violet-100",
  amber: "border-amber-500/30 bg-amber-500/8 text-amber-100",
  emerald: "border-emerald-500/30 bg-emerald-500/8 text-emerald-100",
  rose: "border-rose-500/30 bg-rose-500/8 text-rose-100",
  cyan: "border-cyan-500/30 bg-cyan-500/8 text-cyan-100",
  indigo: "border-indigo-500/30 bg-indigo-500/8 text-indigo-100",
  orange: "border-orange-500/30 bg-orange-500/8 text-orange-100",
  blue: "border-blue-500/30 bg-blue-500/8 text-blue-100",
  slate: "border-white/10 bg-slate-900/70 text-slate-100",
};

export const CHARACTER_IMAGE_SOURCES: Record<string, string> = {
  "Chef Goldie": "/tcu/characters/chef-goldie.svg",
  "Louie the Liquidity Chef": "/tcu/characters/louie-liquidity-chef.svg",
  "Louie Liquidity": "/tcu/characters/louie-liquidity-chef.svg",
  "Candle Kid": "/tcu/characters/candle-kid.svg",
  Wickie: "/tcu/characters/candle-kid.svg",
  "Melissa Mayhem": "/tcu/characters/melissa-mayhem.svg",
  "Melody Mayhem": "/tcu/characters/melissa-mayhem.svg",
  "Grandma Market": "/tcu/characters/grandma-market.svg",
  "Nana Value": "/tcu/characters/penny-the-saver.svg",
  "Trading Chef / Chef Maurice": "/tcu/brand/ms-logo.svg",
  "Trading Chef": "/tcu/brand/ms-logo.svg",
  "Chef Maurice": "/tcu/brand/ms-logo.svg",
};

export const BRAND_IMAGE_SOURCES = {
  logo: "/tcu/brand/ms-logo.svg",
  crown: "/tcu/brand/ms-crown.png",
};

export function getCharacterImageSource(name: string) {
  return CHARACTER_IMAGE_SOURCES[name];
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function CharacterCoachCard({
  name,
  role,
  description,
  imageSrc,
  accent = "slate",
  compact = false,
}: CharacterCoachCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const resolvedAccent = ACCENT_STYLES[accent] ?? ACCENT_STYLES.slate;
  const resolvedImage = imageSrc && !imageFailed ? imageSrc : undefined;

  return (
    <div className={`rounded-xl border p-3 ${resolvedAccent} ${compact ? "min-w-[180px] max-w-[220px]" : ""}`}>
      <div className="flex items-start gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-slate-950/80 flex items-center justify-center">
          {resolvedImage ? (
            <img
              src={resolvedImage}
              alt={name}
              className="h-full w-full object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] font-black uppercase tracking-widest text-slate-300">
              {getInitials(name) || "TCU"}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-current/80">{role}</p>
          <h4 className="mt-1 truncate text-sm font-black text-white">{name}</h4>
          <p className="mt-1 text-xs leading-5 text-slate-200/80">{description}</p>
        </div>
      </div>
    </div>
  );
}