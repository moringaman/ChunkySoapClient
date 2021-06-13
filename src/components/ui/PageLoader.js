import React from 'react';
import styled, { keyframes } from 'styled-components'


const PageLoader = () => {
    return (
        <LoadingPage>
            <Loader>
                <img src='/logo-big.svg' alt='loading..' />
            </Loader>
        </LoadingPage>
    )
}

const breathe = keyframes`
    0% { opacity: 0.3 }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
`

const LoadingPage = styled.div`
    position: absolute;
    top: 0;
    z-index: 10000;
    min-height: 100vh;
    min-width: 100vw;
    background-color: white;
`
const Loader = styled.div`
    position: absolute;
    padding: 0px;
    margin: 0px;
    left: 50%;
    top: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    text-align: center;
    animation: ${breathe} 3s infinite ease-out;
`

export default PageLoader