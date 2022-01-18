import React from 'react'
import { useEffect } from 'react'

import { Row, Col, Container, FormGroup, Alert} from 'reactstrap';
// import { AvForm, AvFeedback, AvInput, AvGroup} from 'availity-reactstrap-validation';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ReactLoading from 'react-loading';
import CustomButton from '../../Component/Button/CustomButton'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Combobox } from 'react-widgets'
import { Formik, Field, ErrorMessage } from "formik";
import renderIf from 'render-if'

import { } from './AddInfoView.css'

const AddInfoView = (props) => {
    
    let radioItems = null;

    useEffect(() => {        
        if(props.isSuccess === 1){
            // form && form.reset();
        }
    });




    radioItems = props.arrayTypes.map(element => {
        return element.name;              
    });

    let alertInfo = null;
    if(props.isSuccess === 1){
        alertInfo = (
            <Alert color="success">
                Oportunidade salva com sucesso
            </Alert>
        )        
    } else if(props.isSuccess === 2){
        alertInfo = (
            <Alert color="danger">
                Erro ao salvar a oportunidade {props.errorInfo}
            </Alert>
        )
    }

    //Manage Edit
    // let name = "";
    // let rm = "";
    // let grade = "";
    // let email = "";
    let title = "";
    let description = "";   
    let typeIdeaID = 0; 
    if(props.isEditing){
        // name = props.editIdea.owner_name;
        // rm = props.editIdea.owner_rm;
        // grade = props.editIdea.owner_grade;
        // email = props.editIdea.owner_email;
        title = props.editIdea.title;
        description = props.editIdea.description;
      typeIdeaID = props.editIdea.type.id;
        //defaultItem = props.editIdea.type.name;
    }
    
    return (
      <Container className="containerAddInfo">
        {alertInfo}
        <Row className="align-items-center" style={{ height: "100%" }}>
          <Col md="12">
            <Row>
              <Col md="12" className="closeButtonAddInfo">
                <CustomButton
                  icon={faTimes}
                  text=""
                  onClick={() => props.handleClick(null)}
                />
              </Col>
            </Row>
            <Row>
              <Col md="12" className="titleAddInfo">
                Insira aqui o problema que você quer resolver para que outras
                pessoas se cadastrem no seu grupo
              </Col>
            </Row>
            <Formik
              initialValues={{
                title: title,
                courses: typeIdeaID,
                description: description
              }}
              enableReinitialize={true}
              validationSchema={props.addIdeaSchema}
              onSubmit={props.onValidSubmit}>
              {(formik) => {
                const { errors, touched, submitForm, setFieldValue } = formik;
                return (
                    <>
                      <Row>
                        <Col md={12} className='field'>
                          <Field
                            type="text"
                            name="title"
                            placeholder="Título"
                            className={errors.title && touched.title ?
                              "inputError" : "fieldClass"}
                          />
                        </Col>
                        <Col md={12} className="infoErrorBox">
                          <ErrorMessage name="title" component="span" className="infoError" />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className='field'>
                          <Field
                            as="textarea"
                            type="textarea"
                            name="description"
                            minLength={2}
                            placeholder="Descrição"
                            style={{ height: "120px" }}
                            className={errors.description && touched.description ?
                              "inputError" : "fieldClass"}
                          />
                        </Col>
                        <Col md={12} className="infoErrorBox">
                          <ErrorMessage name="description" component="span" className="infoError" />
                        </Col>
                      </Row>                      
                      <Row>
                        <Col md={12} className='field'>
                          <Combobox
                            name="combobox"
                            className="comboBox"
                            data={radioItems}
                            value={props.choseTypeIdeaName}
                            onChange={(value) => {
                              let typeID = props.onChangeTypeStartup(value);
                              setFieldValue('courses', typeID);
                            }}
                          />
                        </Col>
                        <Col md={12} className="infoErrorBox">
                          <ErrorMessage name="courses" component="span" className="infoError" />
                        </Col>
                      </Row>
                      <FormGroup className="buttonDiv">
                      {renderIf(props.isLoading)(() => (
                        <Row>
                          <Col md='12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <ReactLoading type={"spinningBubbles"} color={'#ED145B'} height={50} width={50} />
                          </Col>
                        </Row>
                      ))}
                      {renderIf(!props.isLoading)(() => (
                        <Row>
                          <Col md='12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <CustomButton
                              icon={faPaperPlane}
                              text="Enviar"
                              onClick={() => submitForm()} />
                          </Col>
                        </Row>
                      ))}
                      </FormGroup>           
                    </>         
                );
              }}
            </Formik>            
          </Col>
        </Row>
      </Container>
    );
}

export default AddInfoView
