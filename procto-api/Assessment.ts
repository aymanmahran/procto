import { Date } from './types';
import { Question } from './Question';

export interface Assessment {
    getTitle(): Promise<string>;
    getWeight(): Promise<number>;
    getQuestions(): Promise<Question[]>;
    getStartDate(): Promise<Date>;
    getDuration(): Promise<number>;
}

export class SimpleAssessment implements Assessment {

    title: string;
    startDate: Date;
    duration: number;
    weight: number;
    questions: Question[];

    constructor(title: string, startDate: Date, duration: number, weight: number, questions: Question[]) {
        this.title = title;
        this.startDate = startDate;
        this.duration = duration;
        this.weight = weight;
        this.questions = questions;

    }

    async getTitle(): Promise<string> {
        return Promise.reject();
    }

    async getWeight(): Promise<number> {
        return Promise.reject();
    }

    async getDuration(): Promise<number> {
        return Promise.reject();
    }

    async getStartDate(): Promise<Date> {
        return Promise.reject();
    }

    async getQuestions(): Promise<Question[]> {
        return Promise.reject();
    }

    async setTitle(title: string): Promise<boolean> {
        return Promise.reject();
    }

    async setStartDate(date: Date): Promise<boolean> {
        return Promise.reject();
    }

    async setWeight(weight: number): Promise<boolean> {
        return Promise.reject();
    }

    async setDuration(index: number): Promise<boolean> {
        return Promise.reject();
    }

    async setQuestions(index: number): Promise<boolean> {
        return Promise.reject();
    }
}

abstract class AssessmentDecorator implements Assessment {

    assessment: Assessment;

    constructor(assessment: Assessment) {
        this.assessment = assessment;
    }

    async getTitle(): Promise<string> {
        return Promise.reject();
    }

    async getWeight(): Promise<number> {
        return Promise.reject();
    }

    async getDuration(): Promise<number> {
        return Promise.reject();
    }

    async getStartDate(): Promise<Date> {
        return Promise.reject();
    }

    abstract getQuestions(): Promise<Question[]>;

}
export class AnswerableAssessment extends AssessmentDecorator {

    startDate: Date;
    endDate: Date;

    constructor(assessment: Assessment) {
        super(assessment);
        this.startDate = -1;
        this.endDate = -1;
    }

    async getQuestions(): Promise<Question[]> {
        // decorates questions to be answerable
        return Promise.reject();
    }

    async startAssessment(): Promise<boolean> {
        return Promise.reject();
    }

    async endAssessment(): Promise<boolean> {
        return Promise.reject();
    }

    async setAnswer(question: number, answer: string): Promise<boolean> {
        return Promise.reject();
    }

    async getAnswer(question: number): Promise<string> {
        return Promise.reject();
    }
}

export class MarkableAssessment extends AssessmentDecorator {

    mark: number;

    constructor(assessment: Assessment) {
        super(assessment);
        this.mark = -1;
    }

    async getQuestions(): Promise<Question[]> {
        // decorates questions to be markable
        return Promise.reject();
    }

    async setMark(question: number, mark: number): Promise<boolean> {
        return Promise.reject();
    }

    async getMark(question: number): Promise<number> {
        return Promise.reject();
    }
}

export class ImmutableAssessment extends AssessmentDecorator {

    constructor(assessment: Assessment) {
        super(assessment);
    }

    async getQuestions(): Promise<Question[]> {
        // decorates questions to be final
        return Promise.reject();
    }

    async getMark(question: number): Promise<number> {
        return Promise.reject();
    }
}

// export default class Assessment {
//     props: any;
//     constructor(props: any) {
//         this.props = props;
//     }

//     async getQuestions() {
//         return [{
//             number: "1",
//             weight: "10",
//             type: 'long-answer',
//             prompt: 'What is life?',
//             answer: "idk"
//         },
//         {
//             number: "2",
//             weight: "5",
//             type: 'long-answer',
//             prompt: 'What sound do cats make?',
//             answer: "meow"
//         },
//         {
//             number: "3",
//             weight: "1",
//             type: 'multiple-choice',
//             prompt: 'Which of the following is an animal?',
//             options: [
//                 {
//                     number: "1",
//                     text: 'Cat'
//                 },
//                 {
//                     number: "2",
//                     text: 'Dog'
//                 },
//                 {
//                     number: "3",
//                     text: 'Apple'
//                 }
//             ]
//         }];
//     }
//     async getName() {
//         return this.props.name;
//     }

//     async getDuration() {
//         return "360";
//     }
// }