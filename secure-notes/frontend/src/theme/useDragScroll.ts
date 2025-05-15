// /theme/useDragScroll.ts
import { useState, useCallback, useEffect } from "react";

interface DragStart {
  x: number;
  scrollLeft: number;
}

interface DragScrollHandlers {
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const useDragScroll = (
  ref: React.RefObject<HTMLDivElement>
): DragScrollHandlers => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<DragStart>({
    x: 0,
    scrollLeft: 0,
  });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        scrollLeft: ref.current.scrollLeft,
      });

      e.preventDefault();
    },
    [ref]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !ref.current) return;

      const walk = (e.clientX - dragStart.x) * 1.5; // Adjust scroll speed as needed
      ref.current.scrollLeft = dragStart.scrollLeft - walk;
    },
    [isDragging, dragStart, ref]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    isDragging,
    handleMouseDown,
  };
};

export default useDragScroll;
