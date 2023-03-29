export default class Assessment {
    props: any;
    constructor(props: any) {
        this.props = props;
    }

    async getQuestions() {
        return [{
            number: "1",
            weight: "10",
            type: 'long-answer',
            prompt: 'What is life?',
            answer: "idk"
        },
        {
            number: "2",
            weight: "5",
            type: 'long-answer',
            prompt: 'What sound do cats make?',
            answer: "meow"
        },
        {
            number: "3",
            weight: "1",
            type: 'multiple-choice',
            prompt: 'Which of the following is an animal?',
            options: [
                {
                    number: "1",
                    text: 'Cat'
                },
                {
                    number: "2",
                    text: 'Dog'
                },
                {
                    number: "3",
                    text: 'Apple'
                }
            ]
        }];
    }
    async getName() {
        return this.props.name;
    }

    async getDuration() {
        return "20";
    }
}