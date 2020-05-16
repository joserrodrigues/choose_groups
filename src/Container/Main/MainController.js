import React, { useState, useEffect } from 'react'
import MainView from './MainView'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { } from './MainView.css'
import { orderBy, filter } from 'lodash';

import MainModel from './MainModel';


const MainController = () => {    
    const [ isMenuOpened, setIsMenuOpened ] = useState(false);
    const [ ideas, setIdeas ] = useState([]);
    const [ filteredIdeas, setFilteredIdeas ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    const [ ideaSelected, setIdeaSelected ] = useState(null);
    const [ showInfoIdea, setShowInfoIdea ] = useState(false);
    const [ showInitialModal, setShowInitialModal ] = useState(false);

    const [popoverOpenUserInfo, setPopoverOpenUserInfo] = useState(false);

    const mainModel = new MainModel();

    const handleClick = (idea) => {
        if(idea !== null){
            localStorage.setItem("showIdea_uid", idea.uid)
            localStorage.setItem("showIdea_update", idea.update_time)
        } else {
            localStorage.setItem("showIdea_uid", 0 );
            localStorage.setItem("showIdea_update", 0 );
        }
        
        setIsMenuOpened(!isMenuOpened);
        setIdeaSelected(idea);
        setShowInfoIdea(idea !== null);
    }

    useEffect(() => {
        mainModel.getIdeaInfo(changeIdeaCallBack);
        console.log("Olhando Rubens");
        console.log(localStorage.getItem("user_rm"));
        if(localStorage.getItem("user_rm") !== null){
            setShowInitialModal(false); 
        } else {
            setShowInitialModal(true);
        }

    }, [])
    
    const changeIdeaCallBack = ( newIdeas ) => {
        newIdeas = orderBy(newIdeas, ['create_time'] , ['desc'])

        setIdeas(newIdeas);
        let showIdeaRm = localStorage.getItem("showIdea_uid");
        let showIdeaUpdate = localStorage.getItem("showIdea_update");
        console.log(newIdeas);

        if(showIdeaRm !== 0){
            newIdeas.forEach(element => {
                if(element.uid === showIdeaRm && 
                    showIdeaUpdate !== element.update_time){
                    localStorage.setItem("showIdea_uid", element.uid)
                    localStorage.setItem("showIdea_update", element.update_time)
                    setIdeaSelected(element);
                }
            });
        }

        if(searchText === ""){
            setFilteredIdeas(newIdeas);
        }
    }
    
    const handleDeleteItem = (idea) => {
        confirmAlert({
            title: 'Deletar Ideia',
            message: 'Deseja realmente deletar a ideia ' + idea.title+'?',
            buttons: [
              {
                label: 'Sim',
                onClick: () => {
                    mainModel.deleteIdea(idea);
                }
              },
              {
                label: 'Não'
              }
            ]
          });
    }

    const handleEditItem = (idea) => {
        console.log("Do nothing");
        setIdeaSelected(idea);
        setIsMenuOpened(true);
        setShowInfoIdea(false);
    }

    const closeInitialModal = (open) => {
        setShowInitialModal(open);
        setPopoverOpenUserInfo(false);
    }

    const changeSearchBar = (search) => {
        console.log(search);
        setSearchText(search);
        const lowerSearch = search.toLowerCase();
        const filteredIdeas =  filter(ideas, (idea) => {
            if (idea.title.toLowerCase().indexOf(lowerSearch) > -1
                || idea.description.toLowerCase().indexOf(lowerSearch) > -1
                || idea.type.name.toLowerCase().indexOf(lowerSearch) > -1
                ) {
                return true;
            }
            return false;
        })
        setFilteredIdeas(filteredIdeas);
    }

    const toggleUserInfo = () => {
        setPopoverOpenUserInfo(!popoverOpenUserInfo);
      }
  

    if(isMenuOpened){
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
    return (
        <MainView
            handleClick={handleClick} 
            isMenuOpened={isMenuOpened}
            ideas={filteredIdeas}
            ideaSelected={ideaSelected}
            showInfoIdea={showInfoIdea}
            showInitialModal={showInitialModal}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
            closeInitialModal={closeInitialModal}
            changeSearchBar={changeSearchBar}
            popoverOpen={popoverOpenUserInfo}
            toggleUserInfo={toggleUserInfo}
             />
    )
}

export default MainController

