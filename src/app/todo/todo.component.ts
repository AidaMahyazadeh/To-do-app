import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../model/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit { 
todoForm !:FormGroup;  
allTasks :ITask[]=[];
inprogressTasks :ITask[]=[];
doneTasks :ITask[]=[];
isEditEnable=false;
updateIndex !:any;

constructor(private fb :FormBuilder){}

ngOnInit(): void {
  this.todoForm =this.fb.group({
    item :['',Validators.required]
  })
}

addTask(){
  this.allTasks.push({
    description: this.todoForm.value.item,
    done: false
  })
  this.todoForm.reset();
}

deleteTask(index:number){
  this.allTasks.splice(index,1)
 }

 deleteInprogressTask(index:number){
   this.inprogressTasks.splice(index,1)
 }

 deleteDoneTask(index:number){
  this.doneTasks.splice(index,1)
}
 
 editTask(task:ITask,index:number){
   this.todoForm.controls['item'].setValue(task.description);
   this.updateIndex =index;
   this.isEditEnable =true;
 }

 updateTask(){
    this.allTasks[this.updateIndex].description = this.todoForm.value.item;
    this.allTasks[this.updateIndex].done=false;
    this.todoForm.reset();
    this.updateIndex=undefined;
    this.isEditEnable=false;

 }

drop(event: CdkDragDrop<ITask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}


}
