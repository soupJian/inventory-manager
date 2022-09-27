import React from 'react'
import styled from "styled-components"

const Box = ({as = "div", children, width, height, borderType, styles, backgroundColor, ...rest}) => {
    return (
        <BoxWrapper {...rest} as={as} width={width} height={height} borderStyle={borderType} styles={styles} backgroundColor={backgroundColor}>
            {children}
        </BoxWrapper>
    )
}

export default React.memo(Box)

const BoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${({width}) => width ? width : "300px"};
    height: ${({height}) => height ? height : "300px"};
    border-radius: 10px;
    border-width: 2px;
    border-color: #d9d9d9;
    border-style: ${({borderStyle}) => borderStyle || "solid"};
    background-color:${({backgroundColor}) => backgroundColor || "#ffffff"};
    cursor:${({as}) => ["button", "link", "input"].includes(as) ? "pointer" : "auto"}; ;
    ${({styles}) => styles && styles};
    
`