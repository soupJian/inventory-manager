import Image from "next/image"
import { useRouter } from "next/router"
import styled from "styled-components"
import logo from "../../../../public/images/company-logo.png"
import Icon from "../icons/Icon"

const SideBar = ({user}) => {
    const router = useRouter();

    return (
        <SideBarWrapper>
            <Content>
                <CompanyLogo onClick={() => router.push("/")}>
                    <Image src={logo} alt="logo" layout="responsive" objectFit="contain" priority={true} />
                </CompanyLogo>
                <NavItems>
                    <NavItem disabled={!user} onClick={() => router.push("/inventory")} active={user && router.pathname === "/inventory"}>
                        <SpanLogo disabled={!user} active={user && router.pathname === "/inventory"}> <Icon name="inventory"/> </SpanLogo>
                        <SpanText disabled={!user}>Inventory</SpanText>
                    </NavItem>
                    <NavItem disabled={!user} onClick={() => router.push("/warehouse")} active={user && router.pathname === "/warehouse"}>
                        <SpanLogo disabled={!user} active={user && router.pathname === "/warehouse"}> <Icon name="warehouse"/> </SpanLogo> 
                        <SpanText disabled={!user}>Warehousing</SpanText>
                    </NavItem>
                    <NavItem disabled={!user} onClick={() => router.push("/products")} active={user && router.pathname === "/products"}>
                        <SpanLogo disabled={!user} active={user && router.pathname === "/products"}> <Icon name="product"/> </SpanLogo> 
                        <SpanText disabled={!user}>Products</SpanText>
                    </NavItem>
                    <NavItem disabled={!user} onClick={() => router.push("/orders")} active={user && router.pathname === "/orders"}>
                        <SpanLogo disabled={!user} active={user && router.pathname === "/orders"}> <Icon name="orders"/> </SpanLogo>
                        <SpanText disabled={!user}>Orders</SpanText>
                    </NavItem>
                </NavItems>
            </Content>
        </SideBarWrapper>
    )
}

export default SideBar

const SideBarWrapper = styled.aside`
    flex: 1 0 auto;
    max-width: 231px;
    background-color: #ffffff;
`

const Content = styled.div`
    height: 100%;
    padding: 39px 16px;

`

const CompanyLogo = styled.div`
    width: 160px;
    cursor: pointer;
`

const NavItems = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    margin-top: 84px;
`
const SpanText = styled.span`
    margin-left: 15px;
    color: ${(({disabled, theme}) => disabled ? theme.colors.secondaryText : "inherit")};
    
`
const SpanLogo = styled.span`
    filter: ${({active, disabled}) => disabled ? "none" : active ? "invert(100%) brightness(0%)" : "none"};
`

const NavItem = styled.li`
    width: 100%;
    padding: 14px 24px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    color: #000;
    font-size: ${(({theme}) => theme.font.size.s)};
    font-weight: ${(({theme,active}) => active ? theme.font.weight.bold : theme.font.weight.normal)};
    background-color: ${({theme, active}) => active ? theme.colors.menuBackground : "transparent"};
    transition: all .15s ease-in-out;
    cursor: pointer;
    pointer-events: ${(({disabled}) => disabled ? "none" : "auto")};

    &:not(:last-of-type) {
        margin-bottom: 32px;
    }
    &:hover {
        background-color: ${({theme}) => theme.colors.menuBackground};
    }
`

