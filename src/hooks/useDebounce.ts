import {useRef} from "react";

export default function useDebounce(cb, delay) {
  const timeoutId = useRef();

  return function (...args) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(
      () => cb(...args), delay
    )
  }
}