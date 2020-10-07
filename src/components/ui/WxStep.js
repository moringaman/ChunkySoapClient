import React from 'react'
import { Step  } from '../../styles/ui/'

const WxStep = (props) => {
    return (
        < >
            <Step {...props}/>
            <div style={{ display: 'inline-block', transform: 'translate(-150px, 50px)', position: 'absolute'}}>
                {props.label}
            </div>
        </>
    )
}

export default WxStep