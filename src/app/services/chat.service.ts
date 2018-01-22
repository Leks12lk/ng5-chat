import { Injectable } from '@angular/core';
import { FirebaseListObservable  } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/observable';

import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';

import { ChatMessage } from '../models/chat-message.model';
import { UserModel } from "../models/user.model";


@Injectable()
export class ChatService { 
  user: firebase.User;
  //chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { 
    this.afAuth.authState.subscribe(auth => {
      if(auth !== undefined && auth !== null) {
        this.user = auth;
      }

      this.getUser().subscribe((user) => {
        this.userName = user.displayName;
      });
    });
    
  }

  sendMessage(message: string) {  
    let timeSent = this.getTimeSent();
     let email = this.user.email;
    //let email = "test@test.com";
    //let userName = this.userName;
    let userName = 'testUser';   
    this.db.list('messages').push({email, message, userName, timeSent});  
    console.log('Called sendMessage()');
  }

  getTimeSent() {
    let now = new Date();
    let date = now.getUTCFullYear() + '/' +
               (now.getUTCMonth() +1 ) + '/' +
               now.getUTCDate();
    
    let time = now.getUTCHours() + ':' +
              now.getUTCHours() + ':' +
              now.getUTCSeconds();
    return (date + ' ' + time);
  }

  getMessages(): Observable<ChatMessage[]> {
    return this.db.list('messages').valueChanges();
  }

   getUser(): any {
    let userId = this.user.uid;
    let path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    let path = '/users';
    return this.db.list(path);
  }

}
