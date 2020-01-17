import React from 'react';
import Head from 'next/head';
import { Col } from 'antd';

import Layout, { DataWrapper, DataContainer } from '/components/Layout';
import FlexView from '/components/FlexView';

import Form from '/components/uielements/form';
import Input, { InputSearch, InputGroup, Textarea } from '/components/uielements/input';
import InputNumber from '/components/uielements/InputNumber';
import Select, { SelectOption } from '/components/uielements/select';
import Tabs, { TabPane } from '/components/uielements/tabs';
import DatePicker from '/components/uielements/datePicker';
import AutoComplete from '/components/uielements/autocomplete';
import Button, { ButtonGroup } from '/components/uielements/button';
import Progress from '/components/uielements/progress';
import Checkbox, { CheckboxGroup } from '/components/uielements/checkbox';
import Radio, { RadioGroup } from '/components/uielements/radio';
import withAAContext from '/modules/pages/withAAContext';

const Option = SelectOption;
const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
};
const colStyle = {
    marginBottom: '16px',
};
const marginStyle = {
    margin: '0 10px 10px 0',
};
const margin = {
    margin: '0 8px 8px 0',
};
const gutter = 16;

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
function callback(key) {}
const handleOnChange = checkedValues => {};
const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
];
const defaultCheckedList = ['Apple', 'Orange'];
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const Index = ({ pathname }) => {
    return (
        <Layout pathname={pathname}>
            <Head>
                <title>App Annie - Admin - Demo - Form</title>
            </Head>

            <DataWrapper>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="input">
                        <Input placeholder="Basic usage" />
                        <InputGroup size="large" style={{ marginBottom: '15px' }}>
                            <Col span={4}>
                                <Input defaultValue="0571" />
                            </Col>
                            <Col span={8}>
                                <Input defaultValue="26888888" />
                            </Col>
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Select defaultValue="Zhejiang">
                                <Option value="Zhejiang">Zhejiang</Option>
                                <Option value="Jiangsu">Jiangsu</Option>
                            </Select>
                            <Input
                                style={{ width: '50%' }}
                                defaultValue="Xihu District, Hangzhou"
                            />
                        </InputGroup>
                        <br />
                    </DataContainer>
                    <DataContainer title="Input">
                        <Textarea rows={6} />
                        <InputSearch placeholder="input search text" />
                    </DataContainer>
                </FlexView>
                <FlexView column gutter="20px">
                    <DataContainer title="Validation Form">
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="failLabel"
                                validateStatus="error"
                                help="failHelp"
                            >
                                <Input placeholder="unavailable choice" id="error" />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="warningLabel"
                                validateStatus="warning"
                            >
                                <Input placeholder="Warning" id="warning" />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="ValidatingLabel"
                                hasFeedback
                                validateStatus="validating"
                                help="ValidatingHelp"
                            >
                                <Input
                                    placeholder="I'm the content is being validated"
                                    id="validating"
                                />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="SuccessLabel"
                                hasFeedback
                                validateStatus="success"
                            >
                                <Input placeholder="I'm the content" id="success" />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="FeedbackLabel"
                                hasFeedback
                                validateStatus="warning"
                            >
                                <Input placeholder="Warning" id="warning1" />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="FailhasFeedbackLabel"
                                hasFeedback
                                validateStatus="error"
                                help="FailhasFeedbackHelp"
                            >
                                <Input placeholder="unavailable choice" id="error1" />
                            </FormItem>
                        </Form>
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Apps you might be interested in">
                        <Progress percent={30} style={marginStyle} />
                        <Progress percent={50} status="active" style={marginStyle} />
                        <Progress percent={70} status="exception" style={marginStyle} />
                        <Progress percent={100} style={marginStyle} />
                        <Progress percent={50} showInfo={false} style={marginStyle} />
                    </DataContainer>
                    <DataContainer title="Apps you might be interested in">
                        <Progress type="circle" percent={75} style={marginStyle} />
                        <Progress
                            type="circle"
                            percent={70}
                            status="exception"
                            style={marginStyle}
                        />
                        <Progress type="circle" percent={100} style={marginStyle} />
                    </DataContainer>
                    <DataContainer title="Apps you might be interested in">
                        <Progress type="dashboard" percent={75} />
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Apps you might be interested in">
                        <Button type="primary" style={margin}>
                            "simpleButtonPrimaryText"
                        </Button>
                        <Button style={margin}>"simpleButtonDefaultText"</Button>
                        <Button type="dashed" style={margin}>
                            "simpleButtonDashedText"
                        </Button>
                        <Button type="danger">"simpleButtonDangerText"</Button>
                        <br />
                        <Button
                            type="primary"
                            shape="circle"
                            icon="search"
                            style={margin}
                        />
                        <Button type="primary" icon="search" style={margin}>
                            "iconPrimaryButton"
                        </Button>
                        <Button shape="circle" icon="search" style={margin} />
                        <Button icon="search">"iconSimpleButton"</Button>
                        <br />
                        <Button type="primary" loading style={margin}>
                            Loading
                        </Button>
                        <Button type="primary" size="small" loading>
                            Loading
                        </Button>
                        <br />
                        <ButtonGroup style={margin}>
                            <Button>Cancel</Button>
                            <Button type="primary">OK</Button>
                        </ButtonGroup>
                        <ButtonGroup style={margin}>
                            <Button disabled>L</Button>
                            <Button disabled>M</Button>
                            <Button disabled>R</Button>
                        </ButtonGroup>
                        <ButtonGroup style={margin}>
                            <Button type="primary">L</Button>
                            <Button>M</Button>
                            <Button>M</Button>
                            <Button type="dashed">R</Button>
                        </ButtonGroup>
                    </DataContainer>
                    <DataContainer title="Apps you might be interested in">
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Tab 1" key="1">
                                Content of Tab Pane 1
                            </TabPane>
                            <TabPane tab="Tab 2" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </DataContainer>
                </FlexView>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Apps you might be interested in">
                        <Checkbox onChange={handleOnChange}>Checkbox</Checkbox>
                        <CheckboxGroup
                            options={plainOptions}
                            defaultValue={['Apple']}
                            onChange={handleOnChange}
                        />
                        <br />
                        <CheckboxGroup
                            options={options}
                            defaultValue={['Pear']}
                            onChange={handleOnChange}
                        />
                        <br />
                        <CheckboxGroup
                            options={optionsWithDisabled}
                            disabled
                            defaultValue={['Apple']}
                            onChange={handleOnChange}
                        />
                    </DataContainer>
                    <DataContainer title="Apps you might be interested in">
                        <Radio>Radio</Radio>
                        <Radio defaultChecked={false} disabled>
                            Disabled
                        </Radio>
                        <Radio defaultChecked disabled>
                            Disabled
                        </Radio>
                        <br />
                        <RadioGroup onChange={handleOnChange} name="value" value={1}>
                            <Radio style={radioStyle} value={1}>
                                Option A
                            </Radio>
                            <Radio style={radioStyle} value={2}>
                                Option B
                            </Radio>
                            <Radio style={radioStyle} value={3}>
                                Option C
                            </Radio>
                        </RadioGroup>
                    </DataContainer>
                </FlexView>
            </DataWrapper>
        </Layout>
    );
};

Index.getInitialProps = async ({ pathname, query, req, res }) => {
    return {
        pathname,
    };
};

export default Index;
