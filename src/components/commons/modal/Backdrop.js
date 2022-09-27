import React from 'react'
import styled from "styled-components"

const Backdrop = () => {
    return (
        <Wrapper>

        </Wrapper>
    )
}

export default React.memo(Backdrop)

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${({theme}) => theme.zIndex.modalBackdrop};
    background: rgba(0, 0, 0, 0.43)
`