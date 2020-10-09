import styled, { css } from 'styled-components'
import * as vars from '../variables'

const Step = styled.div`
&{
        height: 36px;
        width: 36px;
        border-radius: 50%;
        background-color: ${vars.palette.colorGray6};
        position: relative;
        display: inline-block;
        margin-right: 150px;
        flex-shrink: 4;
        ${props => props.step >= props.number && css`
            background-color: ${vars.palette.primaryColor};
           `}
        }
}
    &::before {
        content: '';
        position: absolute;
        border-radius: 50%;
        border: 3px solid white;
        width: 22px;
        height: 22px;
        top: 4px;
        left: 4px;
    }
    &::after {
        content: '';
        width: 150px;
        height: 3px;
        background-color: ${vars.palette.colorGray6};
        position: absolute;
        transform: translate(-168px, 15px);

        ${props => (props.number === 1) && css`
            width: 0px;
           ` }

        ${props => props.step >= props.number && css`
            background-color: ${vars.palette.primaryColor};
            }
            `
    }
`


export default Step