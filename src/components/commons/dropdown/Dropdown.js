import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { Flex } from "..";
import Checkbox from "../checkbox/Checkbox";

const Dropdown = ({ activeIndex, options = [], value, selected, onSelect, wrapperClassName, wrapperStyles, headerStyles, optionListStyles, optionStyles, icon}) => {
    const [showOption, setShowOption] = useState(false);
    const nodeRef = useRef()

    const handleClick = e => {
        if (nodeRef.current && !nodeRef.current.contains(e.target)) {
            setShowOption(false);
        }
    };

    const clickOption = (val) => {
        setShowOption(false);
        onSelect(val.value)
    }
    console.log({value})


    // useEffect(() => {
    //     onSelect([options[activeIndex ? activeIndex : 0]])
    // }, [])


    useEffect(() => {
        if(showOption) document.addEventListener('click', handleClick);
        else document.removeEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
      },[showOption]);

    return (
        <Wrapper ref={nodeRef} className={wrapperClassName ? wrapperClassName : ""} styles={wrapperStyles}  onClick={() => setShowOption(!showOption)} >
            <Header tabIndex="0" style={headerStyles}>
                <Title as="h6">{options.filter(option => option.value === value).map(item => item.label)[0]}</Title>
                {
                    icon && <SpanIcon>{icon}</SpanIcon>
                }
            </Header>
            <OptionWrapper show={showOption}>
                <OptionList>
                    {
                        options?.map((item,idx) => (
                            <Option key={idx} styles={optionStyles} onClick={() => clickOption(item)}>
                              {item.label}
                            </Option>
                        ))
                    }
                </OptionList>
            </OptionWrapper>
        </Wrapper>
    )
}


export default Dropdown

const Wrapper = styled.div`
    min-width: 120px;
    padding: 6px 10px;
    width: 100%;
    position: relative;
    background-color: ${({theme}) => theme.colors.menuBackground};
    border-radius: 4px;
    ${({styles}) => styles && styles}
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    ${({styles}) => styles && styles}

    & > h6 {
        font-weight: ${({theme}) => theme.font.weight.medium};
        font-size: ${({theme}) => theme.font.size.xs};
        line-height: ${({theme}) => theme.font.lineHeight.wide};
        color: #000000;
    }
`
const Title = styled.div`
    
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
    min-width: 100%;
    opacity: ${({show}) => show ? "1" : "0"};
    visibility: ${({show}) => show ? "visible" : "hidden"};
    transform: ${({show}) => show ? "translate(-50%, 100%)" : "translate(-50%, 105%)"};
`
const OptionList = styled.ul`
    width: 100%;
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