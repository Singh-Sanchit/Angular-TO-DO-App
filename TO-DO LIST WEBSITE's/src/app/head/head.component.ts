import { Component, OnInit } from '@angular/core';
import {AuthService} from '../user-management/login-signup/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }
  logou(){
    this.auth.logout();
    this.router.navigate(['']);
  }
}
