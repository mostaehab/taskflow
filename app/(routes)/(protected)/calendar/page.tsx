import { memo } from "react";
import Calendar from "@/components/features/calendar/Calendar";
const Page = () => {
  return (
    <div>
      <Calendar />
    </div>
  );
};

export default memo(Page);
