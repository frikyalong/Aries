import styled from 'styled-components';
import FlexView from '/components/FlexView';
import * as colors from '/components/style/colors';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import DataContainer from './DataContainer';

const PAGE_MIN_WIDTH = '992px';
const PageWrapper = styled(FlexView)`
    min-width: ${PAGE_MIN_WIDTH};
    box-sizing: border-box;
    padding-left: 200px;
`;
const PageContent = styled(FlexView).attrs({
    grow: true,
    column: true,
    basis: '100%',
})`
    position: relative;
    z-index: 0;
    min-height: 100vh;
    background-color: ${colors.brandV2.blue_5};
`;

const Main = styled(FlexView).attrs({
    grow: true,
    column: true,
    vAlignContent: 'stretch',
})`
    padding: 0;
`;

const DataWrapper = styled(FlexView).attrs({
    column: true,
    gutter: '15px',
})`
    padding: 15px 20px;
    background-color: ${colors.brandV2.blue_5};
`;

const PageLayout = ({ pathname, children, isNetworkError }) => {
    const [showNetworkError, setNetworkError] = React.useState(isNetworkError);
    React.useEffect(() => {
        setNetworkError(isNetworkError);
    }, [isNetworkError]);

    let error;
    if (showNetworkError) {
        // error = (
        //     <Toast
        //         type="error"
        //         onClose={() => {
        //             setNetworkError(false);
        //         }}
        //     >
        //         'Something went wrong. Please try again later.'
        //     </Toast>
        // );
        error = 'Something went wrong. Please try again later.';
    }
    return (
        <>
            <Sidebar current={pathname} />
            <PageWrapper vAlignContent="top">
                <PageContent>
                    <Header />
                    <Main>{children}</Main>
                    <Footer />
                </PageContent>
                {error}
            </PageWrapper>
        </>
    );
};
export default PageLayout;
export { DataWrapper, DataContainer };
