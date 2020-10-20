import React from 'react'
import WxButton from '../../styles/components/button'
import { Check } from 'react-feather'
import Loader from 'react-loader-spinner'

const AnimatedButton = ({...props}) => {

  const renderLoader = () => {
      return (
        <Loader
            type="ThreeDots"
            color="#FFFFFF"
            height={29}
            width={29}
            timeout={30000} //3 secs
        />
      )
  }
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
                    {props.loading === true ? renderLoader() : props.text }
                </div>
                <div>
                    {props.children || <Check />}
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
