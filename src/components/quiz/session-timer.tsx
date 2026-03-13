"use client";

import { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

interface SessionTimerProps {
  durationMinutes: number;
}

export function SessionTimer({ durationMinutes }: SessionTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [durationMinutes]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isLow = secondsLeft > 0 && secondsLeft < 300;
  const isZero = secondsLeft === 0;

  const bgColor = isZero || isLow ? "bg-coral-600" : "bg-emerald-600";

  return (
    <div className={`sticky top-0 z-40 ${bgColor} text-white py-2.5 px-4 flex items-center justify-center gap-2 rounded-lg transition-colors duration-500`}>
      <Clock className="w-4 h-4" />
      <span className="text-sm font-medium">
        {isZero
          ? "Temps écoulé !"
          : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} restantes`}
      </span>
    </div>
  );
}
