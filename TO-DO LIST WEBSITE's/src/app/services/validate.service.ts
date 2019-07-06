import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  validateAddtask(task){
    if(task.taskname==undefined || task.taskdescription==undefined)
    {
      return false;
    }
    else{
      return true;
    }

  }
}
