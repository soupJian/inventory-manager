import styled from "styled-components";

export const Wrapper = styled.div`
    padding: ${({padding}) => padding ? padding: "16px"};
    width: ${({width}) => width ? width: "100%"};
    height: ${({height}) => height ? height: "100%"};
    ${({styles}) => styles && styles}
`

export const Flex = styled.div`
    display: flex;
    align-items: ${({alignItems}) => alignItems ? alignItems : "center"};
    justify-content: ${({justifyContent}) => justifyContent ? justifyContent : "center"};
    ${({styles}) => styles && styles}
`

export const BaseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: ${({minWidth}) => minWidth ? minWidth : "100%"};
    min-height: ${({minHeight}) => minHeight ? minHeight : "45px"};
    background-color:${({kind}) => kind === "primary" ? "#000000" : kind === "secondary" ? "#ffffff" : "transparent"};
    font-size: ${({theme}) => theme.font.size.md};
    font-weight: ${({theme}) => theme.font.weight.medium};
    color: ${({kind}) => kind === "primary" ? "#ffffff" : kind === "secondary" ? "#000000" : "#000000"};
    border: none;
    outline: none;
    cursor: pointer;
    transition: all .25s ease-in-out;

    &:active {
        transform: scale(.98) translateY(2px);
    }
`