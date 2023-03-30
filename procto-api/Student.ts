import User from './User';
import { Course, StudentCourse } from './Course';
import { Name, Email } from './types';
import AssessmentCabinet from './AssessmentCabinet'
export default class Student extends User {
    id: string;

    constructor(user: User, id: string) {
        super(user.firstname, user.lastname, user.email);
        this.id = id;
    }

    async getId(): Promise<string> {
        return Promise.resolve(this.id);
    }

    async getCourses(): Promise<Course[]> {
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

        var course: Course = new StudentCourse('ECE 5500', this, new AssessmentCabinet());
        return [course];
        //feturn ['ECE 5010', 'ECE 5200', 'ECE 5400', 'ECE 5500'];
    }

    async startAssessment(): Promise<void> {
        return Promise.reject(false);
    }
}