import React from 'react'
import Image from "next/image"
import styled from "styled-components"

const Checkbox = ({selected, onSelect, size = 16, inputId}) => {
    return (
        <Wrapper size={size}>
            <Input id={inputId} type="checkbox" checked={selected} onChange={onSelect} />
            <Label  onClick={(e) => e.stopPropagation()}  htmlFor={inputId}>
                {
                    selected &&
                    <Image src="/images/icons/icon-checked-box.png" alt="checkbox" layout="fill" />
                }
            </Label>
        </Wrapper>
    )
}

export default React.memo(Checkbox)


const Wrapper = styled.div`
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
`
const Input = styled.input`
    position: absolute;
    width: 0px;
    height: 0px;
    opacity: 1;
    &:focus + * {
        border:2px outset ${({theme}) => theme.colors.accentText};
    }
`
const Label = styled.label`
    display: block;
    height: 100%;
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    background-color: #ffffff;
    position: relative;
    cursor: pointer;
`
