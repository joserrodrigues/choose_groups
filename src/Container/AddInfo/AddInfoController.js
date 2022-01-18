import React, { useState, useEffect} from 'react'
import AddInfoView from './AddInfoView'

import AddInfoModel from './AddInfoModel';
import TypeIdeas from '../../utils/TypeIdeas'
import * as Yup from "yup";

const AddInfoController = (props) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(0);
    const [ errorInfo, setErrorInfo ] = useState('');
    const [ choseTypeIdea, setChoseTypeIdea ] = useState(0);
    const [choseTypeIdeaName, setChoseTypeIdeaName] = useState(
      "Qual área de atuação da sua startup?"
    );
    const [ typeIdeaError, setTypeIdeaError ] = useState(false);


    let addInfoModel = new AddInfoModel();
    const typeIdeas = new TypeIdeas();
    let arrayTypes = typeIdeas.getTypeArray();

    let isEditing = props.editIdea !== null;    


    const addIdeaSchema = Yup.object().shape({
        title: Yup.string().required("Favor preencher o título da idéia"),
        description: Yup.string().required("Favor preencher a descrição da idéia"),
        courses: Yup.number().min(1, "Favor escolher um tipo de startup")
    });


    useEffect(() => {
        console.log(" Idea has change ");
        //console.log(props.editIdea);
        if(isEditing){
            setChoseTypeIdea(props.editIdea.type.id);        
            setChoseTypeIdeaName(props.editIdea.type.name);
        } else {
            setChoseTypeIdea(0);
            setChoseTypeIdeaName("Qual área de atuação da sua startup?");
        }
    }, [props.editIdea, isEditing]); // Only re-run the effect if count changes

      
    const onChangeTypeStartup = (value) => {
        let typeIdeaID = typeIdeas.getTypeByName(value);
        setChoseTypeIdea(typeIdeaID);        
        setChoseTypeIdeaName(value);        
        return typeIdeaID;
    }

    const onValidSubmit = (values) => {        
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
        // console.log( "Retorno = " + isSuccess + " error " + error);
    
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
            addIdeaSchema={addIdeaSchema}
        />
        
    )
}

export default AddInfoController

