import Image from "next/image"
import styled from "styled-components"
import logo from "../../../public/images/company-logo.png"
import {Loader} from "../commons"

const LoadingScreen = () => {
    return (
        <Wrapper>
            <Content>
                <ImageWrapper>
                    <Image src={logo} alt="logo" layout="responsive" quality={80} />
                </ImageWrapper>
                <Loader size={40} />
            </Content>
        </Wrapper>
    )
}

export default LoadingScreen

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
`
const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ImageWrapper = styled.div`
    width: 200px;
    margin-bottom: 16px;
`