import React, { } from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Row, Col
} from 'reactstrap';
import { Formik, Field, ErrorMessage } from "formik";

import InputMask from "react-input-mask";
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons'
import CustomButton from '../../Component/Button/CustomButton'
// import { Combobox } from "react-widgets";
import { } from './UserInfoView.css'

const UserInfoView = (props) => {


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

    // let radioItems = null;
    // radioItems = props.arrayGrades.map((element) => {
    //   return element.name;
    // });

  return (
    <div>
        <Formik
          initialValues={{
            name: "",
            rm:"",
            courseName: "",
            courses: 0,
            email: "",
            phone: ""
          }}
          validationSchema={props.addUserSchema}
          onSubmit={props.onValidSubmit}>
          {(formik) => {
          const { errors, touched, submitForm, setFieldValue } = formik;
            
            return (
              <Modal isOpen={props.modal} className="enterModal userInfo">
                <ModalHeader>Bem Vindo ao Founders' Match do Amplifier</ModalHeader>
                <ModalBody>
                  <div className="titleModal">
                    Para acessar as necessidades das startups, insira os dados abaixo:
                  </div>
                <Row>
                  <Col md={12} className='field'>
                    <Field
                      type="text"
                      name="rm"                        
                      placeholder="RM"
                      className={errors.name && touched.name ?
                        "inputError" : "fieldClass"}
                    />
                  </Col>
                  <Col md={12} className="infoErrorBox">
                    <ErrorMessage name="rm" component="span" className="infoError" />
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className='field'>
                    <Field
                      type="text"
                      name="name"                        
                      placeholder="Nome"
                      className={errors.name && touched.name ?
                        "inputError" : "fieldClass"}
                    />
                  </Col>
                  <Col md={12} className="infoErrorBox">
                    <ErrorMessage name="name" component="span" className="infoError" />
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className='field'>
                      {/* <Combobox
                        name="combobox"
                        className="comboBox"
                        data={radioItems}
                        value={props.choseGradeName}    
                        onChange={(value) => {
                          let typeID = props.onChangeGrade(value);
                          setFieldValue('courses', typeID);
                        }}
                      /> */}
                      <Field
                        type="text"
                        name="courseName"
                        placeholder="Nome do Curso"
                        className={errors.email && touched.email ?
                          "inputError" : "fieldClass"}
                      />                      
                  </Col>
                  <Col md={12} className="infoErrorBox">
                      <ErrorMessage name="courseName" component="span" className="infoError" />
                  </Col>
                </Row>
                  <Row>
                    <Col md={12} className='field'>
                      <Field
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        className={errors.email && touched.email ?
                          "inputError" : "fieldClass"}
                      />
                    </Col>
                    <Col md={12} className="infoErrorBox">
                      <ErrorMessage name="email" component="span" className="infoError" />
                    </Col>
                  </Row>                  
                  <Row>
                    <Col md={12} className='field'>
                      <InputMask
                        type="text"
                        mask="(99) 99999-9999"
                        name="phone"
                        placeholder="Telefone"
                        onChange={({ target }) => {
                          setFieldValue('phone', target.value);
                        }}
                        className={errors.phone && touched.phone ?
                          "inputError" : "fieldClass"}
                        tag={[Input, InputMask]}
                      />
                    </Col>
                    <Col md={12} className="infoErrorBox">
                      <ErrorMessage name="phone" component="span" className="infoError" />
                    </Col>
                  </Row>  
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
            );
          }}
        </Formik>
    </div>
  );
}
export default UserInfoView
