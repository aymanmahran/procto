import Student from './Student';
import User from './User';
import { AnswerableAssessment, Assessment, ImmutableAssessment, MarkableAssessment, SimpleAssessment } from './Assessment';
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
    addAssessment(id: ID): Promise<boolean>;
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
            const ids = JSON.parse(result[0].assessments ?? "[]");
            for (let id of ids)
                this.assessments.push(new SimpleAssessment(id));

            for (let assessment of this.assessments)
                await assessment.init();

            this.title = result[0].title;
            return true;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    async getTitle(): Promise<Title> {
        if (!this.title) await this.init();
        return this.title;
    }

    async getAssessments(): Promise<Assessment[]> {
        if (!this.title) await this.init();
        return this.assessments;
    }

    async getUpcomingAssessments(): Promise<Assessment[]> {
        return Promise.reject();
    }

    async getPastAssessments(): Promise<Assessment[]> {
        return Promise.reject();
    }
}

export class StudentCourse extends SimpleCourse implements StudentCourseAccess {
    username: string;

    constructor(id: ID, username: string) {
        super(id);
        this.username = username;
    }

    async getPastAssessments(): Promise<Assessment[]> {
        const assessments = await this.getAssessments();

        const now = Math.floor(Date.now() / 1000);
        const ret = [];
        for (let assessment of assessments) {
            const date = await assessment.getStartDate();
            const duration = await assessment.getDuration();
            const doneAssessment = new ImmutableAssessment(assessment, this.username);
            const done = await doneAssessment.isDone();

            if ((date + duration) < now || done)
                ret.push(doneAssessment);
        }
        return ret;
    }

    async getUpcomingAssessments(): Promise<Assessment[]> {
        const now = Math.floor(Date.now() / 1000);
        const ret = [];
        for (let assessment of this.assessments) {
            const date = await assessment.getStartDate();
            const duration = await assessment.getDuration();
            const doneAssessment = new ImmutableAssessment(assessment, this.username);
            const done = await doneAssessment.isDone();

            if ((now < date) || (now > date && now < (date + duration) && !done))
                ret.push(new AnswerableAssessment(assessment, this.username));
        }
        return ret;
    }
}

export class ProfessorCourse extends SimpleCourse implements ProfessorCourseAccess {

    students: Student[];
    studentUsernames: string[];
    assessmentIds: string[];

    constructor(id: ID) {
        super(id);
        this.students = [];
        this.studentUsernames = [];
        this.assessmentIds = [];
    }

    async init(): Promise<boolean> {
        this.assessments = [];
        this.students = [];
        this.studentUsernames = [];
        this.assessmentIds = [];


        try {
            const result = await AWS.API.get('ProctoApi', `/course/${this.id}`, {});
            this.title = result[0].title;

            JSON.parse(result[0].students ?? "[]").forEach((student: string) => this.students.push(new Student(new User(student))));
            JSON.parse(result[0].assessments ?? "[]").forEach((assessment: string) => this.assessments.push(new SimpleAssessment(assessment)));

            this.studentUsernames = JSON.parse(result[0].students ?? "[]");
            this.assessmentIds = JSON.parse(result[0].assessments ?? "[]");

            for (let assessment of this.assessments)
                await assessment.init();

            return true;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    private async update(props: any): Promise<boolean> {
        try {
            const result = await AWS.API.get('ProctoApi', `/course/${this.id}`, {});
            await AWS.API.put('ProctoApi', '/course', {
                body: {
                    ...result[0],
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
        if (this.students.length == 0) await this.init();
        return this.students;
    }

    async getAssessments(): Promise<Assessment[]> {
        if (this.students.length == 0) await this.init();
        return this.assessments;
    }

    async getMarkableAssessment(assessment: string, username: string): Promise<Assessment> {
        if (this.students.length == 0) await this.init();
        let i = 0, ret = this.assessments[0];
        for (let assessmentid of this.assessmentIds) {
            if (assessmentid == assessment) {
                ret = this.assessments[i];
            }
            i++;
        }
        return new MarkableAssessment(ret, username);
    }

    async addStudent(student: Email): Promise<boolean> {
        if (this.students.length == 0) await this.init();
        this.students.push(new Student(new User(student)));
        this.studentUsernames.push(student);
        return this.update({ students: JSON.stringify(this.studentUsernames) });
    }

    async addAssessment(id: ID): Promise<boolean> {
        if (this.students.length == 0) await this.init();
        this.assessmentIds.push(id);
        await this.update({ assessments: JSON.stringify(this.assessmentIds) });
        return await this.init();
    }

    async getStudentMarks(assessment: string) {
        if (this.students.length == 0) await this.init();
        const responses = [];
        for (let username of this.studentUsernames) {
            try {
                const result = await AWS.API.get('ProctoApi', `/response/object/${username}/${assessment}`, {});
                responses.push({
                    student: username,
                    marks: JSON.parse(result?.marks ?? "[]")
                })
            }
            catch (err: any) {
                console.log(err);
            };
        }
        return responses;
    }

    async getStudentResponses(assessment: string) {
        if (this.students.length == 0) await this.init();
        const responses = [];
        for (let username of this.studentUsernames) {
            try {
                const result = await AWS.API.get('ProctoApi', `/response/object/${username}/${assessment}`, {});
                responses.push({
                    student: username,
                    result: JSON.parse(result?.answers ?? "[]")
                })
            }
            catch (err: any) {
                console.log(err);
            };
        }
        return responses;
    }
}