export default class Course {
    name: any;
    constructor() {
        // this.user = user;
        this.name = 'ECE 5500';
    }

    getName() {
        return this.name;
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
        ];
    }
}