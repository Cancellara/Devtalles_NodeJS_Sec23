import { GitHubIssuePayload, GitHubStartPayload } from "../../interfaces"

export class GitHubService {

    constructor(){}

    onStar = (payload: GitHubStartPayload): string => {
        
        const {sender, action, repository, starred_at} = payload;

        console.log(starred_at);
        return `User ${sender.login} ${action} start on ${repository}`;
    }

    onIssue = (payload: GitHubIssuePayload): string => {

        const {action, issue} = payload;

        if(action === 'opened') {
            return `A new issue was opened with title ${issue.title} by ${issue.user.login}`;
        }

        if(action === 'closed') {
            return `Issue ${issue.title} was closed by ${issue.user.login}`;
        }

        if(action === 'reopened') {
            return `Issue ${issue.title} was reopened by ${issue.user.login}`;
        }

        return `Unhadled issue action event ${action}`;
    }
}