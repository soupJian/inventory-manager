import React from 'react'
import styled from "styled-components"

const FloatingBar = ({children,styles}) => {
    return (
        <FloatingBarWrapper styles={styles}>
            {children}
        </FloatingBarWrapper>
    )
}

export default React.memo(FloatingBar)

const FloatingBarWrapper = styled.div`
    max-width: 750px;
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: ${({theme}) => theme.colors.barBackground};
    border-radius: 10px;
    padding: 14px 24px 14px 28px;
    z-index: ${({theme}) => theme.zIndex.fixed};
    ${({styles}) => styles && styles};
`