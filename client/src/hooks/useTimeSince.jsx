import { useCallback } from "react";

const useTimeSince = () => {
  const timeSince = useCallback((timestamp) => {
    const unitsInMilliseconds = [
      { unit: "năm", duration: 31536000 },
      { unit: "tháng", duration: 2678400 },
      { unit: "tuần", duration: 604800 },
      { unit: "ngày", duration: 86400 },
      { unit: "giờ", duration: 3600 },
      { unit: "phút", duration: 60 },
      { unit: "giây", duration: 1 },
    ];

    const now = new Date();
    const yourDate = new Date(timestamp); // Chuyển đổi timestamp thành Date object
    const seconds = Math.floor((now.getTime() - yourDate.getTime()) / 1000);

    if (seconds < 0) {
      return "Lỗi";
    }

    for (const unitInfo of unitsInMilliseconds) {
      const timer = seconds / unitInfo.duration;
      if (timer >= 1) {
        return `${Math.floor(timer)} ${unitInfo.unit} trước`;
      }
    }

    return "Vừa xong";
  }, []);

  return timeSince;
};

export default useTimeSince;
