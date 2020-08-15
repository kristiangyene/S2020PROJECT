import { extendObservable } from 'mobx';

class User{
    constructor(){
        extendObservable(this, {
            loading: true,
            loggedIn: false,
            username: ''
        })
    }
}

export default new User();