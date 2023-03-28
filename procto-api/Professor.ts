import Course from './Course';

export default class Professor {
    user: any;
    courses: any;

    constructor(user: any) {
        this.user = user;
        this.courses = new Course();
    }

    async getCourses() {
        return [this.courses];
    }
    async getStudents(course: any) {
        return [{
            firstname: "Ayman",
            lastname: "Mahran",
            email: "agazmahran@mun.ca",
            id: "202045746"
        },
        {
            firstname: "Youssef",
            lastname: "Aref",
            email: "ymamaref@mun.ca",
            id: "201940505"
        }];
    }
}