import React from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap';
import TypeIdeas from '../../utils/TypeIdeas'
import { } from './Cards.css'
import CustomButton from '../Button/CustomButton'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt, faEdit , faLightbulb } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import renderIf from 'render-if'
import { maxPersonGroup } from "../../utils/Constants";

const Cards = (props) => {
    const typeIdeas = new TypeIdeas();
    let typeName = typeIdeas.getTypeName(props.idea.type.id);
    let icon = typeIdeas.getIcon(props.idea.type.id);
    let noUsers = props.idea.users.length;
    let allowEdit = parseInt(props.idea.owner_rm,10) === parseInt(localStorage.getItem("user_rm"),10);

    let cardSelectedClass = "";
    if(props.idea.isCurrentIdeaSubscribed){
        cardSelectedClass = "cardSelect";
    }

    if(typeName === "Intraempreendedorismo"){
      typeName = "Intraempreend.";
    }

    let imgSelected = null;
    if(props.idea.isCurrentIdeaSubscribed){
        imgSelected = <div className="cardImgSelected"></div>;
    }
    
    return (
      <div>
        <Card key={props.idea.uid}>
          <CardBody className="cardBody cardSelected">
            {imgSelected}
            <Row>
              <Col md="12" className={"titleCard " + cardSelectedClass}>
                {props.idea.title}
              </Col>
            </Row>
            <Row>
              <Col md="12" className={"subtitleCard "}>
                {props.idea.description}
              </Col>
            </Row>
            <Row>
              <Col md="12" className={"subtitleCardNoUser "}>
                <span>Vagas restantes:</span> {maxPersonGroup - noUsers}
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col md="7" xs="6" className="CardButton">
                <CustomButton
                  icon={faPlus}
                  fontSize="12px"
                  text="Saiba Mais"
                  onClick={() => props.handleClick(props.idea)}
                />
              </Col>
              <Col md="5" xs="6">
                {renderIf(allowEdit)(() => (
                  <Row className="rowCardButtons">
                    <Col md="12" className="CardButtonIcon">
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="iconButtonCard"
                        onClick={() => props.handleDeleteItem(props.idea)}
                        style={{ marginRight: "10px" }}
                      />
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="iconButtonCard"
                        onClick={() => props.handleEditItem(props.idea)}
                      />
                    </Col>
                  </Row>
                ))}
                {renderIf(!allowEdit && !props.idea.isCurrentIdeaSubscribed)(
                  () => (
                    <Row className={"rowCardButtons " + cardSelectedClass}>
                      <Col md="12" className="divIconCard">
                        <FontAwesomeIcon
                          icon={icon}
                          className={"iconCard " + cardSelectedClass}
                        />
                      </Col>
                      <Col
                        md="12"
                        className={"CardTypeName " + cardSelectedClass}
                      >
                        {typeName}
                      </Col>
                    </Row>
                  )
                )}
                {renderIf(!allowEdit && props.idea.isCurrentIdeaSubscribed)(
                  () => (
                    <Row className={"rowCardButtons " + cardSelectedClass}>
                      <Col md="12" className="divIconCard">
                        <FontAwesomeIcon
                          icon={faLightbulb}
                          className={"iconCard " + cardSelectedClass}
                        />
                      </Col>
                      <Col
                        md="12"
                        className={"CardTypeName " + cardSelectedClass}
                      >
                        Inscrito
                      </Col>
                    </Row>
                  )
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
}

export default Cards

