import { useState, useCallback, useRef } from 'react';

export function useToast() {
  const [toast, setToast] = useState({ message: '', show: false });
  const timerRef = useRef(null);

  const showToast = useCallback((message) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast({ message, show: true });
    timerRef.current = setTimeout(() => {
      setToast({ message: '', show: false });
    }, 2200);
  }, []);

  return {
    toast,
    showToast,
  };
}
