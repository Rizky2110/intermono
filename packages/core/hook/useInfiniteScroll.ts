import React, { useCallback, useRef } from "react";

const useInfineteScroll = (cb: () => void, isLoading = false) => {
  const observer = useRef<IntersectionObserver>();
  return useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          cb();
        }
      });

      if (node) observer.current?.observe(node);
    },
    [isLoading, cb]
  );
};

export default useInfineteScroll;
