import { useRef } from "react"
import styled from "styled-components"
import { Icon, Loader } from ".."
import { useClickOutside } from "../../../hooks"
import Backdrop from "./Backdrop"

const Modal = ({children, loading, contentStyles, title, bgColor = "#ffffff", onClose, closeOnClickOutside = true}) => {
    const wrapperRef = useRef()

    useClickOutside(wrapperRef, () => closeOnClickOutside ? onClose() : {})
    return (
        <>
        <ModalWrapper>
            <Content ref={wrapperRef} styles={contentStyles} bgColor={bgColor}>
                {
                    loading &&
                    <LoadingWrapper>
                        <Loader size={100}/>
                    </LoadingWrapper>
                }
                {
                    title && 
                    <Title>{title}</Title>
                }
                {
                    onClose && 
                    <CloseWrapper>
                        <CloseButton onClick={onClose}>
                            <Icon name="close-rounded" width="100%" height="100%" />
                        </CloseButton>
                    </CloseWrapper>
                }
                {children}
            </Content>
        </ModalWrapper>
        <Backdrop />
        </>
    )
}

export default Modal;

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: ${({theme}) => theme.zIndex.modal};
    transform: translate(-50%, -50%);
`
const Content = styled.div`
    position: relative;
    background-color: ${({bgColor}) => bgColor};
    padding: 40px 48px;
    overflow-y: auto;
    border-radius: 10px;
    max-height: 95vh;
`
const CloseWrapper = styled.div`
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: ${({theme}) => theme.zIndex.modal + 2};
`
const Title = styled.h3`
    font-size: ${({theme}) => theme.font.size.lg};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.primaryText};
    font-weight: ${({theme}) => theme.font.weight.medium};
`
const CloseButton = styled.button`
    width: 24px;
    height: 24px;
    background-color: transparent;
    border: none;
    cursor: pointer;
`

const LoadingWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,.7);
    z-index: ${({theme}) => theme.zIndex.modal + 1};
    display: flex;
    align-items: center;
    justify-content: center;
`