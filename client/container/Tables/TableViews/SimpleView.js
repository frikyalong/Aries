import React from 'react';
import Table from '/components/Tables';

export default function({ dataSource, columns }) {
    const sortOption = {};
    const [data, setData] = React.useState(dataSource);

    function getSortAsc(dataSource, sortKey) {
        sortOption.sortKey = sortKey;
        sortOption.sortDir = 'ASC';
        return dataSource.sort(sort);
    }
    function getSortDesc(dataSource, sortKey) {
        sortOption.sortKey = sortKey;
        sortOption.sortDir = 'DESC';
        return dataSource.sort(sort);
    }
    function sort(optionA, optionB) {
        const valueA = optionA[sortOption.sortKey].toUpperCase();
        const valueB = optionB[sortOption.sortKey].toUpperCase();
        let sortVal = 0;
        if (valueA > valueB) {
            sortVal = 1;
        }
        if (valueA < valueB) {
            sortVal = -1;
        }
        if (sortVal !== 0 && sortOption.sortDir === 'DESC') {
            return sortVal * -1;
        }
        return sortVal;
    }

    function onChange(pagination, filters, sorter) {
        if (sorter && sorter.columnKey && sorter.order) {
            if (sorter.order === 'ascend') {
                getSortAsc(dataSource, sorter.columnKey);
            } else {
                getSortDesc(dataSource, sorter.columnKey);
            }
            setData(dataSource);
        }
    }
    return (
        <Table
            pagination={true}
            columns={columns}
            onChange={onChange}
            dataSource={data}
            className="isoSimpleTable"
        />
    );
}
