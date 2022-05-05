import styled from "styled-components"

const Tabs = ({children, ...rest}) => {
    return (
        <TabsWrapper role="tablist" {...rest}>
            {children}
        </TabsWrapper>
    )
}

export const Tab = ({label, active, children, withIndicator, value, idx, contentStyles, ...rest}) => {
    return (
        <TabWrapper active={active} role="tab" tabindex={idx} {...rest}>
            <TabContent active={active} styles={contentStyles}>
                {children}
            </TabContent>
        </TabWrapper>
    )
}

export default Tabs

const TabsWrapper = styled.div`
    display: flex;
    padding: 7px 4px 0px;
`
const TabWrapper = styled.div`
    padding-bottom: 20px;
    position: relative;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: ${({active}) => active ? "1" : "0" };
        max-width: 48px;
        width: 100%;
        height: 3px;
        background-color: #000000;
        transition: all .3s ease-in-out;
    }

    &:not(:last-of-type) {
        margin-right: 44px;
    }
`
const TabContent = styled.div`
    font-size: ${({theme}) => theme.font.size.xl };
    font-weight: ${({theme, active}) => active ? theme.font.weight.medium : theme.font.weight.normal };
    color: ${({theme, active}) => active ? theme.colors.primaryText : theme.colors.secondaryText };
    ${({styles}) => styles && styles}
`