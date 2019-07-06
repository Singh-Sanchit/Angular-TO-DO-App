import { Component, OnInit } from '@angular/core';
import {ValidateService} from  '../../services/validate.service'
import { NgFlashMessageService } from 'ng-flash-messages';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from '../../user-management/login-signup/auth.service';

@Component({
  selector: 'app-addtasks',
  templateUrl: './addtasks.component.html',
  styleUrls: ['./addtasks.component.css']
})
export class AddtasksComponent implements OnInit {

  taskname:String;
  taskdescription:String;
  date:any;
  day:any;
  month:any;
  year:any;
  sdate:String;
  addrecepients:String;
  url:any;
  sub:any;
  email:String;
  constructor(private authser:AuthService,private router: Router,private http:HttpClient,private validateService:ValidateService,private ngFlashMessageService: NgFlashMessageService) { }
  
  ngOnInit() {

  }
  onAddtask(){
    const task={
      taskname:this.taskname,
      taskdescription:this.taskdescription,

      addrecepients:this.addrecepients
    }
    //req
    if(!this.validateService.validateAddtask(task)){
      this.ngFlashMessageService.showFlashMessage({
        messages:["Incomplete fields"],
        dismissible:true,
        timeout:false,
        type:'warning'
      });
      return false;
    }
    else{
      
      this.day=this.date.day;
      this.month=this.date.month;
      this.year=this.date.year;
      this.sdate=String(this.day+"/"+this.month+"/"+this.year);
      this.email=localStorage.getItem("email");
      console.log(this.email);
      //var st =this.sdate;
      //var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        //var dt = new Date(st.replace(pattern,'$3-$2-$1'));
        //console.log(dt);
      this.http.post("https://todo-rawengg.herokuapp.com/api/rest/v1/todo/task/create",{
        "name": this.taskname,
        "description": this.taskdescription,
        "taskDate": this.sdate,
        "createdBy": this.email,
        "sendTo": this.addrecepients,
        "status": false
      }
      ).subscribe((sub)=>{
        this.sub=sub;
        console.log(sub);
        console.log(this.sdate);
      });
      this.router.navigate(['displaytask']);
      
    }
  }
}
