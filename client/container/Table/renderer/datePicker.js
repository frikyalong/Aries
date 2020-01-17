import * as React from 'react';
import DatePicker from '/components/uielements/datePicker';
import { SearchFieldPayload } from '../';

export default payload => {
    return <DatePicker {...(payload && payload.props)} />;
};
