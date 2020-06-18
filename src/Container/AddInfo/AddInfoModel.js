import {db} from "../../utils/Firestore";
import TypeIdeas from '../../utils/TypeIdeas';
import moment from 'moment';

class AddInfoModel {
    addIdea = (values, choseTypeIdea, callback) => {
        const typeIdeas = new TypeIdeas();
        const typeIdeaName = typeIdeas.getTypeName(choseTypeIdea);
        console.log(typeIdeaName + " - " + values.type);

        let name = localStorage.getItem("user_name");
        let email = localStorage.getItem("user_email");
        let phone = localStorage.getItem("user_phone");
        let rm = localStorage.getItem("user_rm");
        let grade = localStorage.getItem("user_grade");
  

        db.collection("ideas")
          .add({
            owner_name: name,
            owner_email: email,
            owner_phone: phone,
            owner_grade: grade,
            owner_rm: rm,
            title: values.title,
            description: values.description,
            type: {
              id: choseTypeIdea,
              name: typeIdeaName,
            },
            users: [
              {
                name: name,
                email: email,
                phone: phone,
                grade: grade,
                rm: rm,
                owner: 1,
              },
            ],
            create_time: moment().format("YYYY-MM-DD HH:mm:ss"),
            update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
          })
          .then(function () {
            callback(true, null);
          })
          .catch(function (error) {
            callback(false, error);
          });   
    }

    saveIdea = (values, choseTypeIdea, previousIdea, callback) => {
      const typeIdeas = new TypeIdeas();
      const typeIdeaName = typeIdeas.getTypeName(choseTypeIdea);
      console.log(typeIdeaName + " - " + values.type);

      let name = localStorage.getItem("user_name");
      let email = localStorage.getItem("user_email");
      let phone = localStorage.getItem("user_phone");
      let rm = localStorage.getItem("user_rm");
      let grade = localStorage.getItem("user_grade");

      //Instance new User
      let newUsers = [];

      //Get First User (Owner)
      let firstRm = rm;
      newUsers.push({
        name: name,
        email: email,
        phone: phone,
        grade: grade,
        rm: rm,
        owner: 1,
      });
      

      //Add other users
      previousIdea.users.forEach((user) =>{
        if(firstRm !== user.rm){
          newUsers.push(user);
        }
      });

      console.log(newUsers);
      //Update Info      
      db.collection("ideas")
        .doc(previousIdea.uid)
        .update({
          owner_name: name,
          owner_email: email,
          owner_phone: phone,
          owner_grade: grade,
          owner_rm: rm,
          title: values.title,
          description: values.description,
          update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
          type: {
            id: choseTypeIdea,
            name: typeIdeaName,
          },
          users: newUsers,
        })
        .then(function () {
          callback(true, null);
        })
        .catch(function (error) {
          callback(false, error);
        });
  }

}


export default AddInfoModel;

