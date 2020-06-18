import React, {useState} from 'react';

import UserInfoView from './UserInfoView'
import UserInfoModel from './UserInfoModel'
import Grades from "../../utils/Grades";

const UserInfoController = (props) => {

    const [choseGradeName, setChoseGradeName] = useState("Escolha o curso");
    const [gradeNameError, setGradeNameError] = useState(false);

    const grades = new Grades();
    let arrayGrades = grades.getGradesArray();

    const onChangeGrade = (value) => {
      let typeIdeaID = grades.getGradeByName(value);
      setChoseGradeName(value);
      setGradeNameError(typeIdeaID === 0);
    };    
    const onValidSubmit = (event, values) => {        
        console.log(values);

        let typeIdeaID = grades.getGradeByName(choseGradeName);
        if(typeIdeaID === 0){
            setGradeNameError(typeIdeaID === 0);
            return false;
        }

        let userInfoModel = new UserInfoModel();
        userInfoModel.saveUser(values, choseGradeName);
        props.closeInitialModal(false);
    }

    return (
      <UserInfoView
        modal={props.showInitialModal}
        onValidSubmit={onValidSubmit}
        arrayGrades={arrayGrades}
        choseGradeName={choseGradeName}
        gradeNameError={gradeNameError}
        onChangeGrade={onChangeGrade}
        closeInitialModal={props.closeInitialModal}
      />
    );
}
export default UserInfoController
