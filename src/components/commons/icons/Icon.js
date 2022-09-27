import React from 'react'
import Image from "next/image"
import styled from "styled-components"
import icons from "../../../constants/icons"

const Icon = ({name, width, height, styles, hoverStyles, quality, ...rest}) => {
    const src = icons[name];
    if(!src) return <> </>
    return (
        <IconWrapper {...rest} wrapperWidth={width} wrapperHheight={height} styles={styles} hoverStyles={hoverStyles}>
            <Image src={src} alt={name} layout="fill" objectPosition="center" objectFit="contain" quality={quality || 30} />
        </IconWrapper>
    )
}

export default React.memo(Icon)

const IconWrapper = styled.div`
    width: ${({wrapperWidth}) => wrapperWidth ? wrapperWidth : "24px"};
    height: ${({wrapperHheight}) => wrapperHheight ? wrapperHheight : "24px"};
    transition: all .3s ease-in-out;
    position: relative;
    &:hover {
        ${({hoverStyles}) => hoverStyles}
    }
    ${({styles}) => styles}


`
