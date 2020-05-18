
import {db} from "../../utils/Firestore";

class MainModel {
    getIdeaInfo = (currentRM, callback) => {
        db.collection("ideas")
        .onSnapshot(function(snapshot) {
            var ideas = [];
            let hasOwnIdeas = false;
            let hasIdeasSubscribed = false;

            snapshot.forEach(function(doc) {
                let usersIdea = [];
                let isCurrentIdeaSubscribed = false;
                doc.data().users.forEach(function(user){
                    console.log(user);
                    if(currentRM === user.rm){
                        hasIdeasSubscribed = true;
                        isCurrentIdeaSubscribed = true;
                    }
                    usersIdea.push({
                        name: user.name,
                        email: user.email,
                        grade: user.grade,
                        rm: user.rm,                        
                        owner: user.owner,                        
                    })
                });

                if(currentRM === doc.data().owner_rm){
                    hasOwnIdeas = true;
                }
                ideas.push({
                    uid: doc.id,
                    owner_name: doc.data().owner_name,
                    owner_email: doc.data().owner_email,
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
            callback(ideas, hasOwnIdeas, hasIdeasSubscribed);
        });
    }

    deleteIdea = (idea) => {
        console.log(idea.uid);
        db.collection("ideas").doc(idea.uid).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            alert("Erro ao remover a idéia: " + error)
        });
        
    }

}


export default MainModel;

