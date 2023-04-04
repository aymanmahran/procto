import { Course, ProfessorCourse } from './Course';
import AssessmentCabinet from './AssessmentCabinet';
import User from './User';
import Student from './Student';
import { AWS } from './AWS';

import { Title, ID } from './types';

export default class Professor extends User {
    courses: Course[];

    constructor(user: User) {
        super(user.username);
        this.courses = [];
        // var students = [new Student(new User("Ayman", "Mahran", "agazmahran@mun.ca"), "202045746"),
        // new Student(new User("Youssef", "Aref", "ymamaref@mun.ca"), "201940505")];

        // var course: Course = new ProfessorCourse('ECE 5500', students, new AssessmentCabinet);
        // this.courses = [course];
    }

    private async initPr(): Promise<boolean> {
        this.courses = [];
        try {
            const result = await AWS.API.get('ProctoApi', `/professor/${this.username}`, {});
            JSON.parse(result[0].courses ?? "[]").forEach((courseId: ID) => this.courses.push(new ProfessorCourse(courseId)));
            this.courses.forEach(course => course.init());
            return true;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    // async addSudent(course: Course, email: string): Promise<boolean> {
    //     return Promise.reject(false);
    // }

    // async createAssessment(name: string): Promise<boolean> {
    //     return Promise.reject(false);
    // }

    async getCourses(): Promise<Course[]> {
        if (!await this.initPr()) return Promise.reject();
        return this.courses;
    }

    // async getStudents(course: any) {
    //     return [{
    //         firstname: "Ayman",
    //         lastname: "Mahran",
    //         email: "agazmahran@mun.ca",
    //         id: "202045746"
    //     },
    //     {
    //         firstname: "Youssef",
    //         lastname: "Aref",
    //         email: "ymamaref@mun.ca",
    //         id: "201940505"
    //     }];
    // }
}