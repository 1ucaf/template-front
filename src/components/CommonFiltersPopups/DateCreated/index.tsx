import { Box, Button, IconButton, Typography } from "@mui/material";
import { FilterPopupProps } from "../../Filter/types";
import { FormEvent, useState } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import { Clear } from "@mui/icons-material";

export const DatesFilterPopup: React.FC<FilterPopupProps> = ({
  onChange,
  value,
}) => {
  const [from, setFrom] = useState(value.startDate ? dayjs(value.startDate) : null);
  const [to, setTo] = useState(value.endDate ? dayjs(value.endDate) : null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange(filters => ({
      ...filters,
      startDate: from?.toISOString(),
      endDate: to?.toISOString(),
    }))
  }
  return <Box component={'form'} onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Typography variant='h6'>Date Created</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <DateTimePicker
        label={'From'}
        name={'from'}
        onChange={value => setFrom(value)}
        value={from}
      />
      <IconButton sx={{pr: 0}} onClick={() => setFrom(null)}>
        <Clear />
      </IconButton>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <DateTimePicker
        label={'To'}
        name={'to'}
        onChange={value => setTo(value)}
        value={to}
      />
      <IconButton sx={{pr: 0}} onClick={() => setTo(null)}>
        <Clear />
      </IconButton>
    </Box>
    <Button size='small' type="submit">Apply</Button>
  </Box>;
}