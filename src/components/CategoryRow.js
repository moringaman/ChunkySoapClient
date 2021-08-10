import React, {useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Wrapper, Section, SlideGrid } from '../styles/layout'
import { SectionHeading, Heading2 } from '../styles/typography'
import { Category } from './ui'

const CategoryRow = (props) => {

const { categories } = useSelector((state) => state.categories || []);
useEffect(() => {

    console.log("CAT ROW: ", categories)
}, [categories])

    return (
        <>
            { props.viewPort > 916 ? 
            <>
        <Section height={200}>
            <SectionHeading light>Categories</SectionHeading>
                <img 
                    src="/drips.png" 
                    alt="drips" 
                    style={{float: 'right', width: '500px', transform: 'translate(50px, -70px)', zIndex: '5'}}/>
        </Section>
            <SlideGrid  mb={'-100px'}>
                {
                    categories && categories.map((el, i) => ( 
                        <Category key={i} name={el.category_name} image={el.category_image.formats.thumbnail.url} id={el._id} />
                    ))
                }
            </SlideGrid>
                    </>
                    :
            <SlideGrid sm mb={'-100px'}>
                {
                    categories && categories.map((el, i) => ( 
                        <Category viewPort={props.viewPort} key={i} name={el.category_name} image={el.category_image.formats.thumbnail.url} id={el._id} />
                    ))
                }
            </SlideGrid>
            }
        </>
    )
}

export default CategoryRow;