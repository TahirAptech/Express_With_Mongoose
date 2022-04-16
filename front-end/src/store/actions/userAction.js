import axios from "axios";

function getUsers() {
    return (dispatch) => {
        axios.get('http://localhost:9000/api/user')
            .then((response) => {
                dispatch({ type: 'Add_User_List', payload: response.data });
            }).catch(err => console.log(err));
    }
}

function addNewUser(user, navigate) {
    return dispatch => {
        axios.post('http://localhost:9000/api/user', { ...user }).then((res) => {
            const createdUser = res.data;
            dispatch({ type: 'Add_New_User', payload: createdUser });
            dispatch({ type: 'User_Login', payload: createdUser });
            navigate("/Todo", { replace: false });
        }).catch(err => console.log("Error:", err))
    }
}

function updateUser(user) {
    return (dispatch) => {
        axios.put(`http://localhost:9000/api/user`, user)
            .then(res => {
                console.log(res.data);
                console.log("user", user);
                dispatch({ type: 'Update_User', payload: user });
                dispatch({ type: 'User_Login', payload: user });
            }).catch(err => console.log(err));
    }
}

function deleteUser(id) {
    return (dispatch) => {
        axios.delete(`http://localhost:9000/api/user?id=${id}`)
            .then(dispatch({ type: 'Delete_User', payload: id }))
            .catch(err => console.log(err))
    }
}

function UserLogin(e, navigate) {
    return (dispatch) => {
        dispatch({ type: "LoaderShowHide" });

        axios.post('http://localhost:9000/api/userLogin', e).then((res) => {
            debugger
            const loginUser = res.data;
            if (loginUser) {
                dispatch({ type: 'User_Login', payload: loginUser });
                navigate("/Todo", { replace: true });
            }
            else {
                dispatch({ type: "LoaderShowHide" })
                alert("Email or password not match");
            }
        }).catch(err => console.log(err));
    }
}

/*------------------------USER TODO----------------------------*/

// make a todo list object by Action & then return it (todo's list object + Other App States) in redux store by reducer.
export function addTodoList(uid) {
    return dispatch => {
        const url = `http://localhost:9000/api/todo?userId=${uid}&IsPrivate=false`;
        axios.get(url)
            .then((res) => {
                dispatch({ type: 'Add_Todo_List', payload: res.data })
            })
            .catch(err => console.log("Error:", err));
    }
}

export function addNewTodo(todo) {
    return dispatch => {
        dispatch({ type: "LoaderShowHide" });
        console.log(todo)
        axios.post('http://localhost:9000/api/todo', { ...todo })
            .then(res => dispatch({ type: 'Add_New_Todo', payload: res.data }))
            .catch(err => console.log("Error:", err))
    }
}

export function updateTodo(todo) {
    return (dispatch) => {
        dispatch({ type: "LoaderShowHide" });

        axios.put('http://localhost:9000/api/todo', { ...todo })
            .then(dispatch({ type: 'Update_Todo', payload: { ...todo } }))
            .catch(err => console.log(err));
    }
}

export function deleteTodo(id) {
    return (dispatch) => {
        axios.delete(`http://localhost:9000/api/todo?id=${id}`)
            .then(dispatch({ type: "Delete_Todo", payload: id }))
            .catch(err => console.log(err));
    }
}

//#region 
// async function getUserById(id){
//     const data = await axios.get('http://localhost:9000/api/userById?id=' + id);
//     return data.data;
// }
//#endregion

export { getUsers, addNewUser, updateUser, deleteUser, UserLogin }