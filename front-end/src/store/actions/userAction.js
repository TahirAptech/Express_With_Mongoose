import axios from "axios";

function getUsers() {
    return (dispatch) => {
        axios.get('http://localhost:9000/api/user')
            .then((response) => {
                console.log("axios:", response);
                dispatch({ type: 'GET_USERS', payload: response.data });
            }).catch(err => console.log(err));
    }
}

function addNewUser(user) {
    return dispatch => {
        axios.post('http://localhost:9000/api/user', { ...user }).then(dispatch({ type: 'Add_New_User', payload: { ...user } })).catch(err => console.log("Error:", err))
    }
}

function updateUser(id, user) {
    return (dispatch) => {
        axios.put(`http://localhost:9000/api/user?id=${id}`, { ...user })
            .then(dispatch({ type: 'Update_User', payload: { ...user, _id: id } }))
            .catch(err => console.log(err));
    }
}

function deleteUser(id) {
    return (dispatch) => {
        axios.delete(`http://localhost:9000/api/user?id=${id}`)
            .then(dispatch({ type: 'Delete_User', payload: id }))
            .catch(err => console.log(err))
    }
}

//#region 
// async function getUserById(id){
//     const data = await axios.get('http://localhost:9000/api/userById?id=' + id);
//     return data.data;
// }
//#endregion

export { getUsers, addNewUser, updateUser, deleteUser }