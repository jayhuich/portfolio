import { Dayjs } from "dayjs";
import * as React from "react";

import { StaticDatePicker, StaticDatePickerProps } from "@mui/x-date-pickers";

export default function DatePicker(props: StaticDatePickerProps<Dayjs>) {
  return <StaticDatePicker slotProps={{ actionBar: { actions: [] } }} {...props} />;
}
