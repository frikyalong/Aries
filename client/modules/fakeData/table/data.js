import * as React from 'react';
import { message, Button } from 'antd';

export const onSearch = async info => {
    const params = {
        _page: info.page,
        _limit: info.pageSize,
        ...info.values,
    };
    const res = {
        data: [
            {
                userId: 1,
                id: 1,
                title:
                    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body:
                    'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
            },
            {
                userId: 1,
                id: 2,
                title: 'qui est esse',
                body:
                    'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
            },
            {
                userId: 1,
                id: 3,
                title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
                body:
                    'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
            },
            {
                userId: 1,
                id: 4,
                title: 'eum et est occaecati',
                body:
                    'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            },
            {
                userId: 1,
                id: 5,
                title: 'nesciunt quas odio',
                body:
                    'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
            },
            {
                userId: 1,
                id: 6,
                title: 'dolorem eum magni eos aperiam quia',
                body:
                    'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
            },
            {
                userId: 1,
                id: 7,
                title: 'magnam facilis autem',
                body:
                    'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
            },
            {
                userId: 1,
                id: 8,
                title: 'dolorem dolore est ipsam',
                body:
                    'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',
            },
            {
                userId: 1,
                id: 9,
                title: 'nesciunt iure omnis dolorem tempora et accusantium',
                body:
                    'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas',
            },
            {
                userId: 1,
                id: 10,
                title: 'optio molestias id quia eum',
                body:
                    'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
            },
        ],
    };
    return {
        dataSource: res.data,
        total: Number(res.data.length),
    };
};

export const onError = e => {
    message.error(e.message);
};

export const columns = [
    {
        key: 'id',
        title: 'ID',
        dataIndex: 'id',
    },
    {
        key: 'title',
        title: 'Title',
        dataIndex: 'title',
    },
];

export const expands = [
    {
        title: 'Body',
        dataIndex: 'body',
        render(value, record) {
            return value && `${value.substr(0, 100)} ...`;
        },
    },
    {
        title: 'User ID',
        dataIndex: 'userId',
    },
];

export const searchFields = [
    {
        label: 'ID',
        name: 'id',
        type: 'input',
        payload: {
            props: {
                placeholder: 'placeholder',
            },
        },
    },
    {
        label: 'Select',
        name: 'select',
        type: 'select',
        initialValue: '1',
        payload: {
            props: {
                allowClear: true,
            },
            options: [
                { key: '1', label: 'one', value: '1' },
                { key: '2', label: 'two', value: '2' },
                { key: '3', label: 'three', value: '3' },
            ],
        },
    },
    {
        label: 'Multi Select',
        name: 'multi-select',
        type: 'select',
        span: 12,
        payload: {
            props: {
                mode: 'multiple',
            },
            options: [
                { key: '1', label: 'one', value: '1' },
                { key: '2', label: 'two', value: '2' },
                { key: '3', label: 'three', value: '3' },
            ],
        },
    },
    {
        label: 'Date Picker',
        name: 'datePicker',
        type: 'datePicker',
        payload: {},
    },
    {
        label: 'Tree Select',
        name: 'treeselect',
        type: 'treeSelect',
        payload: {
            props: {
                treeData: [
                    {
                        label: 'Node1',
                        value: '0-0',
                        key: '0-0',
                        children: [
                            {
                                label: 'Child Node1',
                                value: '0-0-1',
                                key: '0-0-1',
                            },
                            {
                                label: 'Child Node2',
                                value: '0-0-2',
                                key: '0-0-2',
                            },
                        ],
                    },
                    {
                        label: 'Node2',
                        value: '0-1',
                        key: '0-1',
                    },
                ],
            },
        },
    },
    {
        label: 'Foo',
        name: 'foo',
        type: 'input',
    },
    {
        label: 'Bar',
        name: 'bar',
        type: 'input',
    },
];

export const plugins = [
    {
        renderer(selectedRowKeys, selectedRows, clearSelectionCallback) {
            const onClick = () => {
                action('onClick test plugin')(selectedRowKeys);
                clearSelectionCallback();
            };
            return <Button onClick={onClick}>Plugin A</Button>;
        },
    },
    {
        renderer(selectedRowKeys, selectedRows, clearSelectionCallback) {
            const onClick = () => {
                action('onClick test plugin')(selectedRowKeys);
                clearSelectionCallback();
            };
            return <Button onClick={onClick}>Plugin 2</Button>;
        },
    },
];

export const actions = [
    {
        label: 'Edit',
        action(record) {
            action('onClick edit')(record);
        },
    },
    {
        label: 'More',
        children: [
            {
                label: 'Remove',
                action(record) {
                    action('onClick remove')(record);
                },
            },
            {
                label: 'Open',
                action(record) {
                    action('onClick open')(record);
                },
            },
        ],
    },
];
