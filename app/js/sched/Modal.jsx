
import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div`
    postion: fixed;
    background: white;
    width: 80%;
    top: 50%;
    left: 50%;
    margin: 15% auto;
    padding: 1rem 2rem;
`;


const Modal = props => {
    const empty = e => e.stopPropagation();
    return (
        <ModalWrapper onClick={props.onCancel}>
            <ModalContent onClick={empty}>
                {props.children}
            </ModalContent>
        </ModalWrapper>
    )
}

export default Modal;