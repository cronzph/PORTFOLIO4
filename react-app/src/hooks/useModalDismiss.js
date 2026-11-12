import { useEffect, useRef } from 'react';

/**
 * Shared modal behaviour: lock page scroll, focus the dialog, close on Escape.
 * Returns the ref for the dialog panel (give it tabIndex={-1}).
 */
export default function useModalDismiss(onClose) {
  const panelRef = useRef(null);
  const handler = useRef(onClose);
  handler.current = onClose;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') handler.current?.();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return panelRef;
}
