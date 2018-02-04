import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from "../services/chat.service";
import { Observable } from "rxjs/Observable";
import { ChatMessage } from "../models/chat-message.model";

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {
	feed: Observable<ChatMessage[]>;
	// userName: string;

	constructor(private chat: ChatService) { }

	ngOnInit() {
		this.feed = this.chat.getMessages();
		// this.userName = this.chat.userName;
	}

	ngOnChanges() {
		this.feed = this.chat.getMessages();
	}

}
