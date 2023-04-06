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
            JSON.parse(result[0].courses ?? "[]").forEach((courseId: ID) => this.courses.push(new StudentCourse(courseId, this.username)));
            for (let course of this.courses)
                await course.init();
            return true;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    async getId(): Promise<string> {
        if (!this.id) await this.initSt();
        return this.id;
    }

    async getCourses(): Promise<Course[]> {
        if (!this.id) await this.initSt();
        return this.courses;
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