import Student from './Student';
import Assessment from './Assessment';
import AssessmentCabinet from './AssessmentCabinet';
import { Email, Title } from './types';

export interface Course {
    title: Title;
    cabinet: AssessmentCabinet;
    students: Student[];
    getTitle(): Title;
    getUpcomingAssessments(): Promise<Assessment[]>;
    getPastAssessments(): Promise<Assessment[]>;
}

interface StudentCourseAccess extends Course {
    submitAssessment(student: Student, assessment: Assessment): Promise<boolean>;
}

interface ProfessorCourseAccess extends Course {
    getStudents(): Student[];
    addStudent(email: Email): Promise<boolean>;
    addAssessment(assessment: Assessment): Promise<void>;
}

class SimpleCourse implements Course {
    title: Title;
    students: Student[];
    cabinet: AssessmentCabinet;

    constructor(title: Title, students: Student[], cabinet: AssessmentCabinet) {
        this.title = title;
        this.students = students;
        this.cabinet = cabinet;
    }

    getTitle(): Title {
        return this.title;
    }

    async getUpcomingAssessments(): Promise<Assessment[]> {
        return [
            new Assessment({
                id: 1,
                name: 'Midterm 1',
                course: 'ECE 5500',
                date: 'March 20th, 2023',
                time: '12:30 PM',
                grade: 89
            }),
            new Assessment({
                id: 2,
                name: 'Quiz 3',
                course: 'ECE 5400',
                date: 'March 22th, 2023',
                time: '11:00 AM',
                grade: null
            })
        ];
    }

    async getPastAssessments(): Promise<Assessment[]> {
        return [
            new Assessment({
                id: 1,
                name: 'Midterm 1',
                course: 'ECE 5500',
                date: 'March 20th, 2023',
                time: '12:30 PM',
                grade: 89
            }),
            new Assessment({
                id: 2,
                name: 'Quiz 3',
                course: 'ECE 5400',
                date: 'March 22th, 2023',
                time: '11:00 AM',
                grade: null
            })
        ];
    }
}

export class StudentCourse extends SimpleCourse implements StudentCourseAccess {
    constructor(title: Title, student: Student, assessments: AssessmentCabinet) {
        super(title, [student], assessments);
    }

    async submitAssessment(student: Student, assessment: Assessment): Promise<boolean> {
        return Promise.reject();
    }

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
    constructor(title: string, students: Student[], cabinet: AssessmentCabinet) {
        super(title, students, cabinet);
    }

    getStudents(): Student[] {
        return this.students;
    }
    async addStudent(student: Email): Promise<boolean> {
        // this.students.push(student);
        return Promise.reject();
    }

    async addAssessment(assessment: Assessment): Promise<void> {
        return Promise.reject();
    }

    async getAssessments() {
        return [
            {
                id: 1,
                name: 'Midterm 1',
                course: 'ECE 5500',
                date: 'March 20th, 2023',
                time: '12:30 PM',
                grade: 89
            },
            {
                id: 2,
                name: 'Quiz 3',
                course: 'ECE 5400',
                date: 'March 22th, 2023',
                time: '11:00 AM',
                grade: null
            }
        ];
    }

    async getStudentResponses(assessment: any) {
        return [
            {
                student: {
                    firstname: "Ayman",
                    lastname: "Mahran",
                    id: "202045746",
                    grade: "20%"
                },
                assessment: {
                    id: '2321'
                }
            }
            ,
            {
                student: {
                    firstname: "Youssef",
                    lastname: "Aref",
                    id: "201940505",
                    grade: "30%"
                },
                assessment: {
                    id: '2321'
                }
            }
        ];
    }
}