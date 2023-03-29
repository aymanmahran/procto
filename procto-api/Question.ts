export interface Question {
    getPrompt(): Promise<string>;
    getWeight(): Promise<number>;
    getNumber(): Promise<number>;
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
        return Promise.reject();
    }

    getWeight(): Promise<number> {
        return Promise.reject();
    }

    getNumber(): Promise<number> {
        return Promise.reject();
    }

    setPrompt(prompt: string): Promise<boolean> {
        return Promise.reject();
    }

    setWeight(weight: number): Promise<boolean> {
        return Promise.reject();
    }

    setNumber(index: number): Promise<boolean> {
        return Promise.reject();
    }
}

export class MultipleChoice extends SimpleQuestion {

    options: string[];

    constructor(prompt: string, options: string[], weight: number, index: number) {
        super(prompt, weight, index);
        this.options = options;
    }

    async addOption(option: string): Promise<boolean> {
        return Promise.reject();
    }

    async getOptions(): Promise<string[]> {
        return Promise.reject();
    }
}

export class LongAnswer extends SimpleQuestion {

    maxLines: number;

    constructor(prompt: string, weight: number, index: number) {
        super(prompt, weight, index);
        this.maxLines = -1;
    }

    async setMaxLines(option: string): Promise<boolean> {
        return Promise.reject();
    }

    async getMaxLines(): Promise<number> {
        return Promise.reject();
    }
}
abstract class QuestionDecorator implements Question {

    question: Question;

    constructor(question: Question) {
        this.question = question;
    }

    getPrompt(): Promise<string> {
        return Promise.reject();
    }

    getWeight(): Promise<number> {
        return Promise.reject();
    }

    getNumber(): Promise<number> {
        return Promise.reject();
    }
}

export class AnswerableQuestion extends QuestionDecorator {

    constructor(question: Question) {
        super(question);
    }

    async setAnswer(answer: string): Promise<boolean> {
        return Promise.reject();
    }

    async getAnswer(): Promise<string> {
        return Promise.reject();
    }
}

export class MarkableQuestion extends QuestionDecorator {

    constructor(question: Question) {
        super(question);
    }

    async setMark(mark: number): Promise<boolean> {
        return Promise.reject();
    }

    async getMark(): Promise<number> {
        return Promise.reject();
    }
}