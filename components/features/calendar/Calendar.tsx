"use client";
import { memo } from "react";
import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch"; // YOUR THEME
import dayGridPlugin from "@fullcalendar/react/daygrid";
import "@fullcalendar/react/skeleton.css"; // ALWAYS NEED SKELETON
import "@fullcalendar/react/themes/monarch/theme.css"; // YOUR THEME
import "@/styles/calendar.css"; // TASKFLOW PALETTE
const Calendar = () => {
  const events = [
    { title: "Event 1", date: "2026-08-01" },
    { title: "Event 2", date: "2026-08-09" },
    { title: "Event 3", date: "2026-08-03" },
  ];
  return (
    <div>
      <FullCalendar
        plugins={[themePlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ start: "title", end: "today prev,next" }}
        aspectRatio={1.9}
        events={events}
      />
    </div>
  );
};

export default memo(Calendar);
