import React from 'react'
import styled from "styled-components"

const Tabs = ({children, ...rest}) => {
    return (
        <TabsWrapper role="tablist" {...rest}>
            {children}
        </TabsWrapper>
    )
}

export default React.memo(Tabs)

const TabsWrapper = styled.div`
    display: flex;
    padding: 7px 4px 0px;
`
