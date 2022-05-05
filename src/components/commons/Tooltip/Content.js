import styled from "styled-components"

const Content = ({children, styles, place}) => {
    return (
        <ContentWrapper styles={styles} place={place}>
            {children}
        </ContentWrapper>
    )
}

export default Content

const ContentWrapper = styled.div`
    position: absolute;
    bottom: ${({place}) => place === "top" ? "unset" : "-8px"};
    top: ${({place}) => place === "top" ? "-4px" : "unset"};
    right: 0%;
    z-index: ${({theme}) => theme.zIndex.popover};
    transform: translate(0%, 100%);
    transform: ${({place}) => place === "top" ? "translate(0%, -100%)" : "translate(0%, 100%)"};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    ${({styles}) => styles && styles}
`