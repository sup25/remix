import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  CSSProperties,
} from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

const Marquee = ({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) => {
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, [children]);

  const containerStyle: CSSProperties = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    position: "relative",
    width: "100%",
  };

  const contentStyle: CSSProperties = {
    display: "inline-block",
    whiteSpace: "nowrap",
    animation: `marquee ${contentWidth / speed}s linear infinite ${
      direction === "right" ? "reverse" : "normal"
    } ${isPaused ? "paused" : "running"}`,
  };

  const handleMouseEnter = (): void => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = (): void => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      style={containerStyle}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
      <div className="flex">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            ref={index === 0 ? contentRef : null}
            style={contentStyle}
            className="inline-flex items-center"
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

const MarqueeBanner = () => {
  return (
    <div className="flex items-center">
      <div className="w-full max-w-screen-2xl mx-auto ">
        <Marquee
          speed={50}
          pauseOnHover={false}
          className="text-lg font-medium py-10"
        >
          <div className="flex text-black items-center text-6xl px-8">
            Designed in{" "}
            <span className="font-bold text-black  font-bricolage ml-2 text-7xl">
              Remix
            </span>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeBanner;
