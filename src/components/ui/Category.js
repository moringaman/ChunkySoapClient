import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { CategoryFrame } from '../../styles/ui'
import { Heading2 } from '../../styles/typography'
import * as vars from '../../styles/variables'

const Category = ({name, id, image })=> {
    const history = useHistory()

    const navigate = (id) => {
        history.push(`/category/${id}`)
    }

    return (
        <>
        <CategoryFrame onClick={() => navigate(id)}>
            <img src={`http://localhost:1337${image}`} style={{height: 250, transform: 'rotate(10deg) translateY(20px)'}} />
            <div style={{transform: 'translateY(150px) rotate(10deg)', display: 'flex', alignItems: 'center'}}>
            <Dot name={name} />
            <Heading2>
                {name}
            </Heading2>
            </div>
        </CategoryFrame>   
        </>
    )
}

export default Category

const Dot = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color:${vars.palette.secondayColor};
    margin-right: 20px;
    ${props => props.name === 'Soaps' &&`
        background-color: ${vars.palette.tertiaryColor}
    `}
    ${props => props.name === 'Shampoo' &&`
        background-color: ${vars.palette.primaryColor}
    `}
`