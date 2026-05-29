type CollectionThumbProps = {
  spriteIndex: number;
  alt: string;
  className?: string;
  coverImage?: string;
};

const COLS = 2;
const ROWS = 4;
/** Vertical band where the 2×4 still grid sits in `collection-overview.png` (title above, padding below). */
const GRID_Y_START = 14;
const GRID_Y_END = 92;

/** Background slice from `/collection-overview.png` (2×4 grid). */
export function CollectionThumb({
  spriteIndex,
  alt,
  className = "",
  coverImage,
}: CollectionThumbProps) {
  const row = Math.floor(spriteIndex / COLS);
  const col = spriteIndex % COLS;
  const x = (COLS > 1 ? col / (COLS - 1) : 0) * 100;
  const rowT = ROWS > 1 ? row / (ROWS - 1) : 0;
  const y = GRID_Y_START + rowT * (GRID_Y_END - GRID_Y_START);

  return (
    <div
      role="img"
      aria-label={alt}
      className={`bg-no-repeat ${className}`}
      style={
        coverImage
          ? {
              backgroundImage: `url(${coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {
              backgroundImage: "url(/collection-overview.png)",
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${x}% ${y}%`,
            }
      }
    />
  );
}
