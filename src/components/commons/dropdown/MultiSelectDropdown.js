import React,{ useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Checkbox, Flex } from ".."

const MultiSelectDropdown = ({ name, activeIndex, options = [], value = [], onSelect, wrapperClassName, wrapperStyles, headerStyles, optionListStyles, optionStyles, icon}) => {
    const [showOption, setShowOption] = useState(false);
    const nodeRef = useRef()
    const handleClick = e => {
        if (nodeRef.current && !nodeRef.current.contains(e.target)) {
            setShowOption(false);
        }
    };
    const clickOption = (val) => {
        if(name) {
            onSelect(name,val)
        }
        else {
            onSelect(val)
        }
        setShowOption(true)
    }

    useEffect(() => {
        console.log({activeIndex})
        activeIndex >= 0 && onSelect(options[activeIndex])
    }, [options])


    useEffect(() => {
        if(showOption) document.addEventListener('click', handleClick);
        else document.removeEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
      },[showOption]);

    return (
        <Wrapper ref={nodeRef} className={wrapperClassName ? wrapperClassName : ""} styles={wrapperStyles}  onClick={() => setShowOption(!showOption)} >
            <Header  tabIndex="0" style={headerStyles} >
                <Title as="h6">{activeIndex >= 0 ? value[0]?.label : <TitleSpan>{options.filter(option => value.includes(option.value)).map(item => item.label).join(";")}</TitleSpan>}</Title>
                {
                    icon && <SpanIcon>{icon}</SpanIcon>
                }
            </Header>
            <OptionWrapper show={showOption}>
                <OptionList >
                    {
                        options?.map((item,idx) => (
                            <Option key={idx+item.value} styles={optionStyles}>
                                <Flex styles={{gap: "10px"}} alignItems="center" justifyContent="flex-start" > 
                                    <Checkbox inputId={name + item.value} selected={value?.some(i => i === item.value)} onSelect={() => clickOption(item.value)} /> 
                                    <LabelText htmlFor={name + item.value}>{item.label} </LabelText>
                                </Flex>
                            </Option>
                        ))
                    }
                </OptionList>
            </OptionWrapper>
        </Wrapper>
    )
}

export default React.memo(MultiSelectDropdown)

const Wrapper = styled.div`
    min-width: 120px;
    position: relative;
    background-color: ${({theme}) => theme.colors.menuBackground};
    border-radius: 4px;
    width: 100%;
    ${({styles}) => styles && styles}
`
const Header = styled.div`
        padding: 6px 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    overflow-y: auto;
    ${({styles}) => styles && styles}

    & > h6 {
        font-weight: ${({theme}) => theme.font.weight.medium};
        font-size: ${({theme}) => theme.font.size.xs};
        line-height: ${({theme}) => theme.font.lineHeight.wide};
        color: #000000;
        white-space: nowrap;
    }
`
const Title = styled.div`
    
`
const TitleSpan = styled.span`
    margin-left: 4px;
`
const SpanIcon = styled.span`
    padding-left: 9px;
`
const OptionWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 5;
    transition: all .15s ease-in-out;
    max-height: 300px;
    overflow-y: auto;
    min-width: 100%;
    opacity: ${({show}) => show ? "1" : "0"};
    visibility: ${({show}) => show ? "visible" : "hidden"};
    transform: ${({show}) => show ? "translate(-50%, 100%)" : "translate(-50%, 105%)"};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
`
const OptionList = styled.ul`
    width: 100%;
    max-height: 100%;
    padding: 16px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 0px 0px 4px 4px;
    background-color: #ffffff;
    list-style: none;
    ${({styles}) => styles && styles}
`
const Option = styled.li`
    padding-bottom: 3px;
    cursor: pointer;

    ${({styles}) => styles && styles}

    &:not(:last-of-type) {
        margin-bottom: 13px;
    }
`
const LabelText = styled.label`
    width: 100%;
`