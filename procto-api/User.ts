export default class User {
    email: any;

    constructor(email: any) {
        this.email = email;
    }
    async getType() {
        return "professor";
    }
}