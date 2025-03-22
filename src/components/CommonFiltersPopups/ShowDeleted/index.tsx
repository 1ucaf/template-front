import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { FormEvent, useState } from "react";
import { FilterPopupProps } from "../../Filter/types";

export const ShowDeletedFilterPopup: React.FC<FilterPopupProps> = ({
  onChange,
  value,
}) => {
  const [showDeleted, setShowDeleted] = useState<boolean>(value);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange(filters => ({
      ...filters,
      showDeleted,
    }))
  }
  return <Box component={'form'} onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: '1rem' }}>
      <FormControlLabel
        label="Show Deleted"
        control={<Checkbox checked={showDeleted} onChange={(e) => setShowDeleted(e.target.checked)} />}
      />
    </Box>
    <Button size='small' type="submit">Apply</Button>
  </Box>;
}