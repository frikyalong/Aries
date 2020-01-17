import * as React from 'react';
import TreeSelect from '/components/uielements/treeSelect';
import { SearchFieldPayload } from '../';

export default payload => {
    return <TreeSelect {...(payload && payload.props)} />;
};
