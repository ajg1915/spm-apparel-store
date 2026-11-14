// Placeholder garment drawings until real product photos are added.
export default function ProductArt({ cat, color = "#0b1f44", size = 160, plain = false }) {
  const ink = ["#ffffff", "#f5f5f4", "#e7e2d6", "#c8b98f", "#9ca3af"].includes(color.toLowerCase()) ? "#0a3161" : "#ffffff";
  const shapes = {
    tees: <path d="M30 30 L55 18 Q80 30 105 18 L130 30 L148 58 L124 70 L124 142 L36 142 L36 70 L12 58 Z" />,
    hoodies: <path d="M30 40 L58 22 Q80 6 102 22 L130 40 L150 92 L126 100 L126 146 L34 146 L34 100 L10 92 Z" />,
    jackets: <path d="M30 34 L60 20 L80 34 L100 20 L130 34 L150 120 L126 124 L126 146 L34 146 L34 124 L10 120 Z" />,
    hats: <path d="M30 100 Q30 40 80 38 Q130 40 130 100 Z M24 100 L150 100 Q150 116 120 114 L24 112 Z" />,
    gloves: <path d="M48 146 L48 82 L40 40 Q44 30 52 38 L60 70 L62 26 Q70 18 76 26 L78 66 L84 22 Q92 16 96 24 L96 68 L104 32 Q112 26 116 34 L112 96 Q124 84 132 90 L112 126 L112 146 Z" />,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width={size} height={size} aria-hidden="true">
      <g fill={color} stroke="rgba(0,0,0,.25)" strokeWidth="2">{shapes[cat]}</g>
      {!plain && cat !== "gloves" && (
        <text x="80" y={cat === "hats" ? 82 : 96} textAnchor="middle" fill={ink} fontWeight="900" fontSize="22" fontFamily="system-ui">SPM</text>
      )}
    </svg>
  );
}
