import { Component, OnInit } from '@angular/core';
import {ValidateService} from  '../../services/validate.service'
import { NgFlashMessageService } from 'ng-flash-messages';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from '../../user-management/login-signup/auth.service';
import {ActivatedRoute,ParamMap} from "@angular/router";

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
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
  taskstatus:any;
  tid:any;
  res:any;
  fa:String;

  constructor(private ro:ActivatedRoute,private authser:AuthService,private router: Router,private http:HttpClient,private validateService:ValidateService,private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    this.ro.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has("result.taskId")){
        this.tid=paramMap.get("result.taskId");
        console.log(this.tid);
        this.http.get<{data:any}>("https://todo-rawengg.herokuapp.com/api/rest/v1/todo/task/gettaskbyid/"+this.tid)
        .subscribe((res)=>{
          this.res=res;
          console.log(this.res); 
          let date = res.data[0].taskDate.split("/");
          this.taskname=res.data[0].name; 
          this.taskdescription=res.data[0].description; 
          this.date={year:date[2],month:date[1],day:date[0]}; 
          this.taskstatus=res.data[0].status; 
          
        });
        
      }
    })
  }
 
 onEdit(){
   
  const task={
    taskname:this.taskname,
    taskdescription:this.taskdescription,
    taskstatus:this.taskstatus,
    date:this.date
  }
  //req
  console.log(this.date,"info");
    this.day=this.date.day;
    this.month=this.date.month;
    this.year=this.date.year;
    this.sdate=String(this.day+"/"+this.month+"/"+this.year);

    this.email=this.authser.getDetail();
    this.http.patch("https://todo-rawengg.herokuapp.com/api/rest/v1/todo/task/edit/"+this.tid,[{
      "propName": "name",
      "value": this.taskname
    },{
      "propName": "description",
      "value": this.taskdescription
    },{
      "propName": "taskDate",
      "value": this.sdate,
    },{
      "propName": "status",
      "value": this.taskstatus,
    }]).subscribe((sub)=>{
      this.sub=sub;
      console.log(sub);
      
    });
    this.router.navigate(['displaytask']);
    
    
  }


}
