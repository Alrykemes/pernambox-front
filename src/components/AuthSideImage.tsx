import { cn } from "@/lib/utils";

export function AuthSideImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className="hidden lg:block lg:w-1/2">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("h-110 w-110 object-contain", className)}
      />
    </div>
  );
}
