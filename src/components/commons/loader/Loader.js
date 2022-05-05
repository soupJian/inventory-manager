import styled, { keyframes } from "styled-components"

const Loader = ({size = 30, color, styles}) => {
    return (
        <Spinner size={size} color={color} styles={styles}></Spinner>
    )
}

export default Loader

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Spinner = styled.div`
    border: ${({size}) => `${size / 5}px solid #f3f3f3`};
    border-top: ${({size, color}) => `${size / 5}px solid ${color ? color : "#000000"}`};
    border-radius: 50%;
    width: ${({size}) => `${size}px`};
    height: ${({size}) => `${size}px`};
    animation: ${spin} 2s linear infinite;
    ${({styles}) => styles}
`