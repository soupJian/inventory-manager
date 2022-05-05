import { useState } from "react"
import { useDispatch } from "react-redux";
import styled from "styled-components"
import { Dropdown, Icon, Popover, BaseButton } from "..";
import { logoutUser } from "../../../store/slices/userSlice";


const dropdownList = [
    {
        label: "Products",
        value: "products"
    },
    {
        label: "Category",
        value: "category"
    },
    {
        label: "Orders",
        value: "orders"
    }
]

const Header = ({user}) => {
    const [activeDropdown, setActiveDropdown] = useState([]);
    const [toggleAccount, setToggleAccount] = useState(false)
    const dispatch = useDispatch()

    const Logout = () => {
        dispatch(logoutUser())
    }

    return (
        <HeaderWrapper>
            <Content>
                <SearchWrapper>
                    <SearchInput>
                        <SearchIcon>
                            <Icon quality={80} name="search" width="30" height="30" />
                        </SearchIcon>
                        <Input type="text" placeholder="Search inventory, product, order" />
                    </SearchInput>
                    <Dropdown icon={<Icon name="triangle" width="12px" height="6px" />} options={dropdownList} value={activeDropdown} onSelect={setActiveDropdown} activeIndex={0} />
                </SearchWrapper>
                <UserActions>
                    {
                        user.isLoggedIn &&
                        <Popover 
                            isOpen={toggleAccount} 
                            onClose={() => setToggleAccount(false)}
                            content={
                                <PopoverConent>
                                    <Label>
                                        Account Info
                                    </Label>
                                    <DisplayName>
                                        {user.info.displayName}
                                    </DisplayName>
                                    <UserName>
                                        Username: {user.info.email}
                                    </UserName>
                                    <SignoutBtn onClick={Logout}>
                                        Sign out
                                    </SignoutBtn>
                                </PopoverConent>
                            }
                            >
                            <UserAction onClick={() => setToggleAccount(!toggleAccount)}>
                                <Icon quality={80} name="user" width="100%" height="auto" />
                            </UserAction>
                        </Popover> 
                    }
                    {
                        user.isLoggedIn &&
                        <UserAction>
                            <Icon quality={80} name="clock" width="100%" height="auto" />
                        </UserAction>
                    }
                    <UserAction>
                        <Icon quality={80} name="translate" width="100%" height="auto" />
                    </UserAction>
                </UserActions>
            </Content>
        </HeaderWrapper>
    )
}

export default Header

const HeaderWrapper = styled.header`
    min-height: 72px;
    background: #ffffff;
`
const Content = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 29px 16px;
`
const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
`
const SearchInput = styled.div`
    display: flex;
    align-items: center;
    margin-right: 15px;
`
const SearchIcon = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 16px;
`
const Input = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    height: 100%;
    padding: 5.5px 0;
    font-size: ${({theme}) => theme.font.size.s};
    color: ${({theme}) => theme.colors.primaryText};

    &::placeholder {
        color: ${({theme}) => theme.colors.secondaryText};
        font-size: ${({theme}) => theme.font.size.s};
    }
`
const UserActions = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`
const UserAction = styled.div`
    width: 32px;
    height: 32px;
    padding: 0 5px;
    display: grid;
    place-items: center;
    cursor: pointer;
`

const PopoverConent = styled.div`
    padding: 20px 16px;
    background-color: #ffffff;
`

const Label = styled.h6`
    font-size: ${({theme}) => theme.font.size.xsss};
    color: ${({theme}) => theme.colors.secondaryText};
`
const DisplayName = styled.h4`
    font-size: ${({theme}) => theme.font.size.s};
    font-weight: ${({theme}) => theme.font.weight.bold};
    color: ${({theme}) => theme.colors.primaryText};
    margin-top: 16px;
    white-space: nowrap;
`
const UserName = styled.p`
    font-size: ${({theme}) => theme.font.size.xs};
    font-family: ${({theme}) => theme.font.family.secondary};
    color: #000000;
    margin-top: 6px;
    white-space: nowrap;
`
const SignoutBtn = styled.button`
    margin-top: 16px;
    min-width: auto;
    color: ${({theme}) => theme.colors.accentText};
    font-size: ${({theme}) => theme.font.size.s};
    font-weight: 400;
    background-color: transparent;
    border: none;
    cursor: pointer;
`