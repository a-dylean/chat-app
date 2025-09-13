import { useCallback, useEffect, useRef, useState, type MutableRefObject } from "react";

export type UseStickToBottom = {
  scrollRef: MutableRefObject<HTMLDivElement | null>;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  isAtBottom: boolean;
  scrollToBottom: () => void;
};

export function useStickToBottom(threshold = 16): UseStickToBottom {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const calcIsAtBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsAtBottom(distance <= threshold);
  }, [threshold]);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    calcIsAtBottom();
    const onScroll = () => calcIsAtBottom();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [calcIsAtBottom]);

  useEffect(() => {
    const target = contentRef.current;
    if (!target) return;
    const observer = new MutationObserver(() => {
      if (isAtBottom) {
        scrollToBottom();
      } else {
        calcIsAtBottom();
      }
    });
    observer.observe(target, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [isAtBottom, scrollToBottom, calcIsAtBottom]);

  useEffect(() => {
    const id = requestAnimationFrame(() => scrollToBottom());
    return () => cancelAnimationFrame(id);
  }, [scrollToBottom]);

  return { scrollRef, contentRef, isAtBottom, scrollToBottom };
}

