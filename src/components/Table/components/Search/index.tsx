import { IconButton, InputBase, Paper, SxProps, Tooltip } from "@mui/material"
import { Search as SearchIcon } from '@mui/icons-material';
import { FC } from "react";
import { SearchPropType } from "../../lib/types";

type SearchProps = SearchPropType &{
  onType: (value: string) => void
  searchTerm?: string;
  sx?: SxProps;
}

const Search: FC<SearchProps> = ({
  onType,
  onClickSearchButton,
  placeholder,
  searchTerm,
  sx,
}) => {
  const onClickSearch = () => {
    onClickSearchButton && onClickSearchButton();
  }
  const tooltipText = onClickSearchButton ? 'Click to search across all pages' : '';
  return (
    <Paper
      component="div"
      sx={{ ...sx, p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder || 'Search'}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => onType(e.target.value)}
        value={searchTerm}
        onKeyUp={(e) => e.key === 'Enter' && onClickSearch()}
      />
      <Tooltip title={tooltipText}>
        <IconButton onClick={onClickSearch} type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  )
}

export default Search