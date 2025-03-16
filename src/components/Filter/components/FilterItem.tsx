import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";

type FilterItemProps = {
  title: string;
  name: string;
  value: any;
  optionMapper?: any;
  options?: any;
  preview?: any;
  popup?: any;
  onChange?: any;
  onClick?: any;
  displayPopUp?: boolean;
}

const FilterItem: React.FC<FilterItemProps> = ({
  title,
  name,
  value,
  optionMapper,
  options,
  preview,
  popup,
  onChange,
  onClick,
  displayPopUp,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const PopUp = popup;
  const previewLabel = preview || (optionMapper && optionMapper[value]) || '';
  const [leftPosition, setLeftPosition] = useState(-15); // initial value, adjust to your desired spacing
  useLayoutEffect(() => {
    const popupWidth = popupRef.current?.offsetWidth;
    if (popupWidth) {
      setLeftPosition(-popupWidth - 15);
    }
  }, [popupRef, displayPopUp]);
  return (
    <Box
      sx={{
        position: 'relative',
        py: '0.5rem',
      }}
    >
      <Button
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        size="small"
        onClick={() => {
          onClick(name);
        }}
      >
        <Typography fontSize={'0.8rem'}>{title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography fontSize={'0.8rem'}>{previewLabel}</Typography>
          <ChevronRight/>
        </Box>
      </Button>
      {displayPopUp &&
        <Box
          sx={{
            position: 'absolute',
            left: leftPosition,
            top: 7,
          }}
        >
          <Box
            ref={popupRef}
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.default,
            })}
          >
            <PopUp
              {...{
                title,
                value,
                optionMapper,
                preview,
                onChange,
                options,
                name,
              }}
            />
          </Box>
        </Box>
      }
    </Box>
  )
}

export default FilterItem