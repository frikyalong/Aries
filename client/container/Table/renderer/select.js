import * as React from 'react';
import Select from '/components/uielements/select';
import { SearchFieldPayload } from '../';

export default payload => {
    if (!payload || !payload.options) {
        console.warn('select renderere expected `options`');
        return null;
    }
    const options = payload.options;
    return (
        <Select {...(payload && payload.props)}>
            {options.map(option => {
                return (
                    <Select.Option key={option.key} value={option.value}>
                        {option.label}
                    </Select.Option>
                );
            })}
        </Select>
    );
};
