import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { CategoryFrame } from '../../styles/ui'
import { Heading2 } from '../../styles/typography'
import * as vars from '../../styles/variables'

const Category = ({name, id, image, viewPort })=> {
    const history = useHistory()

    const navigate = (id) => {
        history.push(`/category/${id}`)
    }

    return (
        <>
        <CategoryFrame onClick={() => navigate(id)} sm={viewPort < 916 ? true : false} >
            <img src={image} 
            style={{height: viewPort < 916 ? 100 : 250,
             transform: viewPort < 916 ? 'rotate(10deg) translate(-10px, 5px)':'rotate(10deg) translateY(20px);' }} />
            <div style={{transform: 'translateY(150px) rotate(10deg)', display: 'flex', alignItems: 'center'}}>
            { viewPort > 916 &&
            <>
            <Dot name={name} />
                <Heading2>
                    {name}
                </Heading2>
            </>
            }
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
    ${props => props.viewPort < 400 &&`
        transform: translateY(-100px);

    `}
`