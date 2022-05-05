import { useState } from "react";
import styled from "styled-components";
import Content from "./Content";

const Tooltip = ({children, content, wrapperStyles, contentStyles, place}) => {
    const [show, setShow] = useState(false);
    return (
        <TooltipWrapper styles={wrapperStyles} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            {
                content && show &&
                <Content place={place} styles={contentStyles}>
                    {content}
                </Content>
            }
        </TooltipWrapper>
    )
}

export default Tooltip;

const TooltipWrapper = styled.div`
    position: relative;
    ${({styles}) => styles}
`