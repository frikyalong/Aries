import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout, { DataWrapper, DataContainer } from '/components/Layout';
import FlexView from '/components/FlexView';
import Button from '/components/uielements/button';
import Alert from '/components/Feedback/Alert';
import message from '/components/Feedback/Message';
import Modal, { ModalContent } from '/components/Feedback/Modal';
import Spin from '/components/uielements/spin';
import withAAContext from '/modules/pages/withAAContext';

const style = {
    textAlign: 'center',
    background: '#f1f3f6',
    padding: '30px 50px',
};

const marginBot = {
    marginBottom: '10px',
};

const marginStyle = { marginRight: '5px', marginBottom: '5px' };

const MessageContent = styled.p`
    display: inline-block;
    font-size: 13px;
`;

const onClose = function(e) {};

const info = () => {
    message.info('This is a normal message');
};
const success = () => {
    message.success(
        <MessageContent>
            This is a message of success will dessapear after 3 seconds
        </MessageContent>,
        3
    );
};

const error = () => {
    message.error(<MessageContent>This is a message of error</MessageContent>, 10);
};

const warning = () => {
    message.warning(<MessageContent>This is message of warning</MessageContent>);
};

const loadSuccess = () => {
    const hide = message.loading(
        <MessageContent>Action in progress..</MessageContent>,
        0
    );
    setTimeout(hide, 2500);
};

const Index = ({ pathname }) => {
    const [state, setState] = React.useState({
        loading: false,
        visible: false,
    });
    const showModal = () => {
        setState({
            visible: true,
        });
    };

    const handleOk = () => {
        setState({ loading: true });
        setTimeout(() => {
            setState({ loading: false, visible: false });
        }, 2000);
    };
    const handleCancel = () => {
        setState({ visible: false });
    };
    return (
        <Layout pathname={pathname}>
            <Head>
                <title>App Annie - Admin - Demo - Feedback</title>
            </Head>

            <DataWrapper>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <DataContainer title="Alert">
                        <Alert
                            message="feedback.alert.success"
                            type="success"
                            style={marginBot}
                        />
                        <Alert
                            message="feedback.alert.info"
                            type="info"
                            style={marginBot}
                        />
                        <Alert
                            message="feedback.alert.warning"
                            type="warning"
                            style={marginBot}
                        />
                        <Alert message="feedback.alert.error" type="error" />
                        <Alert
                            message="feedback.alert.warningDescription"
                            type="warning"
                            closable
                            onClose={onClose}
                            style={marginBot}
                        />
                        <Alert
                            message="feedback.alert.error"
                            description="feedback.alert.errorDescription"
                            type="error"
                            closable
                            onClose={onClose}
                        />
                        <Alert
                            message="feedback.alert.success"
                            type="success"
                            style={marginBot}
                        />
                        <Alert
                            message="feedback.alert.info"
                            type="info"
                            style={marginBot}
                        />
                        <Alert
                            message="feedback.alert.warning"
                            type="warning"
                            style={marginBot}
                        />
                        <Alert message="feedback.alert.error" type="error" />
                        <Alert
                            message="feedback.alert.successTips"
                            description="feedback.alert.successTipsDescription"
                            type="success"
                            showIcon
                            style={marginBot}
                        />
                        <Alert
                            message="feedback.alert.informationTips"
                            description="feedback.alert.informationDescription"
                            type="info"
                            showIcon
                            style={marginBot}
                        />
                        <Alert
                            message="feedback.alert.warningTips"
                            description="feedback.alert.warningDescription"
                            type="warning"
                            showIcon
                            style={marginBot}
                        />
                        <Alert
                            message="feedback.alert.errorTips"
                            description="feedback.alert.errorDescription"
                            type="error"
                            showIcon
                        />
                    </DataContainer>
                    <FlexView column gutter="20px">
                        <DataContainer title="Message">
                            <Button type="primary" onClick={info}>
                                displayMessage
                            </Button>
                            <Button onClick={success} style={marginStyle}>
                                "feedback.alert.successText"
                            </Button>
                            <Button onClick={error} style={marginStyle}>
                                "feedback.alert.errorText"
                            </Button>
                            <Button onClick={warning}>
                                "feedback.alert.warningText"
                            </Button>
                        </DataContainer>
                        <DataContainer title="Modal">
                            <Button type="primary" onClick={showModal}>
                                simpleModalDialogue
                            </Button>
                            <Modal
                                visible={state.visible}
                                title="Title"
                                onOk={handleOk}
                                onCancel={handleCancel}
                                footer={[
                                    <Button
                                        key="back"
                                        size="large"
                                        onClick={handleCancel}
                                    >
                                        Return
                                    </Button>,
                                    <Button
                                        key="submit"
                                        type="primary"
                                        size="large"
                                        loading={state.loading}
                                        onClick={handleOk}
                                    >
                                        Submit
                                    </Button>,
                                ]}
                            >
                                <p>
                                    Far far away, behind the word mountains, far from the
                                    countries Vokalia and Consonantia, there live the
                                    blind texts. Separated they live in Bookmarksgrove
                                    right at the coast of the Semantics, a large language
                                    ocean.
                                </p>
                                <p>Some contents...</p>
                            </Modal>
                        </DataContainer>
                        <DataContainer title="Spin">
                            <Spin size="small" />
                            <Spin />
                            <Spin size="large" />
                        </DataContainer>
                        <DataContainer title="Spin">
                            <div style={style}>
                                <Spin />
                            </div>
                        </DataContainer>
                    </FlexView>
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
