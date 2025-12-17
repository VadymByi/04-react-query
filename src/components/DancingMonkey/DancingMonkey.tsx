import { useEffect, useState } from "react";
import css from "./DancingMonkey.module.css";

interface DancingMonkeyProps {
  duration: number;
}

export default function DancingMonkey({ duration }: DancingMonkeyProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timeout = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  return (
    <div
      className={css.monkey}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${duration / 2}ms ease-in-out`,
      }}
    >
      <img src="/assets/monkey.gif" alt="Dancing Monkey" />
    </div>
  );
}
