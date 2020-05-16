import React from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap';
import TypeIdeas from '../../utils/TypeIdeas'
import { } from './Cards.css'
import CustomButton from '../Button/CustomButton'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import renderIf from 'render-if'

const Cards = (props) => {
    const typeIdeas = new TypeIdeas();
    let typeName = typeIdeas.getTypeName(props.idea.type.id);
    let icon = typeIdeas.getIcon(props.idea.type.id);
    let allowEdit = props.idea.owner_rm === localStorage.getItem("user_rm");
    
    return (
        <div>
        <Card key={props.idea.uid}>
            <CardBody className='cardBody'>
                <Row>
                    <Col md='12' className='titleCard'>
                        {props.idea.title}
                    </Col>
                </Row>
                <Row>
                    <Col md='12' className='subtitleCard'>
                        {props.idea.description}
                    </Col>
                </Row>
                <Row style={{ marginTop: '10px'}}>
                    <Col md='7' xs="6" className='CardButton'>
                        <CustomButton 
                            icon={faPlus}
                            fontSize="12px"
                            text="Saiba Mais"
                            onClick={() => props.handleClick(props.idea)}/>
                    </Col>
                    <Col md="5"  xs="6" >
                        {renderIf(allowEdit)(() => (
                            <Row className="rowCardButtons">                            
                                <Col md="12" className="CardButtonIcon">
                                    <FontAwesomeIcon icon={faTrashAlt} className="iconButtonCard"
                                        onClick={()=> props.handleDeleteItem(props.idea) }
                                        style={{ marginRight: '10px'}}/>
                                    <FontAwesomeIcon icon={faEdit} className="iconButtonCard"
                                        onClick={()=> props.handleEditItem(props.idea) }/>
                                </Col>
                            </Row>
                        ))}   
                        {renderIf(!allowEdit)(() => (
                            <Row className="rowCardButtons">
                                <Col md="12" className="divIconCard">
                                    <FontAwesomeIcon icon={icon} className="iconCard"/>
                                </Col>
                                <Col md="12" className="CardTypeName">
                                    {typeName}
                                </Col>
                            </Row>
                        ))}  
                    </Col>                    
                </Row>

            </CardBody>
        </Card>
        </div>
    )
}

export default Cards
