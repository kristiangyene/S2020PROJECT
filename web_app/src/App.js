import React from 'react';
import { observer } from 'mobx-react';

import User from './stores/users';

import {Form, FormGroup, Input, Button} from 'reactstrap';

import './App.css';

class App extends React.Component{

    async componentDidMount(){
        try{
            let res1 = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
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
                        <Button type="button" className="btn-lg btn-dark btn-block" onClick={() => this.doLogout}>Log out</Button>
                    </div>
                </div>
            );
        }
        //Login page
        else{
            return(
                <div className="App">
                    <div className="App-header"><img src="https://i.pinimg.com/originals/b9/76/3c/b9763cd1a5449329d1371131ec3fe6c6.png" alt="new" style={{height:60, width:60}}></img>Gyeno Fashion</div>
                    <div className="container">
                    <img src="https://i.pinimg.com/originals/b9/76/3c/b9763cd1a5449329d1371131ec3fe6c6.png" alt="new" style={{height:200, width:200}}></img>
                            <h1 style={{marginBottom:15}}>LOG IN</h1>
                        <Form>
                            <FormGroup>
                            <Input type="text" placeholder="Username"></Input>
                            </FormGroup>
                            <FormGroup>
                            <Input type="password" placeholder ="Password"></Input>
                            <Button type="button" class="btn-dark" block style={{marginTop:15, marginBottom:30}} onClick={() => this.doLogin}>Log in</Button>
                            <div class="_0tv-g">OR</div>
                            <p>No account? <a href="">Create an account</a></p>
                            </FormGroup>
                        </Form>
                    </div>
                    <footer style={{margin:5}}>© 2020 Gyeno Fashion by Kristian Gyene</footer>
                </div>
            );
        }
    }
}

export default observer(App);