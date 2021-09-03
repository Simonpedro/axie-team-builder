import { TextField } from "@mui/material";
import { VoidFunctionComponent } from "react";

interface AxieSelectorProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

const AxieSelector = ({ label, value, onChange }: AxieSelectorProps) => (
  <TextField
    fullWidth
    label={label}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    sx={{ pb: 4 }}
  />
);

export default AxieSelector;
