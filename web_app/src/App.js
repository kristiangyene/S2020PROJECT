import React from 'react';
import './App.css';

const log_in = () => {
    console.log("Log in");
};

const create_account = () => {
    console.log("Create account");
};

const forgotten_password = () => {
    console.log("Forgotten password");
};

function Start(){
    return(
        <div className="App">
            <div>
                <h1 className="Header">Header log in</h1>
            </div>
            <div>
                <form>
                <row>
                    <input className="Form" placeholder="Username" />
                </row>
                <row>
                    <input className="Form" placeholder="Password" />
                </row>
                </form>  
            </div>
            <button className="Button" onClick={log_in()}>Log in</button>
            <button className="Button" onClick={create_account()}>Create account</button>
            <div>
                <button className="Button" onClick={forgotten_password()}>Forgotten password</button>
            </div> 
        </div>
    );
}


function App(){
    return <Start />;
}

export default App;
