import { Dropdown, Menu } from 'antd';
import DropdownWrapper, { DropdownMenus } from './styles/dropdown.style';

const Dropdowns = DropdownWrapper(Dropdown);

const DropdownButtons = DropdownWrapper(Dropdown.Button);
const DropdownMenu = DropdownMenus(Menu);
const MenuItem = DropdownMenus(Menu.Item);
const SubMenu = DropdownMenus(Menu.SubMenu);

export default Dropdowns;
export { DropdownButtons, DropdownMenu, MenuItem, SubMenu };
