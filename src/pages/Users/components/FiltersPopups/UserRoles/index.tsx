import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { FilterPopupProps } from "../../../../../components/Filter/types";

export const UserRolesFilterPopup: React.FC<FilterPopupProps> = ({
  onChange,
  value,
}) => {
  const [role, setRole] = useState(value || 'all');
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange(filters => ({
      ...filters,
      role: role === 'all' ? undefined : role
    }))
  }
  return <Box component={'form'} onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Typography variant='h6'>Is Admin</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: '1rem' }}>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <FormControlLabel value={'admin'} control={<Radio />} label="Admin" />
          <FormControlLabel value={'user'} control={<Radio />} label="Regular User" />
          <FormControlLabel value={'all'} control={<Radio />} label="All" />
        </RadioGroup>
      </FormControl>
    </Box>
    <Button size='small' type="submit">Apply</Button>
  </Box>;
}