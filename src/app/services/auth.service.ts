import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/observable';
import { UserModel } from '../models/user.model';
import { UserStatus } from "../models/enums";

@Injectable()
export class AuthService { 
  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase, 
    private router: Router) {
      this.user = this.afAuth.authState;
     }

  get currentUserId() : string {
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resolve => {
        let status = UserStatus.online;
        this.setUserStatus(status.toString());
        this.router.navigate(['chat']);
      })
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        let status = UserStatus.online.toString();
        this.setUserData(email, displayName, status);
      }).catch(error => {
        console.log(error);
      })
  }

  setUserData(email: string, displayName: string, status: string) {
    console.log('status', status);
    let path = `users/${this.currentUserId}`;
    let data = {
      email,
      displayName,
      status
    }

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string) {
    let path = `users/${this.currentUserId}`;
    let data = {
      status
    };
  }

  getAuthUser() {
    return this.user;
  }


}
