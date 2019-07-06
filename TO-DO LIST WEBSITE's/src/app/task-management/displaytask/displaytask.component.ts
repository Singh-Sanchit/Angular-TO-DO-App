import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import {AuthService} from '../../user-management/login-signup/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ValidateService} from  '../../services/validate.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmailValidator } from '@angular/forms';
@Component({
  selector: 'app-displaytask',
  templateUrl: './displaytask.component.html',
  styleUrls: ['./displaytask.component.css']
})

export class DisplaytaskComponent implements OnInit {
  res:any;
  delres:any
  email:any;
  deleid:any;
  closeResult: string;
  taskname:String;
  taskdescription:String;
  taskstatus:string;
    addrecepients:string
  date:any;
  day:any;
  month:any;
  year:any;
  url:any;
  sub:any;
  taskid:any;
  reslength:String;
  constructor(private bdate:BsDatepickerConfig,private ngFlashMessageService: NgFlashMessageService,private validateService:ValidateService,private authser:AuthService,private router: Router,private http:HttpClient,private modalService: NgbModal) { 
    this.bdate.dateInputFormat='DD MM YYYY';  
    this.loadtask();
  }
  open(contain) {
    this.modalService.open(contain, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
delete(taskId){
  this.deleid=taskId;
  this.http.delete("https://todo-rawengg.herokuapp.com/api/rest/v1/todo/task/delete/"+this.deleid)
  .subscribe((delres)=>{
    this.delres=delres;
    console.log(this.delres);
  });
  console.log(this.deleid);
  this.router.navigate(['displaytask']);
}
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  ngOnInit() {
  }
loadtask(){
  this.email=localStorage.getItem("email");
  console.log(this.email);
  this.http.get("https://todo-rawengg.herokuapp.com/api/rest/v1/todo/task/gettask/"+this.email)
  .subscribe((res)=>{
    this.res=res;
    console.log(this.res);
    if (this.res.data.length>0){
      console.log("hello");
      this.reslength="True";
    }
    else{
      this.reslength="false";
    }
  })
 
}
onEdit(){
  const task={
    taskname:this.taskname,
    taskdescription:this.taskdescription,
    status:this.taskstatus,
    addrecepients:this.addrecepients,
    date:this.date
  }
  //req
  if(!this.validateService.validateAddtask(task)){
    this.ngFlashMessageService.showFlashMessage({
      messages:["Incomplete fields"],
      dismissible:true,
      timeout:false,
      type:'warning'
    });
    console.log(this.date); 
    return false;
  }
  else{
    
    this.day=this.date.day;
    this.month=this.date.month;
    this.year=this.date.year;
    this.email=localStorage.getItem("email");
    this.http.post("https://todo-rawengg.herokuapp.com/api/rest/v1/todo/task/edit/",[{
      "propName": "name",
      "value": this.taskname
    },{
      "propName": "description",
      "value": this.taskdescription
    },{
      "propName": "taskDate",
      "value": this.day/this.month/this.year
    },{
      "propName": "status",
      "value": this.taskstatus
    }]).subscribe((sub)=>{
      this.sub=sub;
      console.log(sub);
    });
    this.router.navigate(['displaytask']);
    
  }

}
logou(){
  this.authser.logout();
  this.router.navigate(['']);
}

}
