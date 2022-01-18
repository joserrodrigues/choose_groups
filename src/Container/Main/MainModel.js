
import { db } from "../../utils/Firestore";
import { collection, query, onSnapshot } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";

import moment from 'moment';
class MainModel {

    exportData = (info ) => {

    }

    getIdeaInfo = (currentRM, callback) => {

        

        const q = query(collection(db, "ideas"));
        onSnapshot(q, (querySnapshot) => {
            var ideas = [];
            let hasOwnIdeas = false;
            let hasIdeasSubscribed = false;



            let info = "[";
            querySnapshot.forEach(function(doc) {
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
                const storage = getStorage();
                const storageRef = ref(storage, "database_" + moment().format("Y-MM-DD_H") + ".txt");
                uploadString(storageRef, info).then((snapshot) => {
                    console.log('Uploaded a raw string!');
                });             
            }
            callback(ideas, hasOwnIdeas, hasIdeasSubscribed);

        });
    }

    deleteIdea = (idea) => {        
        deleteDoc(doc(db, "ideas", idea.uid)).then(function () {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            alert("Erro ao remover a idéia: " + error)
        });        
    }

    uploadInfo = (info, name) => {
        const storage = getStorage();
        const storageRef = ref(storage, "info_" + name + ".txt");
        uploadString(storageRef, info).then((snapshot) => {
            console.log('Uploaded a raw string!');
        });
    }

}


export default MainModel;

