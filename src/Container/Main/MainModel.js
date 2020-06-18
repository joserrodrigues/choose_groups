
import { db } from "../../utils/Firestore";
import firebase from "firebase";
import moment from 'moment';
class MainModel {

    exportData = (info ) => {

    }

    getIdeaInfo = (currentRM, callback) => {
        db.collection("ideas")
        .onSnapshot(function(snapshot) {
            var ideas = [];
            let hasOwnIdeas = false;
            let hasIdeasSubscribed = false;



            let info = "[";
            snapshot.forEach(function(doc) {
                let usersIdea = [];
                let isCurrentIdeaSubscribed = false;
                info += JSON.stringify(doc.data()) + ",";
                
                doc.data().users.forEach(function(user){                    
                    if(currentRM === user.rm){
                        hasIdeasSubscribed = true;
                        isCurrentIdeaSubscribed = true;
                    }
                    usersIdea.push({
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                      grade: user.grade,
                      rm: user.rm,
                      owner: user.owner,
                    });
                });

                if(currentRM === doc.data().owner_rm){
                    hasOwnIdeas = true;
                }
                ideas.push({
                  uid: doc.id,
                  owner_name: doc.data().owner_name,
                  owner_email: doc.data().owner_email,
                  owner_phone: doc.data().owner_phone,
                  owner_rm: doc.data().owner_rm,
                  owner_grade: doc.data().owner_grade,
                  create_time: doc.data().create_time,
                  update_time: doc.data().update_time,
                  title: doc.data().title,
                  description: doc.data().description,
                  isCurrentIdeaSubscribed: isCurrentIdeaSubscribed,
                  type: {
                    id: doc.data().type.id,
                    name: doc.data().type.name,
                  },
                  users: usersIdea,
                });
            });

            info += "]";

            if (parseInt(currentRM,10) === 99999999){
                var storageRef = firebase.storage().ref();
                var mountainsRef = storageRef.child(
                  "database_" + moment().format("Y-MM-DD_H")+ ".txt"
                );
                mountainsRef.putString(info).then(function (snapshot) {
                console.log("Uploaded a raw string!");
                });                
            }
            callback(ideas, hasOwnIdeas, hasIdeasSubscribed);

        });
    }

    deleteIdea = (idea) => {
        db.collection("ideas").doc(idea.uid).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            alert("Erro ao remover a idéia: " + error)
        });        
    }

    uploadInfo = (info, name) => {
        var storageRef = firebase.storage().ref();
        var mountainsRef = storageRef.child(
            "info_" + name + ".txt"
        );
        mountainsRef.putString(info).then(function (snapshot) {
            console.log("Uploaded a raw string!");
        }); 
    }

}


export default MainModel;

