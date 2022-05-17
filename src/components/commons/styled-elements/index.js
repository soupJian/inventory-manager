import styled from "styled-components";

export const Wrapper = styled.div`
    padding: ${({padding}) => padding ? padding: "16px"};
    width: ${({width}) => width ? width: "100%"};
    height: ${({height}) => height ? height: "100%"};
    ${({styles}) => styles && styles}
`

export const Flex = styled.div`
    display: flex;
    flex-direction: ${({direction}) => direction ? direction : "row"};
    align-items: ${({alignItems}) => alignItems ? alignItems : "center"};
    justify-content: ${({justifyContent}) => justifyContent ? justifyContent : "center"};
    gap: ${({gap}) => gap ? gap : ""};
    ${({styles}) => styles && styles}
`
export const Text = styled.span`
    font-size: ${({theme, size}) => size ? size : theme.font.size.md};
    font-weight: ${({theme, weight}) => weight ? weight : theme.font.weight.normal};
    color: ${({theme, color}) => color ? color : theme.colors.primaryText};
    font-family: ${({theme, family}) => family ? family : theme.font.family.primary};
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
    ${({styles}) => styles && styles}
    
    &:active {
        transform: scale(.98) translateY(2px);
    }
`

export const Label = styled.label`
    font-size: ${({theme}) => theme.font.size.xs};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.primaryText};
    text-transform: uppercase;
    font-weight: ${({theme}) => theme.font.weight.medium};
    cursor: pointer;
`
export const InputGroup = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
`