import styled from 'styled-components';
import FlexView from '/components/FlexView';
import * as colors from '/components/style/colors';
import Header from './Header/FullHeader';
import Footer from './Footer';
import Sidebar from './Sidebar';
import DataContainer from './DataContainer';
import { DataWrapper } from './index';

const PAGE_MIN_WIDTH = '992px';
const PageWrapper = styled(FlexView)`
    min-width: ${PAGE_MIN_WIDTH};
    box-sizing: border-box;
`;
const PageContent = styled(FlexView).attrs({
    grow: true,
    column: true,
    basis: '100%',
})`
    position: relative;
    z-index: 0;
    min-height: 100vh;
`;

const Main = styled(FlexView).attrs({
    grow: true,
    column: true,
    vAlignContent: 'stretch',
})`
    padding: 0;
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
            <PageWrapper vAlignContent="top">
                <PageContent>
                    <Header />
                    <Main>{children}</Main>
                </PageContent>
                {error}
            </PageWrapper>
        </>
    );
};
export default PageLayout;
