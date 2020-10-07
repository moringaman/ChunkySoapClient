import styled, { css } from 'styled-components'

const Step = styled.div`
&{
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background-color: gray;
        position: relative;
        display: inline-block;
        margin-right: 110px;
        ${props => props.step === props.label && css`
            background-color: green;
            }
        `}
}
    &::after {
        content: '';
        width: 100px;
        height: 3px;
        background-color: gray;
        position: absolute;
        transform: translate(-105px, 15px);

        ${props => (!!props.start) && css`
            width: 0px;
           ` }

        ${props => props.step === props.label && css`
            background-color: green;
            }
            `
    }
`


export default Step