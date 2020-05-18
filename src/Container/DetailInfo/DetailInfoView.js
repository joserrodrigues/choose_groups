
import React  from 'react'
import { Row, Col, Container, Alert } from 'reactstrap'
import ReactLoading from 'react-loading';
import { } from './DetailInfoView.css'
import CustomButton from '../../Component/Button/CustomButton';
import { faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import TypeIdeas from '../../utils/TypeIdeas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {maxPersonGroup } from '../../utils/Constants'

const DetailInfoView = (props) => {

    let currentRm = localStorage.getItem("user_rm");
    let sendInfo = null;
    let hasSubscribed = false;
    let userCanSubscribeIdeas = true;

    if(props.userHasRegistered || props.userHasSubscribed){
        userCanSubscribeIdeas = false;
    }

    let users = props.ideaSelected.users.map((user) => {
        let buttonGoOut = null;      
        if(currentRm === user.rm && user.owner === 0){
            if(props.isLoadingGoOut){
                buttonGoOut = 
                    <ReactLoading type={"spinningBubbles"} color={'#ED145B'} height={50} width={50}/> 
            } else {
                buttonGoOut = 
                    <CustomButton 
                    icon={faUsers}
                    text="Sair"
                    onClick={() => props.unSubscribeIdea()}/>    
            }
            hasSubscribed = true;
        }
        return (
            <Row key={user.rm}>
                <Col md="9" xs="8" lg="8">
                    <Row>
                        <Col md="12" className="descInfoDetailInfoName">{user.name} </Col>
                        <Col md="12" className="descInfoDetailInfoGrade">{user.grade} </Col>
                    </Row>
                </Col>
                <Col md="3" xs="4" lg="4">
                    <Row style={{height: '100%'}}>
                        <Col md="12" className="buttonGoOutDiv">
                            {buttonGoOut}
                        </Col>
                        
                    </Row>
                </Col>
                <Col md="12" className="descInfoDetailInfoLineDiv">
                            <hr className="descInfoDetailInfoLine"></hr>
                </Col>
            </Row>                
        );
    })

    if(props.isLoading){
        sendInfo = (
            <Row>
                <Col md='12' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
                    <ReactLoading type={"spinningBubbles"} color={'#ED145B'} height={50} width={50}/>                    
                </Col>
            </Row>
        );
    } else {
        if(props.ideaSelected.owner_rm !== currentRm && !hasSubscribed && 
            props.ideaSelected.users.length < maxPersonGroup && userCanSubscribeIdeas){
            sendInfo = (
                <Row>
                    <Col md='12' className="divButtonDetailInfo" >
                        <CustomButton 
                            icon={faUsers}
                            text="Inscrever"
                            onClick={() => props.subscribeIdea()}/>      
                    </Col>
                </Row>
            )
        } else {
            sendInfo = (
                <Row>
                    <Col md='12' className="divfinalSpace" >
                    </Col>
                </Row>
            )
        }
    }

    let alertInfo = null;
    if(props.isSuccess === 1){
        alertInfo = (
            <Alert color="success">
                Inscrição realizada com sucesso
            </Alert>
        )        
    } else if(props.isSuccess === 2){
        
        alertInfo = (
            <Alert color="danger">
                Erro ao se inscrever ao grupo {props.errorInfo}
            </Alert>
        )
    }

    const typeIdeas = new TypeIdeas();
    let icon = typeIdeas.getIcon(props.ideaSelected.type.id);

    return (
        <div style={{height: '100%'}}>
        <Container  className="containerDetailInfo">     
            {alertInfo}            
            <Row className="align-items-center" style={{ height: "100%"}} >
                <Col md='12'>
                    <Row>
                        <Col md='12' className='closeButtonAddInfo'>
                            <CustomButton 
                                
                                icon={faTimes}
                                text=""
                                onClick={() => props.handleClick(null)}/>
                        </Col>
                    </Row>   
                    <Row>
                        <Col md="12">
                            <div className="titleInfoDetailInfo">Título</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="">{props.ideaSelected.title}</Col>
                    </Row>    
                    <Row>
                        <Col md="12">
                            <div className="titleInfoDetailInfo">Descrição</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="descInfoDetailInfo">{props.ideaSelected.description}</Col>
                    </Row>    
                    <Row>
                        <Col md="12">
                            <div className="titleInfoDetailInfo">Tipo Startup</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="">
                            <FontAwesomeIcon icon={icon} className="iconDetailInfo" />
                            {props.ideaSelected.type.name}
                        </Col>
                    </Row>    
                    <Row>
                        <Col md="12">
                            <div className="titleInfoDetailInfo">Membros</div>
                        </Col>
                    </Row>
                     {users}
                    <Row>
                        <Col md="12">{sendInfo}</Col>
                    </Row>    
                </Col>
            </Row>                            
        </Container>
        </div>    
    )
}
export default DetailInfoView