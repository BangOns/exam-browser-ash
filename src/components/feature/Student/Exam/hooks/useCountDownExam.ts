import { useEffect, useState } from "react";

export const useExamCountdown = (examDate?: string, endTime?: string) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!examDate || !endTime) return;

    const targetDate = new Date(`${examDate}T${endTime}`);

    const updateTimer = () => {
      const diff = targetDate.getTime() - Date.now();

      setTimeLeft(Math.max(0, Math.floor(diff / 1000)));
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [examDate, endTime]);

  return {
    totalSeconds: timeLeft ?? 0,
    hours: Math.floor((timeLeft ?? 0) / 3600),
    minutes: Math.floor(((timeLeft ?? 0) % 3600) / 60),
    seconds: (timeLeft ?? 0) % 60,

    // hanya expired jika timer sudah terinisialisasi
    isExpired: timeLeft !== null && timeLeft <= 0,

    isLoading: timeLeft === null,
  };
};
