import User from './User';
import { Name, Email } from './types';
export default class Student extends User {
    id: string;

    constructor(user: User, id: string) {
        super(user.firstname, user.lastname, user.email);
        this.id = id;
    }

    async getCourses() {
        // const apiName = 'MyApiName';
        // const path = '/path';
        // const myInit = {
        //     headers: {
        //         Authorization: `Bearer ${(await Auth.currentSession())
        //             .getIdToken()
        //             .getJwtToken()}`
        //     }
        // };

        // API.get(apiName, path, myInit)
        //     .then((response) => {
        //         return response.body;
        //     })
        //     .catch((error) => {
        //         console.log(error.response);
        //         return {};
        //     });

        return ['ECE 5010', 'ECE 5200', 'ECE 5400', 'ECE 5500'];
    }

    async startAssessment(): Promise<void> {
        return Promise.reject(false);
    }
}