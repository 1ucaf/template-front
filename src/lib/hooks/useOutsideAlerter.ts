import { MutableRefObject, useEffect } from 'react';

export function useOutsideAlerter(ref: MutableRefObject<Node | undefined>, handler: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target instanceof Node)) {
        return;
      }
      const DatePicker = document.querySelector('.MuiDialogContent-root, .MuiPickersPopper-root');
      if (DatePicker && DatePicker.contains(event.target)) return;
      if (ref.current && !ref.current.contains(event.target)) {
        handler && handler();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}