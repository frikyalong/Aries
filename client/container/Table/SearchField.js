import * as React from 'react';
import { Row, Col, Icon } from 'antd';
import Form from '/components/uielements/form';
import Input from '/components/uielements/input';
import Button from '/components/uielements/button';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form'; // tslint:disable-line
const FormItem = Form.Item;

import InputRenderer from './renderer/input';
import SelectRenderer from './renderer/select';
import DatePickerRenderer from './renderer/datePicker';
import TreeSelectRenderer from './renderer/treeSelect';

const comesWithRenderer = {
    input: InputRenderer,
    select: SelectRenderer,
    datePicker: DatePickerRenderer,
    treeSelect: TreeSelectRenderer,
};

/** Your component's props */
// export interface ISearchFieldProps extends IDataTableProps, FormComponentProps {
//   /** antd form instance */
//   fetch: SearchFunc,
//   btnLoading: boolean
// }

/** Your component's state */
// export interface ISearchFieldState {
//   expand: boolean
// }

/** Your component */
export class SearchField extends React.Component {
    state = {
        expand: false,
    };

    shouldHandleCollapse =
        this.props.maxVisibleFieldCount &&
        this.props.searchFields.length > this.props.maxVisibleFieldCount;

    componentDidMount() {
        if (this.props.loadDataImmediately) {
            this.onSearch();
        }
    }
    toggleExpand = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    getFields = () => {
        const { form, maxVisibleFieldCount, searchFields } = this.props;
        if (!form) {
            return false;
        }
        const { getFieldDecorator } = form;
        const formItemLayout = {
            wrapperCol: { span: 24 },
        };
        const count = this.state.expand
            ? searchFields.length
            : maxVisibleFieldCount || searchFields.length;
        return this.props.searchFields.map((searchField, i) => {
            const renderComponent = () => {
                if (searchField.renderer) {
                    return searchField.renderer(searchField.payload);
                } else {
                    if (searchField.type) {
                        if (comesWithRenderer[searchField.type]) {
                            return comesWithRenderer[searchField.type](
                                searchField.payload
                            );
                        } else {
                            console.warn('Unknown renderer:', searchField.type);
                            return false;
                        }
                    } else {
                        console.warn('Renderer or Type should exist in search field');
                        return false;
                    }
                }
            };
            return (
                <Col
                    span={searchField.span || 6}
                    key={i}
                    style={
                        this.shouldHandleCollapse
                            ? { display: i < count ? 'block' : 'none' }
                            : { display: 'block' }
                    }
                >
                    <FormItem {...formItemLayout} label={searchField.label}>
                        {getFieldDecorator(searchField.name, {
                            rules: searchField.validationRule,
                            initialValue: searchField.initialValue,
                        })(renderComponent())}
                    </FormItem>
                </Col>
            );
        });
    };

    clearField = () => {
        const { form } = this.props;
        if (!form) {
            return false;
        }

        form.resetFields();
    };

    onSearch = () => {
        const { form, onValidateFailed, fetch } = this.props;
        if (!form) {
            return false;
        }
        const { validateFields } = form;

        validateFields((err, values) => {
            // delete empty space
            for (let key in values) {
                if (!values[key]) {
                    delete values[key];
                }
            }
            if (err) {
                onValidateFailed && onValidateFailed(err);
                return;
            }
            // from search field search start from page 1
            fetch(1, values, true); // tslint:disable-line
        });
    };

    render() {
        return (
            <Form className="ant-advanced-search-form" style={{ marginBottom: '1em' }}>
                <Row gutter={40}>{this.getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button
                            type="primary"
                            onClick={this.onSearch}
                            loading={this.props.btnLoading}
                        >
                            {this.props.searchBtnText}
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.clearField}>
                            {this.props.clearBtnText}
                        </Button>
                        {this.shouldHandleCollapse && (
                            <a
                                style={{ marginLeft: 8, fontSize: 12 }}
                                onClick={this.toggleExpand}
                            >
                                Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                            </a>
                        )}
                    </Col>
                </Row>
            </Form>
        );
    }
}

/** Export as default */
export default Form.create()(SearchField);
