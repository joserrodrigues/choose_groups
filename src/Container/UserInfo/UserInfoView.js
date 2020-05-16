import React, { useState, useEffect} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Container, InputGroupAddon, FormGroup, Alert} from 'reactstrap';
import { AvForm, AvFeedback, AvInput, AvGroup } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons'
import CustomButton from '../../Component/Button/CustomButton'
import { } from './UserInfoView.css'

const UserInfoView = (props) => {
    let form = React.createRef();
    const submitForm = () => {
        form.handleSubmit();
    }

    let cancelButton = null
    if(localStorage.getItem("user_rm") !== null){
        cancelButton= (
            <CustomButton 
                icon={faTimes}
                text="Cancelar"
                backgroundColor="#ccc"
                onClick={() => props.closeInitialModal(false) }/>      
        ) 
    }

    return (
        <div>
          <Modal isOpen={props.modal}  className="enterModal">
            <ModalHeader >Bem Vindo ao Choose Group do Startup One</ModalHeader>
            <ModalBody>
                <div className="titleModal">
                    Para acessar as ideias, por favor, insira os dados abaixo:
                </div>
                
                <AvForm className="hidden" onValidSubmit={props.onValidSubmit} ref={c => (form = c)}>
                    <AvGroup className="input-group">
                        <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </InputGroupAddon> 
                        <AvInput
                            name="name"
                            minLength={3}
                            placeholder="Nome"
                            value={""}
                            required
                        />
                        <AvFeedback>Favor preencher um nome válido</AvFeedback>
                    </AvGroup>
                    <AvGroup className="input-group">
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </InputGroupAddon> 
                            <AvInput
                                name="rm"
                                minLength={3}
                                placeholder="RM/RA"
                                required
                            />
                            <AvFeedback>Favor preencher um RA/RM válido</AvFeedback>
                        </AvGroup>
                        <AvGroup className="input-group">
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </InputGroupAddon> 
                            <AvInput
                                name="grade"
                                minLength={3}
                                placeholder="Turma"
                                required
                            />
                            <AvFeedback>Favor preencher uma turma válido</AvFeedback>
                        </AvGroup>
                        <AvGroup className="input-group">
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                            </InputGroupAddon> 
                            <AvInput
                                name="email"
                                minLength={3}
                                placeholder="E-mail"
                                required
                            />
                            <AvFeedback>Favor preencher um e-mail válido</AvFeedback>
                        </AvGroup>
                </AvForm>
            </ModalBody>
            <ModalFooter>
                {cancelButton} {' '}
                <CustomButton 
                    icon={faPaperPlane}
                    text="Enviar"
                    onClick={() => submitForm() }/>       
            </ModalFooter>
          </Modal>
        </div>
      );
}
export default UserInfoView
