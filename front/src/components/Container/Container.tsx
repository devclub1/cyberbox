import React, { useContext } from 'react';
import logo from 'assets/logo.svg';
import './Container.css';
import { UserActionType, UserContext } from 'contexts/UserContext';

function Container() {
    const { state, dispatch } = useContext(UserContext);

    const authenticate = () => {
        if (state.loggedIn) {
            dispatch({ type: UserActionType.LOGOUT })
            setTimeout(() => {
                dispatch({ type: UserActionType.LOGGED_OUT });
            }, 1000);
        } else {
            dispatch({ type: UserActionType.LOGIN });

            setTimeout(() => {
                dispatch({ type: UserActionType.LOGGED_IN, name: "Fake user", email: "fake@example.com" });
            }, 1000);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={() => authenticate()}>
                    {!state.loggedIn ? "Click to fake login" : "Logout"}
                </button>
                <p>Welcome {state.name}</p>
                {state.isLoading ? <span>Loading...</span> : null}
            </header>
        </div>
    )
}

export default Container;