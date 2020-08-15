import React from 'react';
import {observer} from 'mobx-react';
import User from './stores/users';
import LoginForm from './loginForm';
import InputField from './inputField';
import SubmitButton from './SubmitButton';

import {Form, FormGroup, Input, Label, Button} from 'reactstrap';

import './App.css';

class App extends React.Component{

    async componentDidMount(){
        try{
            let res1 = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            });
            let res2 = await res1.json();

            if(res2 && res2.success){
                User.loading = false;
                User.loggedIn = true;
                User.username = res2.username;
            }
            else{
                User.loading = false;
                User.loggedIn = false;
            }

        }
        catch(error){
            User.loading = false;
            User.loggedIn = false;
        }
    }

    async doLogout(){
        try{
            let res1 = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            });
            let res2 = await res1.json();

            if(res2 && res2.success){
                User.loggedIn = false;
                User.username = '';
            }
        }
        catch(error){
            console.log(error);
            
        }
    }


    render(){
        // Loading screen
        if(User.loading){
            return(
                <div className="App">
                    <div className="container">
                        Loading...
                    </div>
                </div>
            );
        }

        // Welcome page
        else if(User.loggedIn){
            return(
                <div className="App">
                    <div className="container">
                        Hello {User.username}!
                        <Button type="button" className="btn-lg btn-dark btn-block" onClick={() => this.doLogout}>Log in</Button>
                    </div>
                </div>
            );
        }
        //Login page
        else{
            return(

                <div className="App">
                    <div className="container">
                        <Form>
                            <FormGroup>
                            <Label>Username</Label>
                            <Input></Input>
                            </FormGroup>
                            <FormGroup>
                            <Label>Password</Label>
                            <Input></Input>
                            <Button type="button" class="btn-lg btn-dark btn-block" onClick={() => this.doLogout}>Log in</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            );
        }
    }
}

export default observer(App);
