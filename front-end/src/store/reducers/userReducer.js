
const INITIAL_STATE = {
    UserList: []
}

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case 'GET_USERS': {
            return { ...state, UserList: payload }
        }
        case 'Add_New_User': {
            return { ...state, UserList: [...state.UserList, payload] }
        }
        case 'Update_User': {
            state.UserList.forEach((obj, ind) => {
                if (obj._id === payload._id) {
                    obj.fname = payload.fname;
                    obj.lname = payload.lname;
                    obj.cource = payload.cource;
                    obj.salary = payload.salary;
                    return;
                }
            })
            console.log("Update Reducer Call");
            return { ...state, UserList: [...state.UserList] }
        }
        case 'Delete_User': {
            const index = state.UserList.findIndex(x => x._id === payload)
            state.UserList.splice(index, 1)
            return { ...state, UserList: [...state.UserList] }
        }
        default:
            return state;
    }
}

export default userReducer;