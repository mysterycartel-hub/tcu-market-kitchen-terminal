const CANDLES = [
  // [x, openY, closeY, highY, lowY, green?]
  // green=true → close < open in y-coords (price went UP)
  // green=false → close > open in y-coords (price went DOWN)
  { x: 130, o: 293, c: 308, h: 284, l: 318, g: false },
  { x: 154, o: 302, c: 315, h: 293, l: 323, g: false },
  { x: 178, o: 317, c: 304, h: 295, l: 326, g: true  },
  { x: 202, o: 302, c: 318, h: 293, l: 326, g: false },
  { x: 226, o: 314, c: 328, h: 305, l: 338, g: false },
  { x: 250, o: 324, c: 360, h: 316, l: 372, g: false },
  { x: 274, o: 355, c: 400, h: 346, l: 414, g: false },
  { x: 298, o: 396, c: 438, h: 388, l: 452, g: false },
  { x: 322, o: 435, c: 442, h: 426, l: 468, g: false }, // sweep low
  { x: 346, o: 444, c: 428, h: 422, l: 464, g: true  }, // rejection hammer
  { x: 370, o: 430, c: 368, h: 360, l: 448, g: true  }, // NY bullish
  { x: 394, o: 372, c: 308, h: 300, l: 380, g: true  },
  { x: 418, o: 312, c: 244, h: 234, l: 320, g: true  },
  { x: 442, o: 247, c: 280, h: 239, l: 290, g: false }, // retest
  { x: 466, o: 276, c: 228, h: 220, l: 284, g: true  },
  { x: 490, o: 230, c: 188, h: 181, l: 238, g: true  },
  { x: 514, o: 190, c: 206, h: 183, l: 215, g: false },
  { x: 538, o: 202, c: 164, h: 157, l: 210, g: true  },
  { x: 562, o: 166, c: 222, h: 158, l: 232, g: false }, // AOI pullback
  { x: 586, o: 218, c: 248, h: 212, l: 256, g: false },
  { x: 610, o: 250, c: 260, h: 243, l: 268, g: false }, // consolidation
  { x: 634, o: 262, c: 252, h: 245, l: 270, g: true  },
  { x: 658, o: 256, c: 218, h: 211, l: 263, g: true  }, // confirmation
  { x: 682, o: 221, c: 183, h: 177, l: 228, g: true  },
  { x: 706, o: 186, c: 197, h: 180, l: 206, g: false },
  { x: 730, o: 194, c: 142, h: 136, l: 201, g: true  }, // delivery
  { x: 754, o: 144, c: 108, h: 102, l: 152, g: true  },
  { x: 778, o: 110, c: 90,  h: 84,  l: 118, g: true  },
];

const CW = 14; // candle width

const PRICE_AXIS = [
  { y: 60,  label: "2010" },
  { y: 154, label: "2005" },
  { y: 248, label: "2000" },
  { y: 342, label: "1995" },
  { y: 436, label: "1990" },
  { y: 510, label: "1986" },
];

const TIME_AXIS = [
  { x: 130, label: "6:00" },
  { x: 274, label: "7:00" },
  { x: 346, label: "8:00AM" },
  { x: 490, label: "9:00" },
  { x: 634, label: "10:00" },
  { x: 778, label: "11:00" },
];

export default function PracticeChart() {
  return (
    <div className="relative w-full h-full flex flex-col bg-[#050c1a] rounded-xl border border-white/10 overflow-hidden">
      <svg
        viewBox="0 0 1200 580"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Fine grid */}
          <pattern id="fineGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(148,163,184,0.04)" strokeWidth="0.5" />
          </pattern>
          {/* Major grid */}
          <pattern id="majorGrid" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 96 0 L 0 0 0 96" fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="1200" height="580" fill="#050c1a" />
        <rect x="100" y="40" width="960" height="490" fill="url(#fineGrid)" />
        <rect x="100" y="40" width="960" height="490" fill="url(#majorGrid)" />

        {/* Watermark — low opacity */}
        <text x="530" y="230" textAnchor="middle" fill="rgba(148,163,184,0.04)" fontSize="130" fontWeight="900" letterSpacing="8">MS</text>
        <text x="530" y="310" textAnchor="middle" fill="rgba(148,163,184,0.04)" fontSize="36" fontWeight="700" letterSpacing="6">TCU MARKET KITCHEN</text>
        <text x="530" y="350" textAnchor="middle" fill="rgba(148,163,184,0.04)" fontSize="20" fontWeight="600" letterSpacing="4">Trading Chef University</text>

        {/* Price axis line */}
        <line x1="100" y1="40" x2="100" y2="530" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        {/* Time axis line */}
        <line x1="100" y1="530" x2="1060" y2="530" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

        {/* Price axis labels + horizontal grid lines */}
        {PRICE_AXIS.map(({ y, label }) => (
          <g key={label}>
            <line x1="100" y1={y} x2="1060" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4,6" />
            <text x="92" y={y + 4} textAnchor="end" fill="rgba(148,163,184,0.6)" fontSize="10" fontFamily="monospace">{label}</text>
          </g>
        ))}

        {/* Time axis labels + vertical tick marks */}
        {TIME_AXIS.map(({ x, label }) => (
          <g key={label}>
            <line x1={x + CW / 2} y1="530" x2={x + CW / 2} y2="536" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x={x + CW / 2} y="548" textAnchor="middle" fill={label === "8:00AM" ? "rgba(168,85,247,0.9)" : "rgba(148,163,184,0.5)"} fontSize="10" fontFamily="monospace" fontWeight={label === "8:00AM" ? "bold" : "normal"}>{label}</text>
          </g>
        ))}

        {/* === TCU OVERLAYS === */}

        {/* NY Breakfast Rush session band */}
        <rect x="346" y="40" width="200" height="490" fill="rgba(168,85,247,0.04)" />
        <line x1="346" y1="40" x2="346" y2="530" stroke="rgba(168,85,247,0.35)" strokeWidth="1.5" strokeDasharray="6,4" />
        <rect x="340" y="42" width="160" height="22" fill="rgba(168,85,247,0.2)" rx="3" />
        <text x="420" y="57" textAnchor="middle" fill="rgba(216,180,254,0.95)" fontSize="11" fontWeight="bold">NY Breakfast Rush 8AM</text>

        {/* Bias label */}
        <rect x="870" y="42" width="130" height="22" fill="rgba(16,185,129,0.2)" rx="3" />
        <text x="935" y="57" textAnchor="middle" fill="rgba(110,231,183,0.95)" fontSize="11" fontWeight="bold">Bias: Bullish</text>

        {/* Support line (below sweep) */}
        <line x1="100" y1="468" x2="1060" y2="468" stroke="rgba(239,68,68,0.15)" strokeWidth="1" strokeDasharray="6,4" />
        <text x="1065" y="472" fill="rgba(248,113,113,0.6)" fontSize="9">Support</text>

        {/* Resistance zone at the top */}
        <line x1="100" y1="80" x2="1060" y2="80" stroke="rgba(34,197,94,0.12)" strokeWidth="1" strokeDasharray="6,4" />
        <text x="1065" y="84" fill="rgba(74,222,128,0.6)" fontSize="9">Res.</text>

        {/* Gold Liquidity Sweep marker at sweep candle low */}
        <circle cx="329" cy="468" r="12" fill="rgba(251,191,36,0.25)" stroke="rgba(251,191,36,0.8)" strokeWidth="1.5" />
        <circle cx="329" cy="468" r="22" fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="1.5" />
        <text x="355" y="455" fill="rgba(253,224,71,0.95)" fontSize="11" fontWeight="bold">Gold Liq Sweep</text>
        <line x1="329" y1="442" x2="329" y2="468" stroke="rgba(251,191,36,0.6)" strokeWidth="1" strokeDasharray="3,2" />

        {/* Purple AOI / Prep Zone */}
        <rect x="562" y="218" width="120" height="62" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" strokeDasharray="7,5" rx="3" />
        <text x="622" y="248" textAnchor="middle" fill="rgba(216,180,254,0.9)" fontSize="11" fontWeight="bold">AOI</text>
        <text x="622" y="263" textAnchor="middle" fill="rgba(192,132,252,0.7)" fontSize="9">Prep Zone</text>

        {/* Blue FVG / Imbalance zone (gap during rapid delivery) */}
        <rect x="466" y="165" width="96" height="55" fill="rgba(59,130,246,0.1)" stroke="rgba(96,165,250,0.55)" strokeWidth="1.5" strokeDasharray="5,4" rx="2" />
        <text x="514" y="192" textAnchor="middle" fill="rgba(147,197,253,0.95)" fontSize="11" fontWeight="bold">FVG</text>
        <text x="514" y="207" textAnchor="middle" fill="rgba(96,165,250,0.75)" fontSize="9">Imbalance</text>

        {/* Red Burn Point horizontal */}
        <line x1="100" y1="468" x2="1060" y2="468" stroke="rgba(239,68,68,0.55)" strokeWidth="2" />
        <circle cx="108" cy="468" r="5" fill="rgba(239,68,68,0.8)" />
        <rect x="100" y="476" width="88" height="18" fill="rgba(239,68,68,0.15)" rx="2" />
        <text x="144" y="488" textAnchor="middle" fill="rgba(252,165,165,0.9)" fontSize="10" fontWeight="bold">Burn Point</text>

        {/* Green Tables Served — Target 1 */}
        <line x1="730" y1="108" x2="1060" y2="108" stroke="rgba(34,197,94,0.55)" strokeWidth="2" strokeDasharray="8,4" />
        <circle cx="730" cy="108" r="5" fill="rgba(34,197,94,0.8)" />
        <text x="1065" y="112" fill="rgba(74,222,128,0.9)" fontSize="9" fontWeight="bold">T1</text>

        {/* Green Tables Served — Target 2 */}
        <line x1="754" y1="84" x2="1060" y2="84" stroke="rgba(34,197,94,0.35)" strokeWidth="1.5" strokeDasharray="6,5" />
        <circle cx="754" cy="84" r="4" fill="rgba(34,197,94,0.6)" />
        <text x="1065" y="88" fill="rgba(74,222,128,0.7)" fontSize="9">T2</text>

        {/* Labels for T1/T2 on left */}
        <rect x="840" y="100" width="110" height="16" fill="rgba(16,185,129,0.15)" rx="2" />
        <text x="895" y="112" textAnchor="middle" fill="rgba(110,231,183,0.9)" fontSize="10" fontWeight="bold">Tables Served T1</text>

        {/* === CANDLESTICKS === */}
        {CANDLES.map(({ x, o, c, h, l, g }) => {
          const top = Math.min(o, c);
          const bottom = Math.max(o, c);
          const bodyH = Math.max(bottom - top, 2);
          const mid = x + CW / 2;
          const fill = g ? "rgba(16,185,129,0.75)" : "rgba(239,68,68,0.75)";
          const stroke = g ? "rgba(16,185,129,0.9)" : "rgba(239,68,68,0.9)";
          return (
            <g key={x}>
              {/* Wick */}
              <line x1={mid} y1={h} x2={mid} y2={l} stroke={stroke} strokeWidth="1.2" />
              {/* Body */}
              <rect x={x} y={top} width={CW} height={bodyH} fill={fill} stroke={stroke} strokeWidth="0.5" rx="1" />
            </g>
          );
        })}

        {/* Price axis "Price" label */}
        <text x="30" y="46" fill="rgba(148,163,184,0.5)" fontSize="10" fontWeight="bold" transform="rotate(-90, 30, 46)" textAnchor="middle">PRICE</text>

        {/* Right-side current price indicator */}
        <rect x="1062" y="84" width="38" height="14" fill="rgba(16,185,129,0.25)" rx="2" />
        <text x="1081" y="94" textAnchor="middle" fill="rgba(110,231,183,1)" fontSize="9" fontWeight="bold">2008</text>

        {/* Legend row at bottom */}
        <rect x="100" y="554" width="960" height="24" fill="rgba(0,0,0,0.5)" rx="3" />
        <circle cx="118" cy="566" r="5" fill="rgba(251,191,36,0.7)" />
        <text x="128" y="570" fill="rgba(253,224,71,0.8)" fontSize="9" fontWeight="bold">Gold = Liquidity</text>
        <circle cx="238" cy="566" r="5" fill="rgba(168,85,247,0.7)" />
        <text x="248" y="570" fill="rgba(216,180,254,0.8)" fontSize="9" fontWeight="bold">Purple = AOI</text>
        <circle cx="338" cy="566" r="5" fill="rgba(59,130,246,0.7)" />
        <text x="348" y="570" fill="rgba(147,197,253,0.8)" fontSize="9" fontWeight="bold">Blue = FVG</text>
        <circle cx="418" cy="566" r="5" fill="rgba(239,68,68,0.7)" />
        <text x="428" y="570" fill="rgba(252,165,165,0.8)" fontSize="9" fontWeight="bold">Red = Burn Point</text>
        <circle cx="528" cy="566" r="5" fill="rgba(34,197,94,0.7)" />
        <text x="538" y="570" fill="rgba(110,231,183,0.8)" fontSize="9" fontWeight="bold">Green = Tables Served</text>
        <text x="900" y="570" fill="rgba(148,163,184,0.4)" fontSize="8">Practice chart for education · Not live market data</text>
      </svg>
    </div>
  );
}
