import React, {useState, useEffect} from 'react'
import MainModel from '../Main/MainModel'

const ReportControl = (props) => {

    const mainModel = new MainModel();
    const [textInfo, setTextInfo] = useState("");
    
    useEffect(() => {
        
        let userRm = localStorage.getItem("user_rm");
        if (userRm === null || userRm === undefined) {
            userRm = 0;
        }
        mainModel.getIdeaInfo(userRm, changeIdeaCallBack);

    }, [])

    const changeIdeaCallBack = (newIdeas, hasOwnIdeas, hasIdeasSubscribed) => {
        let tstTextInfo = "";
        newIdeas.forEach((ideas) => {
            if (ideas.users.length > 0){
                tstTextInfo += "<Br>\n ********************************************** <Br>\n";
                tstTextInfo += ideas.title+"<Br>\n";
                tstTextInfo += ideas.description+"<Br>\n";
                tstTextInfo += "<Br>\nUsers ------------------------- <Br>\n";
                ideas.users.forEach((user) => {
                    tstTextInfo += "RM: " +user.rm + "<Br>\n";
                    tstTextInfo += "Nome: " +user.name + "<Br>\n";
                    tstTextInfo += "Email: " +user.email + "<Br>\n";
                    tstTextInfo += "Telefone: " +user.phone + "<Br>\n";
                    tstTextInfo += "Curso: " +user.grade + "<Br>\n";
                    tstTextInfo += "<Br><br>\n\n";
                });
                tstTextInfo += "<Br>\n";
            }
        })
        mainModel.uploadInfo(tstTextInfo, "Report_base");
        setTextInfo(tstTextInfo);
    }


    return (
        <div>
            Teste {textInfo}
        </div>
    );
}

export default ReportControl;