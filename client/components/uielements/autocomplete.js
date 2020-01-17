import { AutoComplete } from 'antd';
import { AntAutoComplete } from './styles/autoComplete.style';

const AutoCompletes = AntAutoComplete(AutoComplete);
const AutoCompleteOption = AutoComplete.Option;

export default AutoCompletes;
export { AutoCompleteOption };
