import * as React from 'react';
import Input from '/components/uielements/input';
import { SearchFieldPayload } from '../';

export default payload => {
    return <Input {...(payload && payload.props)} />;
};
