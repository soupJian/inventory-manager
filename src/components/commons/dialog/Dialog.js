import styled from "styled-components"

const Dialog = ({children, styles}) => {
    return (
        <DialogWrapper styles={styles}>
            {children}
        </DialogWrapper>
    )
}

export default Dialog

const DialogWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: ${({theme}) => theme.zIndex.modal};
    transform: translate(-50%, -50%);
    ${({styles}) => styles && styles}
    background-color: #ECECEC;
    border-radius: 10px;
`