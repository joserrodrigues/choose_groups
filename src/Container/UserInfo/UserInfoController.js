import React, { useState } from 'react';

import UserInfoView from './UserInfoView'
import UserInfoModel from './UserInfoModel'
import Grades from "../../utils/Grades";
import * as Yup from "yup";
import "yup-phone";

const UserInfoController = (props) => {

  const [choseGradeName, setChoseGradeName] = useState("Escolha o curso");
  const [gradeNameError] = useState(false);

  const grades = new Grades();
  let arrayGrades = grades.getGradesArray();

  const onChangeGrade = (value) => {
    let typeIdeaID = grades.getGradeByName(value);
    setChoseGradeName(value);
    return typeIdeaID;
  };

  const addUserSchema = Yup.object().shape({
    rm: Yup.string().required("Favor preencher um RM"),
    name: Yup.string().required("Favor preencher um nome válido"),
    email: Yup.string().email().required("Favor preencher um e-mail válido"),
    courseName: Yup.string().required("Favor preencher um o nome do seu curso"),
    // courses: Yup.number().min(1,"Favor preencher uma turma válida"),
    phone: Yup.string().phone("BR", true, "Favor preencher uma telefone válido")
  });

  const onValidSubmit = (values) => {
    console.log(values);

    // let typeIdeaID = grades.getGradeByName(choseGradeName);

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
      addUserSchema={addUserSchema}
      closeInitialModal={props.closeInitialModal}
    />
  );
}
export default UserInfoController
