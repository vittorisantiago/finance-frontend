"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

type ScrollToTopButtonProps = {
  showAfter?: number;
};

export default function ScrollToTopButton({
  showAfter = 400,
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      setIsVisible(window.scrollY > showAfter);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [showAfter]);

  if (!isVisible) return null;

  return (
    <Button
      type="button"
      size="icon"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
