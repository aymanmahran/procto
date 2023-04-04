import { userType, Email, Name } from './types';
import { AWS } from './AWS';
export default class User {
    firstname: Name;
    lastname: Name;
    email: Email;
    username: string;

    constructor(username: string) {
        // this.firstname = user.attributes.given_name.split(' ')[0];
        // this.lastname = user.attributes.family_name.split(' ')[0];
        // this.email = user.attributes.email;
        // this.username = user.username;
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.username = username;
    }

    private async init(): Promise<boolean> {
        try {
            const result = await AWS.API.get('ProctoApi', `/student/${this.username}`, {});
            this.firstname = result[0].firstname;
            this.lastname = result[0].lastname;
            this.email = result[0].email;
            //result[0].courses?.forEach((courseId: ID) => this.courses.push(new StudentCourse(courseId)));
            return true;
        }
        catch (err: any) {
            console.log(err);
            return false;
        };
    }

    async update(user: any, type: string, id: string | undefined): Promise<boolean> {
        try {
            const result = await AWS.API.get('ProctoApi', `/student/${this.username}`, {});
            await AWS.API.put('ProctoApi', `/${type}`, {
                body: {
                    ...result[0],
                    username: user.attributes.email,
                    firstname: user.attributes.given_name.split(' ')[0],
                    lastname: user.attributes.family_name.split(' ')[0],
                    email: user.attributes.email,
                    id: id
                }
            });
            return true;
        }
        catch (err: any) {
            console.log(err.response.data);
            return false;
        };
    }

    async getType(): Promise<string> {

        try {
            let result = await AWS.API.get('ProctoApi', `/student/${this.username}`, {});
            if (result.length == 0) {
                result = await AWS.API.get('ProctoApi', `/professor/${this.username}`, {});
                if (result.length == 0) {
                    return 'unspecified';
                }
                return 'professor';
            }
            return 'student';
        }
        catch (err: any) {
            console.log(err);
            return Promise.reject(err.response.data);
        };

        // return Promise.resolve(userType.Student);
    }

    async getFirstname(): Promise<Name> {
        if (!await this.init()) return Promise.reject();
        return this.firstname;
    }

    async getLastname(): Promise<Name> {
        if (!await this.init()) return Promise.reject();
        return this.lastname;
    }

    async getEmail(): Promise<Email> {
        if (!await this.init()) return Promise.reject();
        return this.email;
    }

    async getUsername(): Promise<string> {
        return this.username;
    }
}