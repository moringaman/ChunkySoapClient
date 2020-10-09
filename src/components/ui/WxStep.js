import React from 'react'
import { Step  } from '../../styles/ui/'
import { Paragraph } from '../../styles/typography'

const WxStep = (props) => {
    return (
        < >
            <Step {...props}/>
            <div style={{ display: 'inline-block', transform: 'translate(-200px, 50px)', position: 'absolute', marginTop: 10}}>
            <Paragraph>
                {props.label}
            </Paragraph>
        </div>
        </>
    )
}

export default WxStep