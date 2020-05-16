import React from 'react';

import UserInfoView from './UserInfoView'
import UserInfoModel from './UserInfoModel'

const UserInfoController = (props) => {


    const onValidSubmit = (event, values) => {        
        console.log(values);
        let userInfoModel = new UserInfoModel();
        userInfoModel.saveUser(values);
        props.closeInitialModal(false);
    }

    return (
        <UserInfoView 
            modal={props.showInitialModal}
            onValidSubmit={onValidSubmit}
            closeInitialModal={props.closeInitialModal}
        />
      );
}
export default UserInfoController
