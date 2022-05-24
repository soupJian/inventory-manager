import styled from "styled-components"
import { MultiSelectDropdown } from ".."
import Dropdown from "../dropdown/Dropdown"
import Icon from "../icons/Icon"

const Filter = ({label, list, name, value, activeIndex, onSelect, multiSelect,wrapperStyles}) => {
    return (
        <Wrapper styles={wrapperStyles}>
            {
                label && <Label>{label}</Label>
            }
            {
                multiSelect ?
                <MultiSelectDropdown
                    name={name}
                    wrapperStyles={{"min-width": "236px", "background-color": "#ffffff", padding: "16px", "border-radius": "10px", border: "1.5px solid #E6E6E6"}}
                    value={value} 
                    options={list} 
                    onSelect={onSelect} 
                    activeIndex={activeIndex}
                    icon={<Icon name="chevron" styles={{transform: "rotate(-90deg)"}} width="9px" height="14px"/>}
                />
                :
                <Dropdown
                    wrapperStyles={{"min-width": "236px", "background-color": "#ffffff", padding: "16px", "border-radius": "10px", border: "1.5px solid #E6E6E6"}}
                    value={value} 
                    options={list} 
                    onSelect={onSelect} 
                    activeIndex={activeIndex}
                    icon={<Icon name="chevron" styles={{transform: "rotate(-90deg)"}} width="9px" height="14px"/>}
                />
            }
        </Wrapper>
    )
}

export default Filter

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    ${({styles}) => styles && styles};
`

const Label = styled.label`
    margin-right: 8px;
    font-size: 17px;
    font-weight: ${({theme}) => theme.font.weight.normal};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.secondaryText};
`
