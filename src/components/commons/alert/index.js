import React from 'react'
import styled from "styled-components"

const Alert = ({children, type="notification", styles}) => {
    return (
        <AlertWrapper type={type} styles={styles}>
            {children}
        </AlertWrapper>
    )
}

export default React.memo(Alert)

const AlertWrapper = styled.div`
    padding: 12px 18px;
    background-color: ${({theme,type}) => theme.colors.alert[type]};
    ${({styles}) => styles && styles};
`