import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from "../models/chat-message.model";
import { AuthService } from "../services/auth.service";


@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
	@Input() chatMessage: ChatMessage;
	userName: string;
	userEmail: string;
	messageContent: string;
	timeSent: string;
	isOwnMessage: boolean;
	
	user: any;

	constructor(private authService: AuthService) { }

	ngOnInit(chatMessage = this.chatMessage) {
		this.messageContent = chatMessage.message;
		this.timeSent = chatMessage.timeSent;
		this.userEmail = chatMessage.email;
		this.userName = chatMessage.userName;

		this.user = this.authService.getAuthUser();
		this.user.subscribe(user => {
			if(user) {
				
				this.isOwnMessage = this.chatMessage.email === user.email;
			}
		});
		
	}

}
