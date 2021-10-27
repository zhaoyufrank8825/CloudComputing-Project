export default (state, action) => {
    switch (action.type) {
        case "REMOVE_USER":
            return {
                users: state.users.filter((user) => {
                    return user.id !== action.payload;
                }),
            };
        case "ADD_USER":
            return {
                users: [action.payload, ...state.users],
            };
        case "EDIT_USER":
            const editUser = action.payload;
            const editUsers = state.users.map((user) => {
                if (user.id === editUser.id) {
                    return editUser;
                }
                return user;
            });
            return {
                users: editUsers,
            };
        default:
            return state;
    }
};
