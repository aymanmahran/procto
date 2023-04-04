import Student from './Student';
import User from './User';
import { Assessment, SimpleAssessment } from './Assessment';
import AssessmentCabinet from './AssessmentCabinet';
import { Email, Title, ID } from './types';
import { AWS } from './AWS';

export interface Course {
    title: Title;
    assessments: Assessment[];
    init(): Promise<boolean>;
    getTitle(): Promise<Title>;
    getUpcomingAssessments(): Promise<Assessment[]>;
    getPastAssessments(): Promise<Assessment[]>;
    getAssessments(): Promise<Assessment[]>;
}

interface StudentCourseAccess extends Course {
    // submitAssessment(student: Student, assessment: Assessment): Promise<boolean>;
}

interface ProfessorCourseAccess extends Course {
    students: Student[];
    getStudents(): Promise<Student[]>;
    addStudent(email: Email): Promise<boolean>;
    addAssessment(assessment: Assessment): Promise<boolean>;
}

class SimpleCourse implements Course {
    title: Title;
    assessments: Assessment[];
    id: ID;

    constructor(id: ID) {
        this.title = '';
        this.assessments = [];
        this.id = id;
    }

    async init(): Promise<boolean> {
        this.assessments = [];
        try {
            const result = await AWS.API.get('ProctoApi', `/course/${this.id}`, {});
            JSON.parse(result[0].assessments ?? "[]").forEach((assessment: string) => this.assessments.push(new SimpleAssessment(assessment)));
            this.assessments.forEach(assessment => assessment.init());
            this.title = result[0].title;
            return true;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    async getTitle(): Promise<Title> {
        if (!await this.init()) return Promise.reject();
        console.log(this.title);
        return this.title;
    }

    async getAssessments(): Promise<Assessment[]> {
        if (!await this.init()) return Promise.reject();
        return this.assessments;
    }

    async getUpcomingAssessments(): Promise<Assessment[]> {
        if (!await this.init()) return Promise.reject();
        return this.assessments.filter(async (assessment) => await assessment.getStartDate() > Math.floor(Date.now() / 1000));
        // return [
        //     new Assessment({
        //         id: 1,
        //         name: 'Midterm 1',
        //         course: 'ECE 5500',
        //         date: 'March 20th, 2023',
        //         time: '12:30 PM',
        //         grade: 89
        //     }),
        //     new Assessment({
        //         id: 2,
        //         name: 'Quiz 3',
        //         course: 'ECE 5400',
        //         date: 'March 22th, 2023',
        //         time: '11:00 AM',
        //         grade: null
        //     })
        // ];
    }

    async getPastAssessments(): Promise<Assessment[]> {
        if (!await this.init()) return Promise.reject();
        return this.assessments.filter(async (assessment) => await assessment.getStartDate() < Math.floor(Date.now() / 1000));
        // return [
        //     new Assessment({
        //         id: 1,
        //         name: 'Midterm 1',
        //         course: 'ECE 5500',
        //         date: 'March 20th, 2023',
        //         time: '12:30 PM',
        //         grade: 89
        //     }),
        //     new Assessment({
        //         id: 2,
        //         name: 'Quiz 3',
        //         course: 'ECE 5400',
        //         date: 'March 22th, 2023',
        //         time: '11:00 AM',
        //         grade: null
        //     })
        // ];
    }
}

export class StudentCourse extends SimpleCourse implements StudentCourseAccess {
    constructor(id: ID) {
        super(id);
    }

    // async submitAssessment(student: Student, assessment: Assessment): Promise<boolean> {
    //     try {
    //         const id = uuidv4();
    //         AWS.API.put('ProctoApi', '/response', {
    //             body: {
    //                 id: id,
    //                 answers: JSON.stringify(assessment.getAnswersObject()),
    //                 submitted: Math.floor(Date.now() / 1000)
    //             }
    //         });

    //         assessment

    //         AWS.API.post('ProctoApi', '/assessment', {
    //             body: {
    //                 id: id,
    //                 responses: assessment.getAnswersObject()),
    //                 submitted: Math.floor(Date.now() / 1000)
    //             }
    //         });

    //         return true;
    //     }
    //     catch (err: any) {
    //         console.log(err);
    //         return false;
    //     };
    // }

    // async getAssessments() {
    //     return [
    //         {
    //             id: 1,
    //             name: 'Midterm 1',
    //             course: 'ECE 5500',
    //             date: 'March 20th, 2023',
    //             time: '12:30 PM',
    //             grade: 89
    //         },
    //         {
    //             id: 2,
    //             name: 'Quiz 3',
    //             course: 'ECE 5400',
    //             date: 'March 22th, 2023',
    //             time: '11:00 AM',
    //             grade: null
    //         }
    //     ];
    // }
    // async getStudentResponses(assessment: any) {
    //     return [
    //         {
    //             student: {
    //                 firstname: "Ayman",
    //                 lastname: "Mahran",
    //                 id: "202045746",
    //                 grade: "20%"
    //             },
    //             assessment: {
    //                 id: '2321'
    //             }
    //         }
    //     ];
    // }
}

export class ProfessorCourse extends SimpleCourse implements ProfessorCourseAccess {

    students: Student[];

    constructor(id: ID) {
        super(id);
        this.students = [];
    }

    async init(): Promise<boolean> {
        this.assessments = [];
        this.students = [];

        try {
            const result = await AWS.API.get('ProctoApi', `/course/${this.id}`, {});
            console.log("This is course", result[0]);
            this.title = result[0].title;
            JSON.parse(result[0].students ?? "[]").forEach((student: string) => this.students.push(new Student(new User(student))));
            JSON.parse(result[0].assessments ?? "[]").forEach((assessment: string) => this.assessments.push(new SimpleAssessment(assessment)));
            this.assessments.forEach(assessment => assessment.init());

            return true;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    private async update(props: any): Promise<boolean> {
        try {
            await AWS.API.put('ProctoApi', '/course', {
                body: {
                    id: this.id,
                    ...props
                }
            });
            return true;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    async getStudents(): Promise<Student[]> {
        if (!await this.init()) return Promise.reject();
        return this.students;
    }

    async getAssessments(): Promise<Assessment[]> {
        if (!await this.init()) return Promise.reject();
        return this.assessments;
        // return [
        //     {
        //         id: 1,
        //         name: 'Midterm 1',
        //         course: 'ECE 5500',
        //         date: 'March 20th, 2023',
        //         time: '12:30 PM',
        //         grade: 89
        //     },
        //     {
        //         id: 2,
        //         name: 'Quiz 3',
        //         course: 'ECE 5400',
        //         date: 'March 22th, 2023',
        //         time: '11:00 AM',
        //         grade: null
        //     }
        // ];
    }

    async addStudent(student: Email): Promise<boolean> {
        if (!await this.init()) return Promise.reject();
        this.students.push(new Student(new User(student)));
        const usernames: string[] = [];
        this.students.forEach(async (student) => usernames.push(await student.getUsername()));
        return this.update({ students: JSON.stringify(usernames) });
        //return Promise.reject();
    }

    async addAssessment(assessment: Assessment): Promise<boolean> {
        if (!await this.init()) return Promise.reject();
        this.assessments.push(assessment);
        const ids: string[] = [];
        this.assessments.forEach(async (student) => ids.push(await assessment.getId()));
        return this.update({ assessments: JSON.stringify(ids) });
    }

    // async getStudentResponses(assessment: any) {
    //     return [
    //         {
    //             student: {
    //                 firstname: "Ayman",
    //                 lastname: "Mahran",
    //                 id: "202045746",
    //                 grade: "20%"
    //             },
    //             assessment: {
    //                 id: '2321'
    //             }
    //         }
    //         ,
    //         {
    //             student: {
    //                 firstname: "Youssef",
    //                 lastname: "Aref",
    //                 id: "201940505",
    //                 grade: "30%"
    //             },
    //             assessment: {
    //                 id: '2321'
    //             }
    //         }
    //     ];
    // }
}