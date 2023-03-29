import { userType, Email, Name } from './types';

export default class User {
    firstname: Name;
    lastname: Name;
    email: Email;
    constructor(firstname: Name, lastname: Name, email: Email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
    async getType(): Promise<userType> {
        return Promise.resolve(userType.Professor);
    }
}