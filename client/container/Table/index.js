import React from 'react';
import update from 'immutability-helper';
import { Table, Row, Col, Icon, Affix } from 'antd';
import Button from '/components/uielements/button';
import Checkbox from '/components/uielements/checkbox';
import Dropdown from '/components/uielements/dropdown';
import Card from '/components/uielements/card';
import Menu from '/components/uielements/menu';
import SearchField from './SearchField';

const renderActions = (actions, record) => {
    return (
        <span>
            {actions.map((action, i) => {
                if (action.children) {
                    const menu = (
                        <Menu>
                            {action.children.map(child => {
                                const onClick = () => {
                                    child.action && child.action(record);
                                };
                                return (
                                    <Menu.Item>
                                        <a onClick={onClick}>{child.label}</a>
                                    </Menu.Item>
                                );
                            })}
                        </Menu>
                    );
                    return (
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link">
                                {action.label} <Icon type="down" />
                            </a>
                        </Dropdown>
                    );
                } else {
                    const onClick = () => {
                        action.action && action.action(record);
                    };
                    return [
                        <a onClick={onClick}>{action.label}</a>,
                        i === 0 && <span className="ant-divider" />,
                    ];
                }
            })}
        </span>
    );
};

/** Your component */
export class DataTable extends React.Component {
    static storageKey = 'antd-data-table';

    static defaultProps = {
        pageSize: 10,
        searchBtnText: 'Search',
        clearBtnText: 'Clear',
        listSelectionBtnText: 'List selection',
    };

    actionsColumn = this.props.rowActions && {
        key: 'actions',
        title: 'Actions',
        render: record => {
            return renderActions(this.props.rowActions, record);
        },
    };

    shouldShowTableTitle = this.props.title || this.props.enableListSelection;

    initialColumns = this.actionsColumn
        ? [...this.props.initialColumns, this.actionsColumn]
        : this.props.initialColumns;

    visibleColumnKeys = global.localStorage
        ? localStorage.getItem(`${DataTable.storageKey}-${this.props.name}-columnIds`)
        : undefined;

    visibleColumns =
        this.props.enableListSelection === true && this.visibleColumnKeys
            ? this.initialColumns.filter(
                  column => this.visibleColumnKeys.indexOf(column.key) !== -1
              )
            : this.initialColumns;

    state = {
        columns: ([] = this.visibleColumns),
        data: [],
        page: 1,
        pagination: {
            pageSize: this.props.pageSize,
        },
        currentValues: {},
        tableLoading: false,
        searchButtonLoading: false,
        selectedRows: [],
        selectedRowKeys: [],
    };

    filterPannel = (
        <Card bodyStyle={{ padding: '1em', width: '12em' }}>
            {this.initialColumns.map(column => {
                const isSelected =
                    this.state.columns.find(c => c.key === column.key) !== undefined;
                const onChange = e => {
                    if (e.target.checked) {
                        this.showColumn(column.key);
                    } else {
                        this.hideColumn(column.key);
                    }
                };
                return (
                    <p
                        key={column.key}
                        style={{ marginTop: '.5em', marginBottom: '.5em' }}
                    >
                        <Checkbox defaultChecked={isSelected} onChange={onChange}>
                            {column.title}
                        </Checkbox>
                    </p>
                );
            })}
        </Card>
    );

    constructor(props) {
        super(props);

        if (this.props.enableListSelection && !this.props.name) {
            console.warn('`name` is required while `enableListSelection` is true!');
        }
    }

    fetch = async (page, values = this.state.currentValues, clearPagination = false) => {
        const { onError } = this.props;
        this.applyValues(values, async () => {
            try {
                // 这里先简单认为 clearPagination 为 true 就是从 Search button 触发的 fetch
                clearPagination && this.startSearchButtonLoading();
                this.startTableLoading();
                const pager = { ...this.state.pagination };
                const response = await this.props.onSearch({
                    page: page,
                    // pageSize 有 default
                    pageSize: this.props.pageSize,
                    values: this.state.currentValues,
                });
                pager.total = response.total;
                this.setState({
                    pagination: pager,
                });
                this.applyData(response.dataSource);
                clearPagination && this.clearPagination();
            } catch (e) {
                onError && onError(e);
            } finally {
                clearPagination && this.stopSearchButtonLoading();
                this.stopTableLoading();
            }
        });
    };

    saveVisibleColumnKeysToStorage = columns => {
        localStorage.setItem(
            `${DataTable.storageKey}-${this.props.name}-columnIds`,
            columns.map(column => column.key).join(',')
        );
    };

    applyData = data => {
        this.setState({ data });
    };

    applyValues = (values, cb) => {
        this.setState({ currentValues: values }, cb);
    };

    clearPagination = () => {
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({ pagination: pager });
    };

    handleChange = pagination => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({ pagination: pager });
        this.fetch(pager.current || 1); // tslint:disable-line
    };

    hideColumn = key => {
        this.state.columns.forEach((column, i) => {
            if (column.key === key) {
                const columns = update(this.state.columns, { $splice: [[i, 1]] });
                this.setState(
                    {
                        columns,
                    },
                    () => this.saveVisibleColumnKeysToStorage(columns)
                );
            }
        });
    };

    clearSelection = () => {
        this.setState({
            selectedRows: [],
            selectedRowKeys: [],
        });
    };

    showColumn = key => {
        this.initialColumns.forEach((column, i) => {
            if (column.key === key) {
                const columns = update(this.state.columns, { $splice: [[i, 0, column]] });
                this.setState(
                    {
                        columns,
                    },
                    () => this.saveVisibleColumnKeysToStorage(columns)
                );
            }
        });
    };

    startTableLoading = () => {
        this.setState({ tableLoading: true });
    };

    stopTableLoading = () => {
        this.setState({ tableLoading: false });
    };

    startSearchButtonLoading = () => {
        this.setState({ searchButtonLoading: true });
    };

    stopSearchButtonLoading = () => {
        this.setState({ searchButtonLoading: false });
    };

    tableTitle = currentPageData => {
        if (this.shouldShowTableTitle) {
            return (
                <Row type="flex">
                    <Col span={12}>{this.props.title}</Col>
                    <Col span={12}>
                        <Row type="flex" justify="end">
                            <Col>
                                {this.props.enableListSelection && (
                                    <Dropdown
                                        overlay={this.filterPannel}
                                        trigger={['click']}
                                    >
                                        <Button size="small">
                                            {this.props.listSelectionBtnText}
                                        </Button>
                                    </Dropdown>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        }
    };

    accordingly = (dataIndex, record) => {
        const indexArr = dataIndex.split('.');
        const key = indexArr.shift() || '';
        const index = indexArr.join('.');
        const subData = record[key] || {};
        const value = record[key] || '';
        return indexArr.length ? this.accordingly(index, subData) : value;
    };

    renderExpandedRow = record => {
        const { initialExpands } = this.props;
        const expandTitleStyle = {
            textAlign: 'right',
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: 500,
        };
        if (initialExpands) {
            return (
                <Row gutter={16}>
                    {initialExpands.map(col => {
                        const value = this.accordingly(col.dataIndex, record);
                        return (
                            <Col sm={12} md={8} xl={6}>
                                <Row gutter={8}>
                                    <Col span={8} style={expandTitleStyle}>
                                        {col.title}
                                    </Col>
                                    <Col span={16}>
                                        {col.render ? col.render(value, record) : value}
                                    </Col>
                                </Row>
                            </Col>
                        );
                    })}
                </Row>
            );
        }
    };

    render() {
        const rowSelection = Object.assign(
            {},
            {
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({
                        selectedRowKeys,
                        selectedRows,
                    });
                },
            },
            this.props.rowSelection
        );

        const ActionPanel = this.props.plugins && (
            <Row
                className="operationpannel"
                gutter={16}
                type="flex"
                style={{ paddingBottom: '1em' }}
            >
                {this.props.plugins.map(plugin => {
                    return (
                        <Col span={plugin.colSpan}>
                            {plugin.renderer(
                                this.state.selectedRowKeys,
                                this.state.selectedRows,
                                this.clearSelection
                            )}
                        </Col>
                    );
                })}
            </Row>
        );

        return (
            <div>
                <div>
                    <SearchField
                        {...this.props}
                        fetch={this.fetch}
                        btnLoading={this.state.searchButtonLoading}
                    />
                </div>
                <div>
                    {this.props.affixTarget ? (
                        <Affix
                            target={this.props.affixTarget}
                            offsetBottom={this.props.affixOffsetBottom}
                            offsetTop={this.props.affixOffsetTop}
                        >
                            {ActionPanel}
                        </Affix>
                    ) : (
                        ActionPanel
                    )}
                    <Row>
                        <Table
                            bordered
                            size="middle"
                            {...(this.shouldShowTableTitle && { title: this.tableTitle })}
                            rowSelection={rowSelection}
                            rowKey={this.props.rowKey}
                            loading={this.state.tableLoading}
                            columns={this.state.columns}
                            dataSource={this.state.data}
                            onChange={this.handleChange}
                            pagination={this.state.pagination}
                            expandedRowRender={
                                this.props.initialExpands
                                    ? this.renderExpandedRow
                                    : undefined
                            }
                        />
                    </Row>
                </div>
            </div>
        );
    }
}

/** Export as default */
export default DataTable;
