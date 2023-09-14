import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import useUser from '../../hooks/useUser';

function Modal({ isOpen, onClose, children }) {



    return isOpen && ReactDOM.createPortal(
        <>
            <div className='overlay' />
            <div className='modal'>
                <button
                    className='close-button'
                    onClick={() => onClose(!isOpen)} >
                    X
                </button>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    );
}

export default Modal;