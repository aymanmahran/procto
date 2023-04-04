export abstract class AWS {
    static API: any;

    static Config(API: any) {
        AWS.API = API;
    }
}