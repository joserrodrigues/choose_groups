

class UserInfoModel {

    saveUser = (values) => {
        localStorage.setItem("user_rm", values.rm);
        localStorage.setItem("user_name", values.name);
        localStorage.setItem("user_email", values.email);
        localStorage.setItem("user_grade", values.grade);
        localStorage.setItem("showIdea_uid", 0);
        localStorage.setItem("showIdea_update", 0);
    }

}


export default UserInfoModel;

