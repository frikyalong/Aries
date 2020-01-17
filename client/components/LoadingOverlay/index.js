// @flow strict
import * as React from 'react';
import styled from 'styled-components';
import FlexView from '/components/FlexView';
import Spinner from '/components/uielements/spin';
import * as colors from '/components/style/colors';

const Loading = styled(FlexView).attrs({
    vAlignContent: 'center',
    hAlignContent: 'center',
})`
    position: ${props => (props.position ? props.position : 'fixed')};
    top: 0;
    left: 0;
    width: 100%;
    height: ${props => (props.position === 'relative' ? '300px' : '100%')};
    opacity: ${props => (props.opaque ? '1' : '0.3')};
    background-color: ${props =>
        props.opaque ? colors.background.gray2 : colors.text.normal};
    transition: opacity 0.2s, background-color 0.2s;
    z-index: 1;
`;

const Note = styled.div`
    color: ${colors.text.grayLight};
`;

const LoadingOverlay = ({ position, opaque, className, note }) => {
    const classes = className;

    const [showNote, setShowNote] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowNote(true);
        }, 3000);

        return () => clearTimeout(timer);
    });

    const child = (
        <FlexView column hAlignContent="center" gutter="10px">
            <Spinner size={30} color={colors.text.gray} />
            {showNote && (
                <Note>{note || 'Loading lots of data (this could take a moment).'}</Note>
            )}
        </FlexView>
    );

    if (position === 'absolute' || position === 'relative') {
        return (
            <Loading className={classes} position={position} opaque={opaque}>
                {child}
            </Loading>
        );
    }

    return (
        <Loading className={classes} opaque={opaque}>
            {child}
        </Loading>
    );
};

export { Loading };
export default LoadingOverlay;
