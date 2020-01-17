import { Select } from 'antd';
import { AntSelect } from './styles/select.style';

const isoSelect = AntSelect(Select);
const SelectOption = Select.Option;

export default isoSelect;
export { SelectOption };
