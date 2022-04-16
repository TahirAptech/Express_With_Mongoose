
const INITIAL_STATE = {
    UserList: [],
    UserTODO: [],
    UserLogin: {},
    ShowLoader: false,
}

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        /*------------------------USER------------------------- */
        case 'Add_User_List': {
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
                    obj.email = payload.email;
                    obj.password = payload.password;
                    return;
                }
            })
            return { ...state, UserList: [...state.UserList] }
        }
        case 'Delete_User': {
            const index = state.UserList.findIndex(x => x._id === payload);
            state.UserList.splice(index, 1);
            return { ...state, UserList: [...state.UserList] }
        }

        /*-----------------------USER LOGIN---------------------- */
        case 'LoaderShowHide': {
            return { ...state, ShowLoader: !(state.ShowLoader) }
        }
        case 'User_Login': {
            return { ...state, UserLogin: payload, ShowLoader: false }
        }
        case 'User_Logout': {
            return { ...state, UserLogin: {}, UserTODO: [] }
        }

        /*------------------------USER TODO------------------------- */
        case 'Add_Todo_List': {
            return { ...state, UserTODO: payload, ShowLoader: false }
        }
        case 'Add_New_Todo': {
            return { ...state, UserTODO: [...state.UserTODO, payload], ShowLoader: false }
        }
        case 'Update_Todo': {
            state.UserTODO.forEach((obj, index) => {
                if (obj._id === payload._id) {
                    obj.todo = payload.todo;
                    obj.IsPrivate = payload.IsPrivate;
                    return;
                }
            })
            return { ...state, UserTODO: [...state.UserTODO], ShowLoader: false }
        }
        case 'Delete_Todo': {
            const index = state.UserTODO.findIndex(x => x._id === payload);
            state.UserTODO.splice(index, 1);
            return { ...state, UserTODO: [...state.UserTODO], ShowLoader: false }
        }
        default:
            return state;
    }
}

export default userReducer;