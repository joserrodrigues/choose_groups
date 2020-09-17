import React, { } from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import InputMask from "react-input-mask";
import { InputGroupAddon} from 'reactstrap';
import {
  AvForm,
  AvFeedback,
  AvInput,
  AvGroup,
  AvField,
} from "availity-reactstrap-validation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faPaperPlane, faTimes, faGraduationCap, faPhone } from '@fortawesome/free-solid-svg-icons'
import CustomButton from '../../Component/Button/CustomButton'
import { Combobox } from "react-widgets";
import renderIf from "render-if";
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
                backgroundColor="#9e9e9e"
                onClick={() => props.closeInitialModal(false) }/>      
        ) 
    }

    let radioItems = null;
    radioItems = props.arrayGrades.map((element) => {
      return element.name;
    });

  // debounce to not pound the 'server'
  const validate = ((value, ctx, input, cb) => {

    // cancel pending 'network call'
    // clearTimeout(this.timeout);

    // simulate network call
    // console.log(value);
    
    cb(!value.includes("_") && value !== "");
  });

    return (
      <div>
        <Modal isOpen={props.modal} className="enterModal userInfo">
          <ModalHeader>Bem Vindo ao Choose Group do Startup One</ModalHeader>
          <ModalBody>
            <div className="titleModal">
              Para acessar as ideias, por favor, insira os dados abaixo:
            </div>

            <AvForm
              className="hidden"
              onValidSubmit={props.onValidSubmit}
              ref={(c) => (form = c)}
            >
              <AvGroup className="input-group">
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
                <AvInput name="rm" minLength={3} placeholder="RM" required />
                <AvFeedback>Favor preencher um RM válido</AvFeedback>
              </AvGroup>
              <AvGroup className="input-group" md="12">
                <Combobox
                  name="combobox"
                  className="comboBox"
                  data={radioItems}
                  value={props.choseGradeName}
                  onChange={props.onChangeGrade}
                />
                {renderIf(props.gradeNameError)(() => (
                  <div className="messageError">
                    Favor preencher uma turma válida
                  </div>
                ))}
              </AvGroup>
              <AvGroup className="input-group fieldClass">
                <AvField
                  name="email"
                  type="text"
                  validate={{ email: true }}
                  errorMessage="Favor preencher um e-mail válido"
                  required
                  placeholder="E-mail"
                />
              </AvGroup>
              <AvGroup className="input-group phone-input fieldClass">
                <AvField
                  type="text"
                  mask="(99) 99999-9999"
                  maskChar="-"
                  name="phone"
                  placeholder="Telefone"
                  errorMessage="Favor preencher um telefone válido"
                  validate={{ async: validate }}
                  className="fieldClass"
                  tag={[Input, InputMask]}
                />
              </AvGroup>
            </AvForm>
          </ModalBody>
          <ModalFooter>
            {cancelButton}{" "}
            <CustomButton
              icon={faPaperPlane}
              text="Enviar"
              onClick={() => submitForm()}
            />
          </ModalFooter>
        </Modal>
      </div>
    );
}
export default UserInfoView
