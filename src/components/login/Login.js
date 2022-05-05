import { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { loginUser } from "../../store/slices/userSlice"
import { User } from "../../utils/utils"
import { BaseButton, Input, Loader } from "../commons"

const user = new User()

const Login = () => {
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({username: "", password: ""});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const req = await user.login(credentials)
        if(req.data && req.data.status === 403) {
            setError(true)
            setErrorMessage(req.message)
            setLoading(false)
        }
        else {
            const {token, user_display_name, user_email, user_id, user_nicename} = req
            dispatch(loginUser({
                user: {
                    info: {
                        id: user_id,
                        displayName: user_display_name,
                        email: user_email,
                        nickname: user_nicename 
                    },
                    isLoggedIn: true,
                    accessToken: token
                }
            }))
            setLoading(false)
            setCredentials({username: "", password: ""})
        }
    }

    const handleInput = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <Container>
            <HeaderText>
                LOG IN
            </HeaderText>
            <Form onSubmit={submitHandler}>
                <InputGroup>
                    <Label htmlFor="login-username">Username</Label>
                    <Input wrapperStyles={{"margin-top": "10px"}} inputStyles={{width: "100%"}} value={credentials.username} onChange={handleInput} name="username" type="text" id="login-username" />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="login-password">Password</Label>
                    <Input wrapperStyles={{"margin-top": "10px"}} inputStyles={{width: "100%"}} value={credentials.password} onChange={handleInput} name="password" type="password" id="login-password" />
                    {
                        error && 
                            <Error>
                                <ErrorMessage dangerouslySetInnerHTML={{__html: errorMessage}}></ErrorMessage>
                            </Error>
                    }
                </InputGroup>
                <ButtonContainer>
                    <SubmitButton loading={loading ? "loading" : undefined} kind="primary" type="submit">{!loading ? "Log in" : <Loader size={25} /> }</SubmitButton>
                </ButtonContainer>
            </Form>
        </Container>
    )
}

export default Login


const Container = styled.div`
    max-width: 632px;
    width: 100%;
    padding: 43px 48px;
    border-radius: 10px;
    background-color: #ffffff;
`

const HeaderText = styled.h3`
    font-size: ${({theme}) => theme.font.size.lg};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.primaryText};
    text-transform: uppercase;
`

const Form = styled.form`
    margin-top: 56px;

`

const InputGroup = styled.div`
    position: relative;
    &:not(:last-of-type) {
        margin-bottom: 16px;
    }
`
const Label = styled.label`
    margin-bottom: 56px;
    font-size: ${({theme}) => theme.font.size.xs};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.primaryText};
    text-transform: uppercase;
    font-weight: ${({theme}) => theme.font.weight.medium};
    cursor: pointer;
`

const ButtonContainer = styled.div`
    margin-top: 49px;
    max-width: 88px;

`
const SubmitButton = styled(BaseButton)`
    border-radius: 10px;
    cursor: ${({loading}) => loading === "loading" ? "progress" : "pointer"};
    pointer-events: ${({loading}) => loading === "loading" ? "none" : "auto"};
    opacity: ${({loading}) => loading === "loading" ? ".7" : "1"};
`
const Error = styled.div`
    position: absolute;
    bottom: -8px;
    left: 20px;
    width: 100%;
    transform: translateY(100%)
`
const ErrorMessage = styled.p`
    font-size: ${({theme}) => theme.font.size.xs};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.error};
`