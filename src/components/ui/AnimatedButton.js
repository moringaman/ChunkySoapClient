import React from 'react'
import WxButton from '../../styles/components/button'

const AnimatedButton = ({...props}) => {

    return (
        <>
        {props.withIcon ? 
        <div onClick={() => props.handleClick()}>
            {props.children}
        </div>
        :
        <WxButton fixed {...props} onClick={() => props.handleClick()} >
          <div className="button-content">
                <div>
                    {props.text}
                </div>
                <div>
                    {props.children}
                </div> 
           </div>
        </WxButton>
        }
        </>
    )
}

  AnimatedButton.defaultProps = {
    handleClick: () => {}
}

export default AnimatedButton
