import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { FilterPopupProps } from "../../../../../components/Filter/types";

const activeStatusMap = {
  active: true,
  inactive: false,
  all: undefined,
}

type StatusType = 'active' | 'inactive' | 'all';

export const UserStatusFilterPopup: React.FC<FilterPopupProps> = ({
  onChange,
  value,
}) => {
  const [status, setStatus] = useState<StatusType>(()=>{
    return value ? 'active' : value === false ? 'inactive' : 'all'
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange(filters => ({
      ...filters,
      isActive: activeStatusMap[status],
    }))
  }
  return <Box component={'form'} onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Typography variant='h6'>Status</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: '1rem' }}>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusType)}
        >
          <FormControlLabel value={'active'} control={<Radio />} label="Active" />
          <FormControlLabel value={'inactive'} control={<Radio />} label="Inactive" />
          <FormControlLabel value={'all'} control={<Radio />} label="All" />
        </RadioGroup>
      </FormControl>
    </Box>
    <Button size='small' type="submit">Apply</Button>
  </Box>;
}