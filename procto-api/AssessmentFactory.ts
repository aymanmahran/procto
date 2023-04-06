import { Assessment, SimpleAssessment } from "./Assessment";
import { AWS } from "./AWS";
import { v4 as uuidv4 } from 'uuid';


export abstract class AssessmentFactory {
    static async newAssessment(): Promise<Assessment> {
        const id = uuidv4();
        try {
            await AWS.API.post('ProctoApi', '/assessment', {
                body: {
                    id: id
                }
            });
            return new SimpleAssessment(id);
        }
        catch (err: any) {
            console.log(err.response.data);
            return Promise.reject();
        }
    }

    static async get(id: string): Promise<Assessment> {
        try {
            return new SimpleAssessment(id);
        }
        catch (err: any) {
            console.log(err.response.data);
            return Promise.reject();
        }
    }
}