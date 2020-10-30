import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../styles/components/button'
import AnimatedButton from '../components/ui/AnimatedButton'
import styled from 'styled-components'
import { X } from 'react-feather'
const Modal = ({ isShowing, hide, ...rest }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <ModalOverlay 
          />
          <ModalWrapper
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            // onClick={hide}
          >
            <ModalMain className="modal">
            <CloseButton
              onClick={hide}
            ><Cross/></CloseButton>
              <div className="modal-header">
                {/* <AnimatedButton
                  med
                  secondary
                  type="button"
                  style={{position: 'absolute', right: 35, bottom: 20 }}
                  data-dismiss="modal"
                  aria-label="Close"
                  handleClick={hide}
                  text="Close"
                >
                <X/>
                </AnimatedButton> */}
              </div>
              {rest.children}
            </ModalMain>
          </ModalWrapper>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
`

const ModalWrapper = styled.div`
     position: fixed;
        top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
`

const ModalMain = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: 50vh auto;
  border-radius: 3px;
  max-width: 1000px;
  min-height: 400px;
  padding: 3.0rem;
  border-radius: 25px;
  transform: translateY(-50%);
  overflow: hidden;
`

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  padding: 5px;
  background-color: gray;
  color: white;
  position: absolute;
  border-radius: 50%;
  right: 20px;
  top: 20px;
  border: none;
  z-index: 1000;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: black;
  }
`
const Cross = styled.div`
    :after, :before { 
    width: 15px;
    height: 3px;
    background-color: white; 
    position: relative;
    left: 8px;
    top: 13px;
   }
  &::after{
    content: '';
    transform: rotate(-45deg);
    position: absolute;
  }
  &::before {
    content: '';
    transform: rotate(45deg);
    position: absolute;
  }
`
