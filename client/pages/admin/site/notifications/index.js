import React, { useState } from 'react';
import Moment from 'moment';
import Head from 'next/head';
import Utils from '/modules/utils';
import Form from 'components/uielements/form';
import Input from 'components/uielements/input';
import Select from 'components/uielements/select';
import DatePicker from 'components/uielements/datePicker';
import Button from '/components/uielements/button';
import FlexView from '/components/FlexView';
import Layout, { DataWrapper, DataContainer } from '/components/Layout';
import BaseForm from '/container/baseForm';
import Table from '/container/Tables/TableViews/';
import Modal, { ModalContent } from '/components/Feedback/Modal';
import getNotifications from '/ajax/v2/notification/fetch';
import create from '/ajax/v2/notification/create';
import deleteNotification from '/ajax/v2/notification/delete';
import withAAContext from '/modules/pages/withAAContext';

const categoryMapping = {
    new_release: 'NEW RELEASE',
    data_change: 'DATA CHANGE',
    updates: 'UPDATES',
};

const permissionMapping = {
    intelligence: 'INT',
    free: 'FREE',
};

const formList = [
    {
        type: 'SELECT',
        label: 'Publish(ed)',
        field: 'published',
        placeholder: 'All',
        initialValue: '0',
        width: 200,
        list: [
            { id: '0', name: 'All' },
            { id: '1', name: 'Published' },
            { id: '2', name: 'Unpublished' },
        ],
    },
    {
        type: 'INPUT',
        label: 'Search',
        field: 'keyword',
        width: 200,
        placeholder: 'Keyword',
        initialValue: '',
    },
];

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: true,
    },
    {
        title: 'Content',
        dataIndex: 'content',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        render(category) {
            return categoryMapping[category];
        },
    },
    {
        title: 'Target Audience',
        dataIndex: 'permissions',
        render(permissions) {
            return permissionMapping[permissions];
        },
    },
    {
        title: 'Published',
        dataIndex: 'published',
    },
    {
        title: 'Publish(ed) at',
        dataIndex: 'Published_at',
        render: Utils.formateDate,
    },
];

const FormItem = Form.Item;

const Index = ({ pathname, query, notifications }) => {
    let notificationForm;
    const [notification, setNotification] = React.useState('');
    const [selectedRow, setSelectedRow] = React.useState('');
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState({});
    const [modal, setModal] = React.useState({
        visible: false,
        title: '',
        type: '',
    });

    const handleFilter = params => {
        console.log('params:', params);
    };

    const handleOperator = type => {
        let item = selectedItem;
        if (type == 'create') {
            setModal({
                visible: true,
                title: 'Create Notification',
                type,
            });
        } else if (type == 'edit' || type == 'detail') {
            if (!item) {
                Modal.info({
                    title: 'Info',
                    content: 'Please select one notification.',
                });
                return;
            }
            setModal({
                visible: true,
                title: type == 'edit' ? 'Edit Notification' : 'View Details',
                type,
            });
            setNotification(item);
        } else if (type == 'delete') {
            if (Object.keys(item).length == 0) {
                Modal.info({
                    title: 'Info',
                    content: 'Please select one notification.',
                });
                return;
            }
            Modal.confirm({
                content: 'Are you sure you want to delete this notification？',
                onOk: () => {
                    console.log('handle ajax call');
                },
            });
        }
    };

    const handleSubmit = () => {
        let type = modal.type;
        let data = notificationForm.props.form.getFieldsValue();
        console.log('type:', type);
        console.log('data:', data);
    };
    const setSelectValues = (keys, items) => {
        setSelectedRowKeys(keys);
        setSelectedItem(items);
    };
    return (
        <Layout pathname={pathname}>
            <Head>
                <title>App Annie - Admin - Notifications</title>
            </Head>
            <DataWrapper>
                <FlexView column gutter="20px">
                    <DataContainer
                        title="Notifications"
                        actions={
                            <BaseForm formList={formList} filterSubmit={handleFilter} />
                        }
                        pickers={
                            <FlexView gutter="20px">
                                <Button
                                    type="primary"
                                    icon="plus"
                                    onClick={() => handleOperator('create')}
                                >
                                    Create Notification
                                </Button>
                                <Button
                                    icon="edit"
                                    onClick={() => handleOperator('edit')}
                                >
                                    Edit Notification
                                </Button>
                                <Button
                                    icon="solution"
                                    onClick={() => handleOperator('detail')}
                                >
                                    View Detail
                                </Button>
                                <Button
                                    type="danger"
                                    icon="delete"
                                    onClick={() => handleOperator('delete')}
                                >
                                    Delete
                                </Button>
                            </FlexView>
                        }
                    >
                        <Table
                            columns={columns}
                            dataSource={notifications}
                            pagination={notifications}
                            updateSelectedItem={setSelectValues}
                            selectedRowKeys={selectedRowKeys}
                        />
                    </DataContainer>
                </FlexView>
                <Modal
                    title={modal.title}
                    visible={modal.visible}
                    onOk={handleSubmit}
                    width={800}
                    onCancel={() => {
                        notificationForm.props.form.resetFields();
                        setModal({
                            isVisible: false,
                        });
                        setNotification('');
                    }}
                >
                    <NotificationForm
                        notification={notification}
                        type={modal.type}
                        wrappedComponentRef={inst => (notificationForm = inst)}
                    />
                </Modal>
            </DataWrapper>
        </Layout>
    );
};

class NotificationForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const notification = this.props.notification || {};
        const type = this.props.type;
        return (
            <Form layout="horizontal">
                <FormItem label="Published at" {...formItemLayout}>
                    {notification && type == 'detail'
                        ? notification.published_at
                        : getFieldDecorator('published_at', {
                              initialValue: Moment(notification.published_at),
                          })(<DatePicker />)}
                </FormItem>
                <FormItem label="Title" {...formItemLayout}>
                    {notification && type == 'detail'
                        ? notification.title
                        : getFieldDecorator('title', {
                              initialValue: notification.title,
                          })(<Input type="text" placeholder="title" />)}
                </FormItem>
                <FormItem label="Content" {...formItemLayout}>
                    {notification && type == 'detail'
                        ? notification.content
                        : getFieldDecorator('content', {
                              initialValue: notification.content,
                          })(<Input.TextArea rows={3} placeholder="content" />)}
                </FormItem>
                <FormItem label="url" {...formItemLayout}>
                    {notification && type == 'detail'
                        ? notification.url
                        : getFieldDecorator('url', {
                              initialValue: notification.url,
                          })(<Input type="text" placeholder="url" />)}
                </FormItem>
                <FormItem label="category" {...formItemLayout}>
                    {notification && type == 'detail'
                        ? notification.category
                        : getFieldDecorator('category', {
                              initialValue: notification.category,
                          })(
                              <Select>
                                  <Option value="new_release">NEW RELEASE</Option>
                                  <Option value="data_change">DATA CHANGE</Option>
                                  <Option value="updates">UPDATES</Option>
                              </Select>
                          )}
                </FormItem>
                <FormItem label="permissions" {...formItemLayout}>
                    {notification && type == 'detail'
                        ? notification.permissions
                        : getFieldDecorator('permissions', {
                              initialValue: notification.permissions,
                          })(
                              <Select>
                                  <Option value="intelligence">INT</Option>
                                  <Option value="free">FREE</Option>
                              </Select>
                          )}
                </FormItem>
            </Form>
        );
    }
}
NotificationForm = Form.create({})(NotificationForm);

Index.getInitialProps = async ({ pathname, query, req, res }) => {
    let isNetworkError = false;
    const notifications = await getNotifications(req, res).then(
        data => data,
        err => {
            console.error(err);
            isNetworkError = true;
            return {};
        }
    );
    return {
        pathname,
        query,
        notifications,
    };
};

export default withAAContext(Index);
