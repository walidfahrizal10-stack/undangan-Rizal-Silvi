import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = element.current;
    if (!current) return;

    if (!("IntersectionObserver" in window)) {
      current.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          current.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );

    observer.observe(current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={element} className={`reveal ${className}`}>
      {children}
    </div>
  );
}