import { envs } from '../../config';




export class DiscordService {

  private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;

  constructor() {}


  async notify( message: string ) {

    const body = {
      content: message,
      embeds: [{url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWNjbjEzdHcycTRndWJjMXEzMXcxZW9kNHoxOGU0bGVqcXdlbWZ4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KiZ6kV683kPaU/giphy.gif'}]
     
    }

    const req = {
        
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
    }

    const resp = await fetch( this.discordWebhookUrl, req
    );

    if ( !resp.ok ) {
      console.log('Error sending message to discord');
      return false;
    }

    return true;
  }



}