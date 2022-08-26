import React, { useCallback, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useInfineteScroll = (cb: () => void, isLoading = false) => {
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
export function useDebounce(
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
  time = 1000
) {
  const debounce = useCallback(
    (cb: (e: React.ChangeEvent<HTMLInputElement>) => void, delay = 1000) => {
      let timeout: NodeJS.Timeout;

      return (args: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb(args);
        }, delay);
      };
    },
    []
  );

  return debounce(callback, time);
}
export function random(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const useUniqueId = (length = 20) => {
  const [id, setId] = React.useState("");
  const rand = random(length);
  React.useEffect(() => {
    if (!id) setId(rand);
  }, [id, rand]);

  return id;
};
