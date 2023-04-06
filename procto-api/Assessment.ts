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
    questionsObj: any;
    id: ID;

    constructor(id: ID) {
        this.id = id;
        this.title = '';
        this.startDate = -1;
        this.duration = -1;
        this.weight = -1;
        this.questions = [];
        this.questionsObj = null;

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
            const arr = JSON.parse(result[0]?.questions ?? '[]');
            this.questionsObj = arr;
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
            console.log(err.response.data);
            return false;
        };
    }

    private async update(props: any): Promise<boolean> {
        try {
            const result = await AWS.API.get('ProctoApi', `/assessment/${this.id}`, {});
            await AWS.API.put('ProctoApi', '/assessment', {
                body: {
                    ...result[0],
                    ...props
                }
            });
            return true;
        }
        catch (err: any) {
            console.log(err.response.data);
            return false;
        };
    }

    async getTitle(): Promise<string> {
        if (!this.title) await this.init();
        return this.title;
    }

    async getWeight(): Promise<number> {
        if (!this.title) await this.init();
        return this.weight;
    }

    async getDuration(): Promise<number> {
        if (!this.title) await this.init();
        return this.duration;
    }

    async getStartDate(): Promise<Date> {
        if (!this.title) await this.init();
        return this.startDate;
    }

    async getId(): Promise<ID> {
        if (!this.title) await this.init();
        return this.id;
    }

    async getQuestions(): Promise<Question[]> {
        if (!this.title) await this.init();
        return this.questions;
    }

    async getQuestionsObj(): Promise<any> {
        if (!this.title) await this.init();
        return this.questionsObj;
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

    async setQuestions(questions: any[]): Promise<boolean> {
        this.questions = [];
        console.log(questions);
        questions.forEach(question => this.questions.push(new LongAnswer(question.prompt, question.weight, question.number)));
        return this.update({ questions: JSON.stringify(this.questions) });
    }

    async addQuestion(question: any): Promise<boolean> {
        this.questions.push(new LongAnswer(question.prompt, question.weight, question.number));
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
    questions: AnswerableQuestion[];

    constructor(assessment: Assessment, username: string) {
        super(assessment);
        this.startDate = -1;
        this.endDate = -1;
        this.username = username;
        this.questions = [];
    }

    async getQuestions(): Promise<AnswerableQuestion[]> {
        const questions = await this.assessment.getQuestions();
        const answerableQuestions: AnswerableQuestion[] = [];
        questions.forEach(question => answerableQuestions.push(new AnswerableQuestion(question)));
        this.questions = answerableQuestions;
        return this.questions;
    }

    async startAssessment(): Promise<boolean> {
        const startDate = Math.floor(Date.now() / 1000);
        const id = await this.assessment.getId();

        try {
            console.log(id, this.username);
            await AWS.API.post('ProctoApi', '/response', {
                body: {
                    student: this.username,
                    assessment: id,
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
        const id = await this.assessment.getId();
        const result = await AWS.API.get('ProctoApi', `/response/object/${this.username}/${id}`, {});

        try {
            const answers = await this.getAnswers();
            await AWS.API.put('ProctoApi', '/response', {
                body: {
                    ...result,
                    submitted: submitDate,
                    answers: JSON.stringify(answers)
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
        if (this.questions.length == 0)
            await this.getQuestions();

        return this.questions[index].setAnswer(answer);
    }

    async getAnswer(index: number): Promise<string> {
        if (this.questions.length == 0)
            await this.getQuestions();

        return this.questions[index].getAnswer();
    }

    private async getAnswers(): Promise<any> {
        if (this.questions.length == 0)
            await this.getQuestions();

        const answers: any[] = [];
        for (let question of this.questions) {
            const ans = await question.getAnswer();
            answers.push(ans);
            console.log("Ans", ans);
        }
        return answers;
    }
}

export class MarkableAssessment extends AssessmentDecorator {

    mark: number;
    username: string;
    questions: MarkableQuestion[];

    constructor(assessment: Assessment, username: string) {
        super(assessment);
        this.mark = -1;
        this.username = username;
        this.questions = [];
    }

    async getQuestions(): Promise<MarkableQuestion[]> {
        const questions = await this.assessment.getQuestions();
        const markableQuestions: MarkableQuestion[] = [];
        const id = await this.assessment.getId();
        console.log(id);

        try {
            const result = await AWS.API.get('ProctoApi', `/response/object/${this.username}/${id}`, {});
            console.log(result);
            const answers = JSON.parse(result?.answers ?? '[]');
            questions.forEach((question: any, index: number) => {
                markableQuestions.push(new MarkableQuestion(question, answers[index] ?? ''));
            });
            this.questions = markableQuestions;
            return this.questions;
        }
        catch (err: any) {
            console.log(err);
            return Promise.reject();
        };
    }

    async submitMarks(): Promise<boolean> {
        const submitDate = Math.floor(Date.now() / 1000);
        const id = await this.assessment.getId();
        const result = await AWS.API.get('ProctoApi', `/response/object/${this.username}/${id}`, {});

        try {
            const marks = await this.getMarks();
            await AWS.API.put('ProctoApi', '/response', {
                body: {
                    ...result,
                    submitted: submitDate,
                    marks: JSON.stringify(marks)
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
        if (this.questions.length == 0)
            await this.getQuestions();

        const marks: any[] = [];
        for (let question of this.questions) {
            const ans = await question.getMark();
            marks.push(ans);
            console.log("Ans", ans);
        }
        return marks;
    }
}

export class ImmutableAssessment extends AssessmentDecorator {

    username: string;

    constructor(assessment: Assessment, username: string) {
        super(assessment);
        this.username = username;
    }

    async isDone(): Promise<boolean> {
        const id = await this.assessment.getId();
        try {
            const result = await AWS.API.get('ProctoApi', `/response/object/${this.username}/${id}`, {});
            if (result?.answers) return true;
            else return false;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    async getQuestions(): Promise<ImmutableQuestion[]> {
        const questions = await this.assessment.getQuestions();
        const immutableQuestions: ImmutableQuestion[] = [];
        const id = await this.assessment.getId();
        console.log(id);
        try {
            const result = await AWS.API.get('ProctoApi', `/response/object/${this.username}/${id}`, {});
            const marks = JSON.parse(result.marks ?? '[]');
            JSON.parse(result?.answers ?? '[]').forEach((answer: string, index: number) => {
                immutableQuestions.push(new ImmutableQuestion(questions[index], answer, marks.length ? marks[index] : null));
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
        let finalMark = 0;
        for (let question of questions) {
            const mark = await question.getMark();
            finalMark += mark;
        }
        return finalMark;
    }
}