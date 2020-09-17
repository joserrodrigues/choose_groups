import {db} from "../../utils/Firestore";
import moment from 'moment';
import { maxPersonGroup } from '../../utils/Constants'

class DetailInfoModel {
    
    subscribeIdea = (currentIdea, callback) => {

      let name = localStorage.getItem("user_name");
      let email = localStorage.getItem("user_email");
      let phone = localStorage.getItem("user_phone");
      let rm = localStorage.getItem("user_rm");
      let grade = localStorage.getItem("user_grade");

      let dbIdea = db.collection("ideas").doc(currentIdea.uid);
      
      dbIdea.get().then(function(doc) {        
        if (!doc.exists) {
            callback(false, {
                description: "Idéia não encontrada",
            });
        }
        let newUsers = doc.data().users;
        if(newUsers.length >= maxPersonGroup){
            callback(false, {
                description: "Esse grupo já possui "+maxPersonGroup+" membros"
            });
            return;
        }
    
        //Add new User      
        newUsers.push({
          name: name,
          email: email,
          phone: phone,
          grade: grade,
          rm: rm,
          owner: 0,
        });      
        // console.log(newUsers);

        //Update Info      
        dbIdea.update({
            users: newUsers,
            update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
        .then(function() {
            callback(true, null);
        })
        .catch(function(error) {
            callback(false, error);
        });
    }).catch(function(error) {
        callback(false, error);
    });
  }
  unSubscribeIdea = (currentIdea, callback) => {

    let rm = localStorage.getItem("user_rm");

    let dbIdea = db.collection("ideas").doc(currentIdea.uid);    
    dbIdea.get().then(function(doc) {        
        if (!doc.exists) {
            callback(false, {
                description: "Idéia não encontrada",
            });
        }

        let owner_rm = doc.data().owner_rm;
        if(rm === owner_rm){
            //Change Owner to Fiap
            owner_rm = 888888;
        }
        let newUsers = [];
        doc.data().users.forEach(element => {
            if(element.rm !== rm){
                //replace element
                newUsers.push({
                  name: element.name,
                  email: element.email,
                  phone: element.phone,
                  grade: element.grade,
                  rm: element.rm,
                  owner: element.owner,
                });  
            }
        });
  
        //Update Info      
        dbIdea.update({
            users: newUsers,
            owner_rm: owner_rm,
            update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
        .then(function() {
            callback(true, null);
        })
        .catch(function(error) {
            callback(false, error);
        });
  }).catch(function(error) {
      callback(false, error);
  });
}

}


export default DetailInfoModel;

