import styled from "styled-components"

const Input = ({wrapperStyles, inputStyles, placeholderStyles, type = "text", startIcon, endIcon, ...rest}) => {
    return (
        <Wrapper styles={wrapperStyles}>
            {
                startIcon && <SpanIcon>{startIcon}</SpanIcon>
            }
            <InputField type={type} placeholderStyles={placeholderStyles} styles={inputStyles} {...rest}/>
            {
                endIcon && <SpanIcon>{endIcon}</SpanIcon>
            }
        </Wrapper>
    )
}

export default Input

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 12px 0px 12px 20px;
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    ${({styles}) => styles && styles}
`
const InputField = styled.input`
    padding-right: 16px;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: ${({theme}) => theme.font.size.s};
    line-height: ${({theme}) => theme.font.lineHeight.wide};
    font-weight: ${({theme}) => theme.font.weight.medium};
    color: ${({theme}) => theme.colors.primaryText};

    &::placeholder {
        font-size: ${({theme}) => theme.font.size.s};
        line-height: ${({theme}) => theme.font.lineHeight.tight};
        font-weight: ${({theme}) => theme.font.weight.medium};
        color: ${({theme}) => theme.colors.secondaryText};
        ${({placeholderStyles}) => placeholderStyles && placeholderStyles}
    }

    ${({styles}) => styles && styles}
`

const SpanIcon = styled.span`
    padding-right:16px;
`