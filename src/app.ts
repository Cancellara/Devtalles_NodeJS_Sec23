import express, { Request, Response } from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";


(()=>{
    main();
})();


function main(){
    console.log('Coding with Irati!!');

    const app = express();
    const controller = new GithubController();

    //Middleware para serializar body en formato json
    app.use(express.json());

    app.post('/api/github', controller.webhookHandler);

    app.listen(envs.PORT, ()=>{
        console.log(`APP running in port ${envs.PORT} `);
    });
}