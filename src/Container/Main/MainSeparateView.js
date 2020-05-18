import React from 'react'

import CardsListView from './CardsListView'
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import AddInfoController from '../AddInfo/AddInfoController'
import DetailInfoController from '../DetailInfo/DetailInfoController'

import { } from './MainView.css'

const MainSeparateView = (props) => {
    let sidePage = null;

    if(!props.showInfoIdea){
      sidePage = <AddInfoController
                    editIdea={props.ideaSelected}
                    handleClick={props.handleClick}  />
    } else {
      sidePage = <DetailInfoController
          ideaSelected={props.ideaSelected}
          handleClick={props.handleClick}
          userHasRegistered={props.userHasRegistered}
          userHasSubscribed={props.userHasSubscribed}
          />
    }
    
    const { innerWidth: width } = window;
    let sidePageWidth = 500;
    if( width <= 500){
      sidePageWidth = width;
    }
    return (
        <OffCanvas
        width={sidePageWidth}
        transitionDuration={100}
        effect={"overlay"}
        isMenuOpened={props.isMenuOpened}
        position={"right"}
      >
        <OffCanvasBody>
            <CardsListView
              ideas={props.ideas}
              handleClick={props.handleClick}
              handleDeleteItem={props.handleDeleteItem}
              handleEditItem={props.handleEditItem}
               />
        </OffCanvasBody>
        <OffCanvasMenu 
            className="sidePageDiv">
          {sidePage}
        </OffCanvasMenu>
      </OffCanvas>
    )
}

export default MainSeparateView

