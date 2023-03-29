import { Course, ProfessorCourse } from './Course';
import AssessmentCabinet from './AssessmentCabinet';
import User from './User';
import Student from './Student';

import { Title } from './types';

export default class Professor extends User {
    courses: Course[];

    constructor(user: User) {
        super(user.firstname, user.lastname, user.email);
        var students = [new Student(new User("Ayman", "Mahran", "agazmahran@mun.ca"), "202045746"),
        new Student(new User("Youssef", "Aref", "ymamaref@mun.ca"), "201940505")];

        var course: Course = new ProfessorCourse('ECE 5500', students, new AssessmentCabinet);
        this.courses = [course];
    }

    async createCourse(title: Title): Promise<boolean> {
        return Promise.reject(false);
    }

    // async addSudent(course: Course, email: string): Promise<boolean> {
    //     return Promise.reject(false);
    // }

    // async createAssessment(name: string): Promise<boolean> {
    //     return Promise.reject(false);
    // }

    async getCourses(): Promise<Course[]> {
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