import styled from 'styled-components'

const CategoryFrame = styled.div`
    z-index: 100000;
    position: relative;
    width: 300px;
    height: 300px;
    border: 12px solid white;
    border-radius: 75px;
    background-color: green;
    transform: rotate(-10deg) translateY(-300px);
    background-color: #CCEAE3;
    margin-left: 100px;
    cursor: pointer;
    text-align:center;
    transition: all 0.2s ease-in;
        &:hover {
            transform: rotate(-10deg) translateY(-300px) scale(1.03);
        }
`

export default CategoryFrame