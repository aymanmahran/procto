export interface Question {
    getPrompt(): Promise<string>;
    getWeight(): Promise<number>;
    getNumber(): Promise<number>;
    getObject(): Promise<any>;
}

abstract class SimpleQuestion implements Question {

    index: number;
    prompt: string;
    weight: number;

    constructor(prompt: string, weight: number, index: number) {
        this.prompt = prompt;
        this.weight = weight;
        this.index = index;
    }

    getPrompt(): Promise<string> {
        return Promise.resolve(this.prompt);
    }

    getWeight(): Promise<number> {
        return Promise.resolve(this.weight);
    }

    getNumber(): Promise<number> {
        return Promise.resolve(this.index);
    }

    getObject(): Promise<any> {
        return Promise.resolve({
            index: this.index,
            prompt: this.prompt,
            weight: this.weight
        });
    }

    setPrompt(prompt: string): Promise<boolean> {
        this.prompt = prompt;
        return Promise.resolve(true);
    }

    setWeight(weight: number): Promise<boolean> {
        this.weight = weight;
        return Promise.resolve(true);
    }

    setNumber(index: number): Promise<boolean> {
        this.index = index;
        return Promise.resolve(true);
    }
}

export class MultipleChoice extends SimpleQuestion {

    options: string[];

    constructor(prompt: string, options: string[], weight: number, index: number) {
        super(prompt, weight, index);
        this.options = options;
    }

    async addOption(option: string): Promise<boolean> {
        this.options.push(option);
        return Promise.resolve(true);
    }

    async getOptions(): Promise<string[]> {
        return Promise.resolve(this.options);
    }
}

export class LongAnswer extends SimpleQuestion {

    maxLines: number;

    constructor(prompt: string, weight: number, index: number) {
        super(prompt, weight, index);
        this.maxLines = 50;
    }

    async setMaxLines(maxLines: number): Promise<boolean> {
        this.maxLines = maxLines;
        return Promise.resolve(true);
    }

    async getMaxLines(): Promise<number> {
        return Promise.resolve(this.maxLines);
    }
}
abstract class QuestionDecorator implements Question {

    question: Question;

    constructor(question: Question) {
        this.question = question;
    }

    getPrompt(): Promise<string> {
        return this.question.getPrompt();
    }

    getWeight(): Promise<number> {
        return this.question.getWeight();
    }

    getNumber(): Promise<number> {
        return this.question.getNumber();
    }

    getObject(): Promise<any> {
        return this.question.getObject();
    }
}

export class AnswerableQuestion extends QuestionDecorator {

    answer: string;

    constructor(question: Question) {
        super(question);
        this.answer = '';
    }

    async setAnswer(answer: string): Promise<boolean> {
        this.answer = answer;
        return Promise.resolve(true);
    }

    async getAnswer(): Promise<string> {
        return Promise.resolve(this.answer);
    }
}

export class MarkableQuestion extends QuestionDecorator {

    mark: number;
    answer: string;

    constructor(question: Question, answer: string) {
        super(question);
        this.mark = 0;
        this.answer = answer;
    }

    async setMark(mark: number): Promise<boolean> {
        this.mark = mark;
        return Promise.resolve(true);
    }

    async getMark(): Promise<number> {
        return Promise.resolve(this.mark);
    }

    async getAnswer(): Promise<string> {
        return Promise.resolve(this.answer);
    }
}

export class ImmutableQuestion extends QuestionDecorator {

    mark: number;
    answer: string;

    constructor(question: Question, answer: string, mark: number) {
        super(question);
        this.answer = answer;
        this.mark = mark;
    }

    async getMark(): Promise<number> {
        return Promise.resolve(this.mark);
    }

    async getAnswer(): Promise<string> {
        return Promise.resolve(this.answer);
    }
}