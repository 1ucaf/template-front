
import React, { useMemo } from 'react'
import NavBar from '../components/AppBar'
import SideDrawer from '../components/SideDrawer'
import { Box } from '@mui/material'
import { menuList } from '../constants/menuList'
import { useNavigate } from 'react-router'
import { IGetAuthResponse } from '../../lib/responses/getAuth'

type AppLayoutProps = {
  children: React.ReactNode,
  currentPage: string,
  isAdmin?: boolean;
  user?: IGetAuthResponse;
  onChangeColorMode: (colorMode: 'light' | 'dark') => void
}

const AppLayout: React.FC<AppLayoutProps> = ({children, currentPage, isAdmin, user, onChangeColorMode}) => {
  const navigate = useNavigate()
  const goTo = (url: string)=> () => {
    navigate(url);
  }
  const menuItems = useMemo(() => {
    if(isAdmin) {
      return { ...menuList };
    }
    if(user?.isActive) {
      return {
        top: menuList.top.filter(item => !item.adminOnly),
        bottom: menuList.bottom.filter(item => !item.adminOnly),
      }
    }
    return {
      top: menuList.top.filter(item => !item.adminOnly && !item.activeOnly),
      bottom: menuList.bottom.filter(item => !item.adminOnly && !item.activeOnly),
    };
  }, [isAdmin]);
  return (
    <Box id='layout'>
      <NavBar currentPage={currentPage} goTo={goTo} user={user} onChangeColorMode={onChangeColorMode} />
      <SideDrawer menuList={menuItems}/>
      <Box sx={{ paddingTop: '65px', paddingLeft: '70px' }}>
        {children}
      </Box>
    </Box>
  )
}

export default AppLayout