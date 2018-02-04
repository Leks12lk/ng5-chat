import { Component, OnInit } from '@angular/core';
import { ChatService } from "../services/chat.service";
import { UserModel } from "../models/user.model";
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users: UserModel[];

  constructor(private chat: ChatService) {
    
  }

  ngOnInit() {
    this.chat.getUsers().valueChanges().subscribe(users => {
      this.users = users;
    });
  }

}
