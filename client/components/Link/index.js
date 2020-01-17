// @flow strict
import * as React from 'react';
import NextLink from 'next/link';

const Link = props => {
    const { href, linkAs, ...linkProps } = props;
    if (props.target !== '_blank' && href && linkAs) {
        // Next.js does not allow string directly inside <Link>
        return (
            <NextLink href={href} as={linkAs}>
                <a {...linkProps} />
            </NextLink>
        );
    }

    return (
        <a
            {...linkProps}
            href={linkAs || href}
            rel={props.target === '_blank' ? 'noopener noreferrer' : undefined}
        />
    );
};

export default Link;
