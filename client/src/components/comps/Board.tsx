export const CompBoard = () => {
  const cols = 7;
  const rows = 4;
  const hexSize = 96;
  const colSpacing = hexSize * 0.88;
  const rowSpacing = hexSize * 0.78;

  const boardWidth = cols * colSpacing + colSpacing / 2; // +half for offset rows
  const boardHeight = (rows - 1) * rowSpacing + hexSize;

  return (
    <div className="flex justify-center w-full">
      <div className="relative" style={{ width: boardWidth, height: boardHeight }}>
        {Array.from({ length: rows }, (_, row) =>
          Array.from({ length: cols }, (_, col) => {
            const x = col * colSpacing + (row % 2 === 1 ? colSpacing / 2 : 0);
            const y = row * rowSpacing;
            return (
              <div
                key={`${row}-${col}`}
                className="absolute"
                style={{ left: x, top: y }}
              >
                <BlankHexagon />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export const HexagonFrame = ({ src, alt, frameColor }: { src: string, alt: string, frameColor: string }) => {
  const cx = 48, cy = 48;
  const hex = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 90);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");

  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      {/* mask */}
      <defs>
        <clipPath id={`hex-clip`}>
          <polygon points={hex(41)} />
        </clipPath>
      </defs>

      {/* outer border */}
      <polygon points={hex(46)} fill={frameColor} />

      {/* image clipped */}
      <image
        href={src}
        x="7"
        y="7"
        width="82"
        height="82"
        clipPath="url(#hex-clip)"
        preserveAspectRatio="xMidYMid slice"
        aria-label={alt}
      />
    </svg>
  );
}

export const BlankHexagon = () => {
  const cx = 48, cy = 48;
  const hex = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 90);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
    
  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <polygon points={hex(46)} fill="#D3D3D3" />
    </svg>
  );
}