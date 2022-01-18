import React from 'react'
import { Row, Col } from 'reactstrap';
import Cards from '../../Component/Cards/Cards'

const CardListView = (props) => {

    let cardList = [];
    props.ideas.forEach(idea => {
        cardList.push(
            <Col md='6' lg='4' xl='3' key={idea.uid}>
                <Cards idea={idea}
                    handleClick={props.handleClick} 
                    key={idea.uid}
                    handleDeleteItem={props.handleDeleteItem}
                    handleEditItem={props.handleEditItem}/>
            </Col>
            
        )
    });
    return (
        <Row>
            <Col md='12' style={{marginTop: '25px'}}>
                <Row>
                    {cardList}
                </Row>
            </Col>
        </Row>
    )
}

export default CardListView

