import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { ChevronRight, FilterAlt, KeyboardArrowDown } from "@mui/icons-material";

type FilterProps = {
  isActive: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  filtersList: any[];
  clearAllFilters: () => void;
};

export const FilterMenuMUI: React.FC<FilterProps> = ({
  isActive,
  onOpen,
  onClose,
  filtersList,
  clearAllFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    onOpen?.();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveFilter(null);
    onClose?.();
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>, name: string) => {
    setActiveFilter(name);
    setPopoverAnchor(event.currentTarget);
  };
  const activeFilterData = filtersList.find((filter) => filter.name === activeFilter);

  const RenderPopup = () => {
    if (!activeFilterData?.popup) return null;
  
    return activeFilterData.popup({
      title: activeFilterData.title,
      value: activeFilterData.value,
      optionMapper: activeFilterData.optionMapper,
      preview: activeFilterData.preview,
      onChange: activeFilterData.onChange,
      options: activeFilterData.options,
      name: activeFilter,
    });
  };
  return (
    <Box>
      {/* Botón de Filtros */}
      <IconButton
        sx={(theme) => ({
          cursor: "pointer",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.2rem",
          height: "3rem",
          ":hover": { color: theme.palette.primary.main },
          borderColor: isActive ? "palegreen" : undefined,
        })}
        onClick={handleMenuOpen}
      >
        <FilterAlt />
        <Typography>{isActive ? "Filter On" : "Filters"}</Typography>
        <KeyboardArrowDown />
      </IconButton>

      {/* Menú de Filtros */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{ paper: { sx: { width: 300, p: 1 } }}}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
          <Typography variant="h6">Add Filter</Typography>
          <Button variant="text" size="small" onClick={clearAllFilters}>
            Clear All
          </Button>
        </Box>
        {filtersList.map(({ name, title }) => (
          <MenuItem
            sx={{
              width: "100%",
              justifyContent: 'space-between',
              display: 'flex',
              transition: 'background-color 0.3s ease, transform 0.3s ease', // Animación para el color y transformaciones
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.main, // Cambiar color de fondo al pasar el mouse
                transform: 'scale(1.05)', // Efecto de agrandar ligeramente el item
              },
            }}
            key={name}
            onClick={(e) => handleFilterClick(e, name)}
          >
            <Typography>{title}</Typography>
            <ChevronRight/>
          </MenuItem>
        ))}
      </Menu>

      {/* Popover para subfiltros */}
      <Popover
        open={Boolean(activeFilter)}
        anchorEl={popoverAnchor}
        onClose={() => setActiveFilter(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ p: 2 }}>
          <RenderPopup />
        </Box>
      </Popover>

    </Box>
  );
};
