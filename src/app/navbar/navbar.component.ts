import { Component, OnInit } from '@angular/core';
import { ChatService } from "../services/chat.service";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs/observable";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any;
  userEmail: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getAuthUser();
    this.user.subscribe(user => {
      if(user) {
        this.userEmail = user.email;
      }
    });
  }

}
