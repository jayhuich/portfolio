"use client";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import * as React from "react";

import DatePicker from "@/components/datePicker";
import SearchableSelect from "@/components/searchableSelect";
import TimePicker from "@/components/timePicker";
import { Button, FormControl, InputLabel, Paper, TextField } from "@mui/material";

type Timezone = {
  tz: string;
  city?: string;
};

export default function TimezonePage() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const allTimezones = Intl.supportedValuesOf("timeZone");

  const [timezones, setTimezones] = React.useState([
    { tz: dayjs.tz.guess() },
    { tz: "America/Los_Angeles", city: "Seattle" },
    { tz: "Europe/London", city: "Glasgow" },
    { tz: "Asia/Hong_Kong" }
  ] as Timezone[]);
  const [newTimezone, setNewTimezone] = React.useState({ tz: "" } as Timezone);

  const [time, setTime] = React.useState(dayjs());

  function addTimezone() {
    try {
      time.tz(newTimezone.tz);
    } catch {
      console.error("Not a valid time zone");
    }
    setTimezones([...timezones, newTimezone]);
  }

  return (
    <main className="container flex flex-col items-center justify-between mx-auto px-4 md:px-10 py-10 gap-10">
      <h1 className="text-3xl font-bold">Timezone Converter</h1>
      <Paper elevation={1} className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="w-full md:w-auto flex flex-auto justify-center md:justify-end">
            <DatePicker value={time} onChange={(time) => time && setTime(time)} />
          </div>
          <div className="flex flex-auto justify-center md:justify-start">
            <TimePicker value={time} onChange={(time) => time && setTime(time)} />
          </div>
        </div>
      </Paper>
      <div className="w-full md:w-auto grid md:grid-cols-3 gap-4">
        <div className="flex justify-center md:justify-end">
          <FormControl variant="filled" fullWidth>
            <InputLabel id="timezone-label">Timezone</InputLabel>
            <SearchableSelect
              id="timezone"
              label="Timezone"
              labelId="timezone-label"
              options={allTimezones}
              value={newTimezone.tz}
              onChange={(e) => setNewTimezone({ ...newTimezone, tz: e.target.value as string })}
            />
          </FormControl>
        </div>
        <div className="flex justify-center md:justify-start">
          <TextField
            id="city"
            label="City name (optional)"
            value={newTimezone.city || ""}
            onChange={(e) => setNewTimezone({ ...newTimezone, city: e.target.value })}
            variant="filled"
            fullWidth
          />
        </div>
        <Button onClick={addTimezone} variant="contained">
          Add timezone
        </Button>
      </div>
      <Paper elevation={1} className=" p-4">
        {timezones.map((e, i) => {
          return (
            <div key={i} className="my-4">
              <p>City: {e.city || e.tz.split("/").pop()?.replaceAll("_", " ")}</p>
              <p>Timezone: {e.tz}</p>
              <p>Time: {time.tz(e.tz).format("(ddd), MMM D, YYYY HH:mm A")}</p>
            </div>
          );
        })}
      </Paper>
    </main>
  );
}
