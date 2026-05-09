import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router";

export default function TopLoadingBar() {
  const { state } = useNavigation();
  const [visible, setVisible] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
    }

    if (state !== "idle") {
      setFinishing(false);
      setVisible(true);
    } else if (visible) {
      setFinishing(true);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setFinishing(false);
      }, 380);
    }

    return () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [state, visible]);

  if (visible === false) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`top-loading-bar${finishing ? " top-loading-bar--done" : ""}`}
    />
  );
}
