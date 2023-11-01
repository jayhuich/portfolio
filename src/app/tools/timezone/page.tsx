"use client";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import * as React from "react";

import DatePicker from "@/components/datePicker";
import SearchableSelect from "@/components/searchableSelect";
import TimePicker from "@/components/timePicker";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

type Timezone = {
  tz: string;
  city?: string;
};

export default function TimezonePage() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  function tzToCity(tz: string) {
    return tz.split("/").pop()?.replaceAll("_", " ");
  }

  const allTimezones = Intl.supportedValuesOf("timeZone");

  const [timezones, setTimezones] = React.useState([{ tz: dayjs.tz.guess() }] as Timezone[]);
  const [newTimezone, setNewTimezone] = React.useState({ tz: "" } as Timezone);

  const [time, setTime] = React.useState(dayjs());
  const [currentTimezone, setCurrentTimezone] = React.useState(dayjs.tz.guess());

  function addTimezone() {
    if (newTimezone.tz == "") return;
    time.tz(newTimezone.tz);
    setTimezones([...timezones, newTimezone]);
    setNewTimezone({ tz: "" } as Timezone);
  }

  function updateDisplayedTime(tz: string) {
    setCurrentTimezone(tz);
    setTime(dayjs().tz(tz));
  }

  return (
    <main className="container flex flex-col items-center justify-between mx-auto px-4 md:px-10 py-10 gap-10">
      <h1 className="text-3xl font-bold">Timezone Converter</h1>
      <Paper elevation={1} className="p-4">
        <div className="flex my-4">
          <div className="title">
            <span className="text-lg">Current timezone: {tzToCity(currentTimezone)}</span>
          </div>
          <div className="ml-auto">
            <Button onClick={() => updateDisplayedTime(currentTimezone)} variant="outlined">
              Reset to now
            </Button>
          </div>
        </div>
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
              <Button onClick={() => updateDisplayedTime(e.tz)}>
                <div>
                  <p>City: {e.city || tzToCity(e.tz)}</p>
                  <p>Time: {time.tz(e.tz).format("(ddd), MMM D, YYYY HH:mm A")}</p>
                </div>
              </Button>
              <IconButton
                onClick={() =>
                  setTimezones(timezones.filter((ee) => ee.city != e.city || ee.tz != e.tz))
                }
              >
                <CloseIcon />
              </IconButton>
            </div>
          );
        })}
      </Paper>
    </main>
  );
}
