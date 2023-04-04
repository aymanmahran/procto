import { Date, ID } from './types';
import { Question, LongAnswer, MultipleChoice, AnswerableQuestion, MarkableQuestion, ImmutableQuestion } from './Question';
import { AWS } from './AWS';

export interface Assessment {
    init(): Promise<boolean>;
    getId(): Promise<ID>;
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
    id: ID;

    constructor(id: ID) {
        this.id = id;
        this.title = '';
        this.startDate = -1;
        this.duration = -1;
        this.weight = -1;
        this.questions = [];

    }

    async init(): Promise<boolean> {
        this.questions = [];
        try {
            const result = await AWS.API.get('ProctoApi', `/assessment/${this.id}`, {});
            this.title = result[0].title;
            this.startDate = result[0].start;
            this.duration = result[0].duration;
            this.weight = result[0].weight;
            let i = 1;
            const arr = JSON.parse(result[0].questions);
            console.log(JSON.stringify('[{type: "long",prompt: "What is life?"},{type: "long",prompt: "What is cat sound?"}]'));
            arr.forEach((question: any) => {
                if (question.type == 'mcq')
                    this.questions.push(new MultipleChoice(question.prompt, question.options, question.weight, i));
                else
                    this.questions.push(new LongAnswer(question.prompt, question.weight, i));
                i++;
            });
            return true;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    private async update(props: any): Promise<boolean> {
        try {
            await AWS.API.put('ProctoApi', '/assessment', {
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

    async getTitle(): Promise<string> {
        if (!await this.init()) return Promise.reject();
        return this.title;
    }

    async getWeight(): Promise<number> {
        if (!await this.init()) return Promise.reject();
        return this.weight;
    }

    async getDuration(): Promise<number> {
        if (!await this.init()) return Promise.reject();
        return this.duration;
    }

    async getStartDate(): Promise<Date> {
        if (!await this.init()) return Promise.reject();
        return this.startDate;
    }

    async getId(): Promise<ID> {
        if (!await this.init()) return Promise.reject();
        return this.id;
    }

    async getQuestions(): Promise<Question[]> {
        if (!await this.init()) return Promise.reject();
        return this.questions;
    }

    async setTitle(title: string): Promise<boolean> {
        this.title = title;
        return this.update({ title: title });
    }

    async setStartDate(date: Date): Promise<boolean> {
        this.startDate = date;
        return this.update({ startDate: date });
    }

    async setWeight(weight: number): Promise<boolean> {
        this.weight = weight;
        return this.update({ weight: weight });
    }

    async setDuration(duration: number): Promise<boolean> {
        this.duration = duration;
        return this.update({ duration: duration });
    }

    async setQuestions(questions: Question[]): Promise<boolean> {
        this.questions = questions;
        const questionObjects: any[] = [];
        this.questions.forEach(async (question) => questionObjects.push(await question.getObject()));
        return this.update({ questions: JSON.stringify(questionObjects) });
    }

    async addQuestion(question: Question): Promise<boolean> {
        this.questions.push(question);
        const questionObjects: any[] = [];
        this.questions.forEach(async (question) => questionObjects.push(await question.getObject()));
        return this.update({ questions: JSON.stringify(questionObjects) });
    }
}

abstract class AssessmentDecorator implements Assessment {

    assessment: Assessment;

    constructor(assessment: Assessment) {
        this.assessment = assessment;
    }

    async init(): Promise<boolean> {
        return this.assessment.init();
    }

    async getId(): Promise<string> {
        return this.assessment.getId();
    }

    async getTitle(): Promise<string> {
        return this.assessment.getTitle();
    }

    async getWeight(): Promise<number> {
        return this.assessment.getWeight();
    }

    async getDuration(): Promise<number> {
        return this.assessment.getDuration();
    }

    async getStartDate(): Promise<Date> {
        return this.assessment.getStartDate();
    }

    abstract getQuestions(): Promise<Question[]>;

}
export class AnswerableAssessment extends AssessmentDecorator {

    startDate: Date;
    endDate: Date;
    username: string;

    constructor(assessment: Assessment, username: string) {
        super(assessment);
        this.startDate = -1;
        this.endDate = -1;
        this.username = username;
    }

    async getQuestions(): Promise<AnswerableQuestion[]> {
        const questions = await this.assessment.getQuestions();
        const answerableQuestions: AnswerableQuestion[] = [];
        questions.forEach(question => answerableQuestions.push(new AnswerableQuestion(question)));
        return answerableQuestions;
    }

    async startAssessment(): Promise<boolean> {
        const startDate = Math.floor(Date.now() / 1000);
        // const id = uuidv4();

        try {
            await AWS.API.post('ProctoApi', '/response', {
                body: {
                    student: this.username,
                    assessment: this.assessment.getId(),
                    started: startDate
                }
            });
            return true;
        }
        catch (err: any) {
            console.log(err.response.data);
            return false;
        }
    }

    async submitAssessment(): Promise<boolean> {
        const submitDate = Math.floor(Date.now() / 1000);
        try {
            await AWS.API.put('ProctoApi', '/response', {
                body: {
                    student: this.username,
                    assessment: this.assessment.getId(),
                    submitted: submitDate,
                    answers: JSON.stringify(this.getAnswers())
                }
            });
            return true;
        }
        catch (err: any) {
            console.log(err.response.data);
            return false;
        }
    }

    async setAnswer(index: number, answer: string): Promise<boolean> {
        const questions: AnswerableQuestion[] = await this.getQuestions();
        return questions[index].setAnswer(answer);
    }

    async getAnswer(index: number): Promise<string> {
        const questions: AnswerableQuestion[] = await this.getQuestions();
        return questions[index].getAnswer();
    }

    private async getAnswers(): Promise<any> {
        const questions = await this.getQuestions();
        const answers: any[] = [];
        questions.forEach(async (question) => answers.push(await question.getAnswer()));
        return answers;
    }
}

export class MarkableAssessment extends AssessmentDecorator {

    mark: number;
    username: string;

    constructor(assessment: Assessment, username: string) {
        super(assessment);
        this.mark = -1;
        this.username = username;
    }

    async getQuestions(): Promise<MarkableQuestion[]> {
        const questions = await this.assessment.getQuestions();
        const markableQuestions: MarkableQuestion[] = [];

        try {
            const result = await AWS.API.get('ProctoApi', `/response/object/${this.username}/${this.assessment.getId()}`, {});
            JSON.parse(result[0].answers)?.forEach((answer: string, index: number) => {
                markableQuestions.push(new MarkableQuestion(questions[index], answer));
            });
            return markableQuestions;
        }
        catch (err: any) {
            console.log(err);
            return Promise.reject();
        };
    }

    async submitMarks(): Promise<boolean> {
        const submitDate = Math.floor(Date.now() / 1000);
        try {
            await AWS.API.put('ProctoApi', '/response', {
                body: {
                    student: this.username,
                    assessment: this.assessment.getId(),
                    marks: JSON.stringify(this.getMarks())
                }
            });
            return true;
        }
        catch (err: any) {
            console.log(err.response.data);
            return false;
        }
    }

    async setMark(index: number, mark: number): Promise<boolean> {
        const questions: MarkableQuestion[] = await this.getQuestions();
        return questions[index].setMark(mark);
    }

    async getMark(index: number): Promise<number> {
        const questions: MarkableQuestion[] = await this.getQuestions();
        return questions[index].getMark();
    }

    private async getMarks(): Promise<any> {
        const questions = await this.getQuestions();
        const marks: any[] = [];
        questions.forEach(async (question) => marks.push(await question.getMark()));
        return marks;
    }
}

export class ImmutableAssessment extends AssessmentDecorator {

    username: string;

    constructor(assessment: Assessment, username: string) {
        super(assessment);
        this.username = username;
    }

    async getQuestions(): Promise<ImmutableQuestion[]> {
        const questions = await this.assessment.getQuestions();
        const immutableQuestions: ImmutableQuestion[] = [];

        try {
            const result = await AWS.API.get('ProctoApi', `/response/object/${this.username}/${this.assessment.getId()}`, {});
            JSON.parse(result[0].answers)?.forEach((answer: string, index: number) => {
                immutableQuestions.push(new ImmutableQuestion(questions[index], answer, JSON.parse(result[0].marks)[index]));
            });
            return immutableQuestions;
        }
        catch (err: any) {
            console.log(err);
            return Promise.reject();
        };
    }

    async getMark(index: number): Promise<number> {
        const questions: ImmutableQuestion[] = await this.getQuestions();
        return questions[index].getMark();
    }

    async getFinalMark(): Promise<number> {
        const questions = await this.getQuestions();
        let mark = 0;
        questions.forEach(async (question) => mark += await question.getMark());
        return mark;
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