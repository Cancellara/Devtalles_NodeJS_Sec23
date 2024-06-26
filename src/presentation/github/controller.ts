import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {
    constructor(
        private readonly gitHubService = new GitHubService(),
        private readonly discordService = new DiscordService(),
    ) {}

    webhookHandler = (req: Request, res: Response) => {
        
        //Tipo de evento devuelto
        const githubEvent = req.header('x-github-event') ?? 'unknown';
        //Firma para verificar que viene desde github
        const signature = req.header('x-hub-signature-256' ?? 'unknown');
        const payload = req.body;
        let message: string;

        switch(githubEvent) {
            case 'star':
                message = this.gitHubService.onStar(payload);
                break;
            case 'issues':
                message = this.gitHubService.onIssue(payload);
                break;
            default:
                message = `Unknown GitHub event ${githubEvent}`;
        }
        //Dependiendo de como venga serializado es posible que se deba usar JSON.parse o stringlyfy para pasar de string a Json
        //console.log(JSON.stringify(payload));

        this.discordService.notify(message)
        .then(() => res.status(202).send('Accepted') )
        .catch(() => res.status(500).json({error: 'Internal server error'}));

        return res.status(202).json('Accepted');

    }
}