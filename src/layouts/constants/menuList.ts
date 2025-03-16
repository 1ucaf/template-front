import { AutoStories, Logout, Mail, Group } from '@mui/icons-material'
import { MenuItem, MenuList } from '../types/MenuList'

export const menuList: MenuList = {
  top: [
    { label: 'Home', path: '/', Icon: Mail, activeOnly: true },
    { label: 'Users', path: '/users', Icon: Group, adminOnly: true, activeOnly: true },
    { label: 'Books', path: '/books', Icon: AutoStories, activeOnly: true },
  ],
  bottom: [
    { label: 'Log Out', path: '/logout', Icon: Logout },
  ],
}

export const menuListMap: Record<string, MenuItem> = menuList.top.reduce((acc, item) => ({ ...acc, [item.path]: item }), {})