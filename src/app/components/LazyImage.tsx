import { useEffect, useRef, useState, type ImgHTMLAttributes, type SyntheticEvent } from "react";
import { cn } from "./ui/utils";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4=";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  showSkeleton?: boolean;
}

export function LazyImage({
  src,
  alt,
  className,
  wrapperClassName,
  showSkeleton = true,
  loading,
  ...rest
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) {
      setStatus(img.naturalWidth > 0 ? "loaded" : "error");
    } else {
      setStatus("loading");
    }
  }, [src]);

  const handleLoad = () => setStatus("loaded");

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src !== ERROR_IMG_SRC) img.src = ERROR_IMG_SRC;
    setStatus("error");
  };

  return (
    <div className={cn("relative overflow-hidden w-full h-full", wrapperClassName)}>
      {showSkeleton && status === "loading" && (
        <div className="absolute inset-0 bg-white/[0.06] animate-pulse" aria-hidden="true" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading ?? "lazy"}
        decoding="async"
        draggable={false}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full transition-opacity duration-700 ease-out",
          status === "loading" ? "opacity-0" : "opacity-100",
          className,
        )}
        {...rest}
      />
    </div>
  );
}
