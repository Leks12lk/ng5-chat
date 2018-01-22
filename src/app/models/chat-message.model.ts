

export class ChatMessage {
    $key?: string;
    //email?: string;
    //userName?: string;
    //message?: string;
    //timeSent?: Date = new Date();

    constructor(public email?:string, 
        public userName?: string, 
        public message?: string, 
        public timeSent?: string) {}

}