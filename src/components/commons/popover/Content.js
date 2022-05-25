import styled from "styled-components"
import { useClickOutside } from "../../../hooks"

const Content = ({children, closeOnClickOutside, wrapperRef, styles}) => {
    useClickOutside(wrapperRef, closeOnClickOutside);
    return (
        <ContentWrapper styles={styles}>
            {children}
        </ContentWrapper>
    )
}

export default Content

const ContentWrapper = styled.div`
    position: absolute;
    bottom: -8px;
    right: 0%;
    z-index: ${({theme}) => theme.zIndex.popover};
    transform: translate(0%, 100%);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    ${({styles}) => styles && styles}
`