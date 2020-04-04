import { Context, Application } from 'midway';
export declare class GithubOAuthController {
    app: Application;
    constructor(app: Application);
    ctx: Context;
    getGithubOAuthAccessToken(): Promise<void>;
    getGithubUserInfo(): Promise<void>;
}
