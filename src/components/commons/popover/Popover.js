import React,{ useRef } from "react"
import styled from "styled-components"
import Content from "./Content"

const Popover = ({children,content, isOpen, onClose, wrapperStyles, contentStyles, wrapperClassName}) => {
    const wrapperRef = useRef()
    return (
        <PopoverWrapper ref={wrapperRef} styles={wrapperStyles} className={wrapperClassName ? wrapperClassName : ""}>
            {children}
            {
                isOpen &&
                <Content styles={contentStyles} wrapperRef={wrapperRef} closeOnClickOutside={onClose}> {content} </Content>
            }
        </PopoverWrapper>
    )
}

export default React.memo(Popover)

const PopoverWrapper = styled.div`
    position: relative;
    ${({styles}) => styles}
`