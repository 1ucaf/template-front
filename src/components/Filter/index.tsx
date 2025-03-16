import React, { useState } from 'react'
import { useRef } from 'react';
import { FilterAlt, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useOutsideAlerter } from '../../lib/hooks/useOutsideAlerter.js';
import FilterItem from './components/FilterItem.js';

type FilterProps = {
  isActive: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  filtersList: any[];
  clearAllFilters: () => void;
}

export const FilterButton: React.FC<FilterProps> = ({
  isActive,
  onOpen,
  onClose,
  filtersList,
  clearAllFilters,
}) => {
  const [showDisplayList, setShowDisplayList] = useState(false);
  const [activePopups, setActivePopups] = useState<any>({});
  const ref = useRef<Node>();
  const hideList = () => {
    setActivePopups({});
    setShowDisplayList(false)
  }
  useOutsideAlerter(ref, hideList);
  const handleShowHide =  () => {
    if(showDisplayList) {
      setShowDisplayList(false);
      onClose && onClose();
    } else {
      setShowDisplayList(true);
      onOpen && onOpen();
    }
  }
  const handleClickFilter = (name: string) => {
    setActivePopups((prev:any) => {
      if(prev[name]) {
        return {...prev, [name]: false}
      }
      return {[name]: true}
    });
  }
  return (
    <Box
      ref={ref}
      sx={{position: 'relative'}}
    >
      <IconButton
        sx={(theme) => ({
          cursor: 'pointer',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          gap: '0.2rem',
          height: '3rem',
          ":hover": {
            color: theme.palette.primary.main,
          },
        })}
        style={
          isActive ? { border: "1px solid palegreen" } : undefined
        }
        onClick={handleShowHide}
      >
        <FilterAlt/>
        <Typography
          className={
            isActive ? "text-green-500 animate-pulse" : undefined
          }
        >
          {isActive ? "Filter On" : "Filters"}
        </Typography>
        <KeyboardArrowDown />
      </IconButton>
      {showDisplayList &&
        <Box
          sx={(theme) => ({
            position: 'absolute',
            top: 55,
            right: 0,
            zIndex: 10,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            boxShadow: 24,
            width: 300,
            py: 1,
            px: 1,
          })}
        >
          <Box sx={{ px: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Add Filter</Typography>
            <Button
              variant="text"
              size='small'
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
          </Box>
          {filtersList.map((props) => (
            <FilterItem
              {...props}
              key={props.name}
              onClick={handleClickFilter}
              displayPopUp={activePopups[props.name]}
            />
          ))}
        </Box>
      }
    </Box>
  )
}