import React from 'react'
import { Row, Col, Popover, PopoverBody, Button } from 'reactstrap';

import MainSeparateView from './MainSeparateView'
import CustomButton from '../../Component/Button/CustomButton'
import UserInfoController from '../UserInfo/UserInfoController'
import SearchBar from '../../Component/SearchBar/SearchBar'
import renderIf from 'render-if'

import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

import { } from './MainView.css'

const MainView = (props) => {



    let firstLetterName = "";
    let userName = "";
    let userRM = "";
    let name = localStorage.getItem("user_name");
    let rm = localStorage.getItem("user_rm");
    if(name !== "" && name !== null){
      firstLetterName = name[0];    
      userName = name;    
      userRM = rm;    
    }
        
    const { innerWidth: width } = window;
    // console.log(" Width = " + width);

    let logoImg = 'img/Logo.png';
    let placement = "bottom";
    if(width < 900){
      logoImg = 'img/Logo_small.png';
      placement = "left";
    }

    // console.log ( " Check Ideas = " + props.userHasSubscribed + " - " + props.userHasRegistered);

    return (
      <Row>
        <Col md='12'>
            <UserInfoController 
              showInitialModal={props.showInitialModal}
              closeInitialModal={props.closeInitialModal}/>

            <Row className='headerRow'>
                <Col md='4' sm="4" xs="4">
                  <div className='logoDiv'>
                    <img src={logoImg} className='logoImg' alt="LogoFiap"/>
                  </div>
                  
                </Col>
                <Col md='8' sm="8" xs="8" className="rightHeader" >
                  <Row>
                    <Col md='12' className="userInfoDiv">
                        {renderIf(!props.isMenuOpened && width > 900)(() => (
                            <SearchBar
                              allowCreate="onFilter"
                              onChange={props.changeSearchBar}
                            />
                        ))}
                        {renderIf(!props.userHasRegistered && !props.userHasSubscribed)(() => (
                            <CustomButton 
                              icon={faLightbulb}
                              text="Nova Oportunidade"
                              onClick={() => props.handleClick(null)}
                              className="buttonNewIdea"/>
                        ))}


                      <div id="Popover1" type="button" className="PopupName" onClick={() => props.toggleUserInfo}>
                        {firstLetterName}
                      </div>
                      <Popover placement={placement} isOpen={props.popoverOpen} 
                            target="Popover1" toggle={props.toggleUserInfo}
                            >                        
                        <PopoverBody>
                          <Row>
                              <Col className="userInfoTitle">{userName}</Col>
                          </Row>
                          <Row>
                              <Col className="userInfoDesc">RM: {userRM}</Col>
                          </Row>
                          <Row>
                            <Col className="userInfoButton"
                             onClick={() => props.closeInitialModal(true)}>
                               <Button color="info" className="buttonLogoutUser">Sair</Button>
                             </Col>
                          </Row>
                        </PopoverBody>
                      </Popover>
                    </Col>
                  </Row>
                </Col>
            </Row>
            {renderIf(!props.isMenuOpened && width <= 900)(() => (
                    <Row>
                      <Col sm="12" xs="12">
                            <SearchBar
                              allowCreate="onFilter"
                              onChange={props.changeSearchBar}
                            />
                      </Col>
                    </Row>
            ))}            
            <Row>
                <Col md='12'>
                  <MainSeparateView
                    style={{ pointerEvents: "none", opacity: "0.4"}}
                    handleClick={props.handleClick} 
                    isMenuOpened={props.isMenuOpened}
                    ideas={props.ideas}
                    userHasRegistered={props.userHasRegistered}
                    userHasSubscribed={props.userHasSubscribed}
                    ideaSelected={props.ideaSelected}
                    showInfoIdea={props.showInfoIdea}
                    handleDeleteItem={props.handleDeleteItem}
                    handleEditItem={props.handleEditItem}
                     />
                </Col>
            </Row>
        </Col>          
      </Row>
    )
}

export default MainView

