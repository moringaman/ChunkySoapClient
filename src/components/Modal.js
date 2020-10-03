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
              <div className="modal-header">
                <AnimatedButton
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
                </AnimatedButton>
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
  max-width: 980px;
  min-height: 400px;
  padding: 3.0rem;
  border-radius: 25px;
  transform: translateY(-50%);
  overflow: hidden;
`

