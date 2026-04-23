import { useRef, useEffect, useState } from "react";
import { frameColor } from "../../utils/frameColor";
import type { Champion, BoardProps, BuilderBoardProps } from "../../types";

const BLANK_HEX_PATH = "M 7.5860 42.9414 L 23.8516 52.1758 C 26.6407 53.7695 29.3126 53.7930 32.1485 52.1758 L 48.4141 42.9414 C 50.5938 41.6992 51.7890 40.4336 51.7890 37.0352 L 51.7890 18.8008 C 51.7890 15.4961 50.5703 14.3008 48.5783 13.1523 L 32.2657 3.8711 C 29.3595 2.2070 26.5704 2.2305 23.7344 3.8711 L 7.4219 13.1523 C 5.4297 14.3008 4.2110 15.4961 4.2110 18.8008 L 4.2110 37.0352 C 4.2110 40.4336 5.4063 41.6992 7.5860 42.9414 Z";
const HEX_FRAME_PATH = "M 7.5860 42.9414 L 23.8516 52.1758 C 26.6407 53.7695 29.3126 53.7930 32.1485 52.1758 L 48.4141 42.9414 C 50.5938 41.6992 51.7890 40.4336 51.7890 37.0352 L 51.7890 18.8008 C 51.7890 15.4961 50.5703 14.3008 48.5783 13.1523 L 32.2657 3.8711 C 29.3595 2.2070 26.5704 2.2305 23.7344 3.8711 L 7.4219 13.1523 C 5.4297 14.3008 4.2110 15.4961 4.2110 18.8008 L 4.2110 37.0352 C 4.2110 40.4336 5.4063 41.6992 7.5860 42.9414 Z M 9.7891 39.6601 C 8.4532 38.9101 8.0079 38.1836 8.0079 36.9179 L 8.0079 18.9648 C 8.0079 17.7930 8.4766 17.1133 9.6485 16.4336 L 25.3985 7.4101 C 27.1797 6.4023 28.7735 6.3554 30.6016 7.4101 L 46.3516 16.4336 C 47.5237 17.1133 47.9922 17.7930 47.9922 18.9648 L 47.9922 36.9179 C 47.9922 38.1836 47.5468 38.9101 46.2110 39.6601 L 30.6016 48.5430 C 28.7266 49.5976 27.2032 49.5742 25.3985 48.5430 Z";
const HEX_CLIP_PATH = "M 9.7891 39.6601 C 8.4532 38.9101 8.0079 38.1836 8.0079 36.9179 L 8.0079 18.9648 C 8.0079 17.7930 8.4766 17.1133 9.6485 16.4336 L 25.3985 7.4101 C 27.1797 6.4023 28.7735 6.3554 30.6016 7.4101 L 46.3516 16.4336 C 47.5237 17.1133 47.9922 17.7930 47.9922 18.9648 L 47.9922 36.9179 C 47.9922 38.1836 47.5468 38.9101 46.2110 39.6601 L 30.6016 48.5430 C 28.7266 49.5976 27.2032 49.5742 25.3985 48.5430 Z";

export const BlankHexagon = () => (
  <svg width="90" height="96" viewBox="0 0 56 56">
    <path d={BLANK_HEX_PATH} fill="#D3D3D3" />
  </svg>
);

export const BuilderBlankHexagon = () => (
  <svg width="90" height="96" viewBox="0 0 56 56">
    <path d={HEX_FRAME_PATH} fill="#D1D5DB" fillRule="evenodd" />
  </svg>
);

export const HexagonFrame = ({ src, alt, color }: { src: string, alt: string, color: string }) => {
  const clipId = `hex-clip-${alt.replace(/\s+/g, "-")}`;

  return (
    <svg width="90" height="96" viewBox="0 0 56 56">
      <defs>
        <clipPath id={clipId}>
          <path d={HEX_CLIP_PATH} />
        </clipPath>
      </defs>

      <image
        href={src}
        x="0" y="0" width="56" height="56"
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
        aria-label={alt}
      />

      <path d={HEX_FRAME_PATH} fill={color} fillRule="evenodd" />
    </svg>
  );
};

export const SquareFrame = ({ src, alt, cost, onDragStart }: {
  src: string;
  alt: string;
  cost?: number;
  onDragStart: () => void;
}) => {
  const clipId = `sq-clip-${alt.replace(/\s+/g, "-")}`;
  const size = 52;
  const radius = 8;
  const borderWidth = 3;
  const borderColor = cost !== undefined ? frameColor(cost) : "#9CA3AF";

  return (
    <div draggable onDragStart={onDragStart} className="cursor-grab active:cursor-grabbing">
      <svg width={size} height={size}>
        <defs>
          <clipPath id={clipId}>
            <rect x={borderWidth} y={borderWidth} width={size - borderWidth * 2} height={size - borderWidth * 2} rx={radius} ry={radius} />
          </clipPath>
        </defs>

        <image
          href={src}
          x={borderWidth} y={borderWidth}
          width={size - borderWidth * 2} height={size - borderWidth * 2}
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYMid slice"
          aria-label={`Tile for ${alt}`}
        />

        <rect
          x={borderWidth / 2} y={borderWidth / 2}
          width={size - borderWidth} height={size - borderWidth}
          rx={radius + borderWidth / 2} ry={radius + borderWidth / 2}
          fill="none"
          stroke={borderColor}
          strokeWidth={borderWidth}
        />
      </svg>
    </div>
  );
};

const Board = ({
  champions,
  interactive = false,
  onDropToCell,
  onDragFromCell,
  dragOverCell,
  onDragOverCell,
  onDragLeave,
}: BoardProps) => {
  const cols = 7;
  const rows = 4;
  const hexSize = 96;
  const colSpacing = hexSize * 0.88;
  const rowSpacing = hexSize * 0.78;
  const boardWidth = cols * colSpacing + colSpacing / 2;
  const boardHeight = (rows - 1) * rowSpacing + hexSize;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) {
        const available = wrapperRef.current.offsetWidth;
        setScale(Math.min(1, available / boardWidth));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const placed = new Map(
    champions
      .filter(c => c.position)
      .map(c => [`${c.position!.row}-${c.position!.col}`, c])
  );

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden">
      <div
        className="relative shrink-0"
        style={{ width: boardWidth * scale, height: boardHeight * scale, margin: "0 auto" }}
      >
        <div
          className="absolute top-0 left-0"
          style={{ width: boardWidth, height: boardHeight, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          {Array.from({ length: rows }, (_, row) =>
            Array.from({ length: cols }, (_, col) => {
              const x = col * colSpacing + (row % 2 === 1 ? colSpacing / 2 : 0);
              const y = row * rowSpacing;
              const champion = placed.get(`${row}-${col}`);
              const isOver = dragOverCell?.row === row && dragOverCell?.col === col;

              return (
                <div
                  key={`${row}-${col}`}
                  className="absolute"
                  style={{ left: x, top: y }}
                  onDragOver={e => { e.preventDefault(); onDragOverCell?.(row, col); }}
                  onDragLeave={onDragLeave}
                  onDrop={e => { e.preventDefault(); onDropToCell?.(row, col); }}
                >
                  <div
                    className="transition-transform duration-100"
                    style={{ transform: isOver ? "scale(1.1)" : "scale(1)" }}
                  >
                    {champion ? (
                      <div
                        draggable={interactive}
                        onDragStart={() => onDragFromCell?.(row, col)}
                        className={interactive ? "cursor-grab active:cursor-grabbing" : ""}
                      >
                        <HexagonFrame
                          src={champion.championImg}
                          alt={`Image of ${champion.championName}`}
                          color={frameColor(champion.cost)}
                        />
                      </div>
                    ) : interactive ? (
                      <BuilderBlankHexagon />
                    ) : (
                      <BlankHexagon />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export const CompBoard = ({ champions }: { champions: Champion[] }) => (
  <Board champions={champions} interactive={false} />
);

export const BuilderBoard = (props: BuilderBoardProps) => (
  <Board {...props} interactive={true} />
);