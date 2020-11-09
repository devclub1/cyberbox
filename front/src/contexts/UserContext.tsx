import React from "react";
import { createContext, useReducer } from "react"

type UserStateType = {
    loggedIn: boolean
    name: string,
    email: string,
    error: string,
    isLoading: boolean
};

const UserState: UserStateType = {
    loggedIn: false,
    name: '',
    email: '',
    error: '',
    isLoading: false
};

export enum UserActionType {
    LOGIN,
    ERROR,
    LOGOUT,
    LOGGED_IN,
    LOGGED_OUT
};

export type UserAction =
    | { type: UserActionType.LOGIN | UserActionType.LOGOUT | UserActionType.LOGGED_OUT }
    | { type: UserActionType.ERROR, error: string }
    | { type: UserActionType.LOGGED_IN, name: string, email: string };

const UserReducer = (state: UserStateType, action: UserAction) => {
    switch (action.type) {
        case UserActionType.LOGIN:
            return {
                ...state,
                isLoading: true
            }
        case UserActionType.ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case UserActionType.LOGGED_IN:
            return {
                ...state,
                loggedIn: true,
                isLoading: false,
                name: action.name,
                email: action.email
            }
        case UserActionType.LOGOUT:
            return {
                ...state,
                isLoading: true
            }
        case UserActionType.LOGGED_OUT:
            return {
                ...state,
                loggedIn: false,
                isLoading: false,
                name: '',
                email: ''
            }
        default:
            return state;
    }
};

export const UserContext = createContext<{
    state: UserStateType;
    dispatch: React.Dispatch<UserAction>;
}>({
    state: UserState,
    dispatch: () => null
});

export const UserContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, UserState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
