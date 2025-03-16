import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button, useTheme } from '@mui/material'
import { IGetAuthResponse } from '../../lib/responses/getAuth';
import { DarkModeSwitch } from '../../components/DarkModeSwitch';

type NavBarProps = {
  goTo: (path: string) => () => void;
  currentPage: string;
  user?: IGetAuthResponse;
  onChangeColorMode: (colorMode: 'light' | 'dark') => void
}

const NavBar: React.FC<NavBarProps> = ({
  goTo,
  currentPage,
  user,
  onChangeColorMode,
}) => {
  const theme = useTheme();
  const changeColorMode = ()=>{
    onChangeColorMode(theme.palette.mode === 'dark' ? 'light' : 'dark');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ zIndex: theme.zIndex.drawer + 1 }} position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentPage}
          </Typography>
          {
            user ?
            <Typography variant="h6" component="div">User: {user.name}</Typography> :
            <>
              <Button onClick={goTo('/login')} color="inherit">Login</Button>
              <Button onClick={goTo('/signup')} color="inherit">Sign Up</Button>
            </>
          }
          <DarkModeSwitch onChange={changeColorMode} checked={theme.palette.mode === 'dark'} sx={{ ml: 2 }} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar