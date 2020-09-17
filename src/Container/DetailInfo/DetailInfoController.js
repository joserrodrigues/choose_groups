import React, { useState } from 'react'
import DetailInfoView from './DetailInfoView'
import DetailInfoModel from './DetailInfoModel'

const DetailInfoController = (props) => {
    
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(0);
    const [ errorInfo, setErrorInfo ] = useState('');
    const [ isLoadingGoOut, setIsLoadingGoOut ] = useState(false);

    let detailInfoModel = new DetailInfoModel();

    const subscribeIdea = () => {
        setIsLoading(true);
        detailInfoModel.subscribeIdea(props.ideaSelected, callbackSubscribe);
    }
    
    const unSubscribeIdea = () => {
        setIsLoadingGoOut(true);
        detailInfoModel.unSubscribeIdea(props.ideaSelected, callbackSubscribe);
    }

    const callbackSubscribe = (isSuccess, error) => {
        setIsLoading(false);
        setIsLoadingGoOut(false);
                
        if(!isSuccess){
            setErrorInfo(error.description);
            setIsSuccess(2);
        } else {
            setIsSuccess(1);            
        }
        // console.log( "Retorno = " + isSuccess + " error " + error);
    
        setTimeout(() => {            
            setIsSuccess(0);    
        }, 5000);
    }

    return (
        <DetailInfoView
            ideaSelected={props.ideaSelected}
            handleClick={props.handleClick}
            subscribeIdea={subscribeIdea}
            unSubscribeIdea={unSubscribeIdea}
            isLoading={isLoading}
            isSuccess={isSuccess}
            errorInfo={errorInfo}
            isLoadingGoOut={isLoadingGoOut}
            userHasRegistered={props.userHasRegistered}
            userHasSubscribed={props.userHasSubscribed}
        />
        
    )
}
export default DetailInfoController