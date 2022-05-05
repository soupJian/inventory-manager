import { useRef } from "react"
import styled from "styled-components"
import Content from "./Content"

const Popover = ({children,content, isOpen, onClose, wrapperStyles, wrapperClassName}) => {
    const wrapperRef = useRef()
    return (
        <PopoverWrapper ref={wrapperRef} styles={wrapperStyles} className={wrapperClassName ? wrapperClassName : ""}>
            {children}
            {
                isOpen &&
                <Content wrapperRef={wrapperRef} closeOnClickOutside={onClose}> {content} </Content>
            }
        </PopoverWrapper>
    )
}

export default Popover

const PopoverWrapper = styled.div`
    position: relative;
    ${({styles}) => styles}
`