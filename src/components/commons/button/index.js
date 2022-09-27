import React from 'react'
import styled from "styled-components"
import { Loader } from ".."
import { BaseButton } from "../styled-elements"

const Button = ({styles, type, kind, minHeight, minWidth, onClick, children, endIcon, startIcon, loading = false,...rest}) => {
    return (
        <StyledButton {...rest} disabled={loading} styles={styles} onClick={onClick} type={type} kind={kind} minHeight={minHeight} minWidth={minWidth}>
            {
                loading ?
                <Loader />
                :
                <>
                    {startIcon && startIcon}
                    {children}
                    {endIcon && endIcon}
                </>
            }
        </StyledButton>
    )
}

export default React.memo(Button)

const StyledButton = styled(BaseButton)`
    padding: 18px 26px;
    border-radius: 10px;
    ${({styles}) => styles}
`