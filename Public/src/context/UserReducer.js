//Purpose: Pass states between components
const UserReducer = (state, action) => {
    console.log(action.payload);
    switch (action.type) {
        case "SIGN_IN":
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                friendRequest: action.payload.friendRequest,
                pendingRequest: action.payload.pendingRequest,
                friends: action.payload.friends,
                email: action.payload.email,
                _id: action.payload._id, 
                name: action.payload.name,
                isLoggedIn: true};
        case "LOG_OUT":
            return {
                ...state,
                firstName: "",
                lastName: "",
                friendRequest: [],
                friends: [],
                pendingRequest: [],
                email: "",
                _id: "", 
                name: "",
                isLoggedIn: false
            };
        default:
            return "default";
    }
};



export default UserReducer;