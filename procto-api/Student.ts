import User from './User';
import { Course, StudentCourse } from './Course';
import { Name, Email, ID } from './types';
import AssessmentCabinet from './AssessmentCabinet';
import { AWS } from './AWS';
export default class Student extends User {
    id: string;
    courses: Course[];

    constructor(user: User) {
        super(user.username);
        this.id = '';
        this.courses = [];
    }

    private async initSt(): Promise<boolean> {
        this.courses = [];
        try {
            const result = await AWS.API.get('ProctoApi', `/student/${this.username}`, {});
            this.id = result[0].id;
            JSON.parse(result[0].courses ?? "[]").forEach((courseId: ID) => this.courses.push(new StudentCourse(courseId)));
            this.courses.forEach(course => course.init());
            return true;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    async getId(): Promise<string> {
        if (!await this.initSt()) return Promise.reject();
        return this.id;
    }

    async getCourses(): Promise<Course[]> {
        if (!await this.initSt()) return Promise.reject();
        return this.courses;
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

        // var course: Course = new StudentCourse('ECE 5500', this, new AssessmentCabinet());
        // return [course];
        //feturn ['ECE 5010', 'ECE 5200', 'ECE 5400', 'ECE 5500'];
    }

    async startAssessment(): Promise<void> {
        return Promise.reject(false);
    }
}


/*
update
    API.put('ProctoApi', '/student', {
            body: {
                username: 'teststudent',
                courses: 'testcourse'
            }
    }).then((result) => {
        console.log("This is course", result[0]);
    }).catch((err) => {
        console.log(err.response.data);
    });
 */
/*
insert
   API.post('ProctoApi', '/student', {
            body: {
                username: 'teststudent',
                courses: 'testcourse'
            }
    }).then((result) => {
        console.log("This is course", result[0]);
    }).catch((err) => {
        console.log(err.response.data);
    });
*/