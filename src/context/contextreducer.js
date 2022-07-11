export const Reducer = (state, action) =>{
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                fetching: true,   
            };
        case "LOGIN-SUCCEED":
            return{
                ...state,
                user: action.payload,
                fetching: false,
                error: false
            };
        case "LOGIN-FAILURE":
            return {
                ...state,
                user: null,
                error: true,
                fetching:false
            };
        case "REGISTER":
            return {
                ...state,
               registered: false
            };
        case "REGISTERED":
            return {
                ...state,
               registered: true
            };
        case "LOG-OUT":
            return {
                ...state,
                user: null,
                fetching: false,
                registered: true
            }
        

    
         default:
             return state;
    }
}