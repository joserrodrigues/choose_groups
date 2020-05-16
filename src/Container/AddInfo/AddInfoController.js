import React, { useState, useEffect} from 'react'
import AddInfoView from './AddInfoView'

import AddInfoModel from './AddInfoModel';
import TypeIdeas from '../../utils/TypeIdeas'

const AddInfoController = (props) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(0);
    const [ errorInfo, setErrorInfo ] = useState('');
    const [ choseTypeIdea, setChoseTypeIdea ] = useState(0);
    const [ choseTypeIdeaName, setChoseTypeIdeaName ] = useState("Escolha o tipo de Startup");
    const [ typeIdeaError, setTypeIdeaError ] = useState(false);


    let addInfoModel = new AddInfoModel();
    const typeIdeas = new TypeIdeas();
    let arrayTypes = typeIdeas.getTypeArray();

    let isEditing = props.editIdea !== null;    

    useEffect(() => {
        console.log(" Idea has change ");
        console.log(props.editIdea);
        if(isEditing){
            setChoseTypeIdea(props.editIdea.type.id);        
            setChoseTypeIdeaName(props.editIdea.type.name);
        } else {
            setChoseTypeIdea(0);
            setChoseTypeIdeaName("Escolha o tipo de Startup");
        }
    }, [props.editIdea]); // Only re-run the effect if count changes
      
    const onChangeTypeStartup = (value) => {
        let typeIdeaID = typeIdeas.getTypeByName(value);
        setChoseTypeIdea(typeIdeaID);        
        setChoseTypeIdeaName(value);        
        setTypeIdeaError(typeIdeaID === 0);
    }

    const onValidSubmit = (event, values) => {        
        console.log(values);
        console.log(choseTypeIdea);

        if(choseTypeIdea === 0){
            setTypeIdeaError(true);
            return;
        }

        setIsLoading(true);
        if(isEditing){
            addInfoModel.saveIdea(values, choseTypeIdea, props.editIdea, callbackSaveIdea);       
        } else {
            addInfoModel.addIdea(values, choseTypeIdea, callbackSaveIdea);       
        }
    }

    const callbackSaveIdea = (isSuccess, error) => {
        setIsLoading(false);
                
        if(!isSuccess){
            setErrorInfo(error.description);
            setIsSuccess(2);
        } else {
            setIsSuccess(1);            
        }
        console.log( "Retorno = " + isSuccess + " error " + error);
    
        setTimeout(() => {            
            setIsSuccess(0);   
            props.handleClick(null); 
        }, 3000);
    }

    const handleClick = () => {
        setIsSuccess(0);
        props.handleClick(null);
    }
    return (
        <AddInfoView
            onValidSubmit={onValidSubmit}
            handleClick={handleClick} 
            arrayTypes={arrayTypes} 
            isLoading={isLoading}
            isSuccess={isSuccess}
            errorInfo={errorInfo}
            typeIdeaError={typeIdeaError}
            choseTypeIdeaName={choseTypeIdeaName}            
            isEditing={isEditing}
            editIdea={props.editIdea}
            onChangeTypeStartup={onChangeTypeStartup}
        />
        
    )
}

export default AddInfoController

