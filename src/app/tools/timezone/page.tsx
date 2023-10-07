"use client";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import * as React from "react";

import { Button } from "@mui/material";

type Timezone = {
  tz: string;
  city?: string;
};

export default function TimezonePage() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  // for testing
  const timezones: Timezone[] = [
    { tz: "America/Los_Angeles", city: "Seattle" },
    { tz: "Europe/London", city: "Glasgow" },
    { tz: "Asia/Hong_Kong" },
    { tz: dayjs.tz.guess() }
  ];

  const [time, setTime] = React.useState(dayjs());
  const increment = () => {
    setTime((time) => time.add(1, "h"));
  };

  return (
    <main className="flex flex-col items-center justify-between p-10 gap-10">
      <h1 className="text-3xl font-bold">Timezone Converter</h1>
      <div className="description">
        {timezones.map((e, i) => {
          return (
            <div key={i} className="my-4">
              <p>City: {e.city || e.tz.split("/").pop()?.replaceAll("_", " ")}</p>
              <p>Timezone: {e.tz}</p>
              <p>Time: {time.tz(e.tz).format("(ddd), MMM D, YYYY HH:mm A")}</p>
            </div>
          );
        })}
      </div>

      <Button variant="outlined" onClick={increment}>
        Add 1 Hour
      </Button>
    </main>
  );
}
