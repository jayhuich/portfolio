import { Dayjs } from "dayjs";
import * as React from "react";

import { StaticTimePicker, StaticTimePickerProps } from "@mui/x-date-pickers";

export default function TimePicker(props: StaticTimePickerProps<Dayjs>) {
  return <StaticTimePicker slotProps={{ actionBar: { actions: ["today"] } }} {...props} />;
}
