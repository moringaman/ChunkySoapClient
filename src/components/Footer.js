import React from 'react'
import { Section } from '../styles/layout'
import styled from 'styled-components'

const Footer = () => {
    return (
        <>
        <Section height={500}>
            <img src="/drips.png" alt="drips" style={{float: 'right', width: '500px', transform: 'translate(50px, -50px)'}}/>
            <FooterGrid>
                <FooterList>
                    <FooterListItem>
                    Item 1
                    </FooterListItem>
                    <FooterListItem>
                    Item 1
                    </FooterListItem>
                </FooterList>
                <FooterList>
                <FooterListItem>
                list 2
                    </FooterListItem>
                    <FooterListItem>
                    Item 1
                    </FooterListItem>
                </FooterList>

            </FooterGrid>
        </Section>
        {/* <Section light height={10}></Section> */}
        </>
    )
}

const FooterGrid = styled.div`
    display: flex;
    position: absolute
    max-width: 100vw
    padding-top: 150px;
    bottom: -500;
    flex-flow: row wrap;
`

const FooterList = styled.ul`
    min-width: 200px
    padding: 50px;
    list-style: none;
`

const FooterListItem = styled.li`
    padding: 5px;
    color: white;
    font-size: 1.5rem;
`

export default Footer