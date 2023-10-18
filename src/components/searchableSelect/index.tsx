import * as React from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  TextField
} from "@mui/material";

type SearchableSelectProps = SelectProps & {
  options: string[];
};

export default function SearchableSelect({ options, onChange, ...props }: SearchableSelectProps) {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const [searchText, setSearchText] = React.useState("");

  const containsText = (str: string, searchStr: string) =>
    str.toLowerCase().includes(searchStr.toLowerCase());

  const displayedOptions = React.useMemo(
    () => options.filter((option: string) => containsText(option, searchText)),
    [searchText, options]
  );

  const customOnChange = (e: SelectChangeEvent<unknown>, child: React.ReactNode) => {
    setSelectedOption(e.target.value as string);
    onChange && onChange(e, child);
  };

  return (
    <Select
      MenuProps={{ autoFocus: false }}
      onChange={(e, child) => customOnChange(e, child)}
      onClose={() => setSearchText("")}
      renderValue={() => selectedOption}
      {...props}
    >
      <ListSubheader sx={{ bgcolor: "#363636" }}>
        <TextField
          size="small"
          autoFocus
          placeholder="Type to search..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Escape") {
              // prevents autoselecting options while typing
              e.stopPropagation();
            }
          }}
        />
      </ListSubheader>
      {displayedOptions.map((e, i) => {
        return (
          <MenuItem value={e} key={i}>
            {e}
          </MenuItem>
        );
      })}
    </Select>
  );
}
