import React, {useReducer} from "react"
import { Reducer } from "./contextreducer";

const defaultState = {
    user: null,
    fetching: false,
    error: false,
    registered: true
};

export const UserContext = React.createContext(defaultState);

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, defaultState);

    return (
        <UserContext.Provider  value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

