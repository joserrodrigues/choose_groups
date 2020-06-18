import React from 'react'
import { useEffect } from 'react'

import { Row, Col, Container, FormGroup, Alert} from 'reactstrap';
import { AvForm, AvFeedback, AvInput, AvGroup} from 'availity-reactstrap-validation';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ReactLoading from 'react-loading';
import CustomButton from '../../Component/Button/CustomButton'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Combobox } from 'react-widgets'
import renderIf from 'render-if'

import { } from './AddInfoView.css'

const AddInfoView = (props) => {
    
    let radioItems = null;
    let form = React.createRef();

    useEffect(() => {        
        if(props.isSuccess === 1){
            form && form.reset();
        }
    });

    const submitForm = () => {
        form.handleSubmit();
    }

    radioItems = props.arrayTypes.map(element => {
        return element.name;              
    });

    let sendInfo = null;
    if(props.isLoading){
        sendInfo = (
            <Row>
                <Col md='12' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
                    <ReactLoading type={"spinningBubbles"} color={'#ED145B'} height={50} width={50}/>                    
                </Col>
            </Row>
        );
    } else {
        sendInfo = (
            <Row>
            <Col md='12' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
                <CustomButton 
                    icon={faPaperPlane}
                    text="Enviar"
                    onClick={() => submitForm() }/>                  
            </Col>
        </Row>
        )
        
    }

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
    let name = "";
    let rm = "";
    let grade = "";
    let email = "";
    let title = "";
    let description = "";    
    if(props.isEditing){
        name = props.editIdea.owner_name;
        rm = props.editIdea.owner_rm;
        grade = props.editIdea.owner_grade;
        email = props.editIdea.owner_email;
        title = props.editIdea.title;
        description = props.editIdea.description;
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
            <AvForm
              className="hidden"
              onValidSubmit={props.onValidSubmit}
              ref={(c) => (form = c)}
            >
              {/*                         
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
                                value={name}
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
                                value={rm}
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
                                value={grade}
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
                                value={email}
                                required
                            />
                            <AvFeedback>Favor preencher um e-mail válido</AvFeedback>
                        </AvGroup>
                        */}
              <AvGroup className="input-group">
                <AvInput
                  type="text"
                  name="title"
                  minLength={2}
                  placeholder="Título"
                  value={title}
                  required
                />
                <AvFeedback>Favor preencher o título da idéia</AvFeedback>
              </AvGroup>
              <AvGroup className="input-group">
                <AvInput
                  type="textarea"
                  name="description"
                  minLength={2}
                  placeholder="Descrição"
                  value={description}
                  style={{ height: "120px" }}
                  required
                />
                <AvFeedback>Favor preencher a descrição da idéia</AvFeedback>
              </AvGroup>

              <Combobox
                name="combobox"
                className="comboBox"
                data={radioItems}
                value={props.choseTypeIdeaName}
                onChange={props.onChangeTypeStartup}
              />
              {renderIf(props.typeIdeaError)(() => (
                <div className="messageError">
                  Favor escolher um tipo de startup
                </div>
              ))}

              <FormGroup className="buttonDiv">{sendInfo}</FormGroup>
            </AvForm>
          </Col>
        </Row>
      </Container>
    );
}

export default AddInfoView
