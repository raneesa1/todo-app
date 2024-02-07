import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';


@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule,DatePipe,PageTitleComponent,TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss'
})
export class AllTaskComponent {
  newTask='';
  intialTaskList:any[] = []
  taskList:any[] = []
  httpService=inject(HttpService)
  StateService=inject(StateService)


  ngOnInit(){
    this.StateService.searchSubject.subscribe((value)=>{
       if (value) {
      this.taskList = this.intialTaskList.filter((task) =>
        task.title.toLowerCase().includes(value.toLowerCase())
      );
    }else{
      this.taskList = this.intialTaskList
    }


    })
    this.getAllTask()
  }

  editTask : any = null
  onEdit(task:any){
    this.editTask = task
    this.newTask = task.title
  }
  addTask(){
    if(this.editTask){
    if(this.newTask.trim() === ''){
      return alert('please enter you task')
    }

      this.editTask.title = this.newTask
      this.httpService.updateTask(this.editTask).subscribe(()=>{
        this.getAllTask()
        this.editTask = null
        this.newTask = ''
        
      })
    }else{
    

    if(this.newTask.trim() === ''){
      alert('please enter your task')
    }else{

   
    console.log(this.newTask)
    this.httpService.addTask(this.newTask).subscribe(()=>{
      console.log('added')
      this.newTask=""
      this.getAllTask()
    })
  }
}
  }
  getAllTask(){

    this.httpService.getAllTask().subscribe((result:any)=>{
      this.intialTaskList=this.taskList=result

    })
  }

  onComplete(task:any){
  
    task.completed = !task.completed
    this.httpService.updateTask(task).subscribe(()=>{
      this.getAllTask() 
    })
  }

  onImportant(task:any){
    task.important = !task.important
      this.httpService.updateTask(task).subscribe(()=>{
        this.getAllTask()
    })

  }
  onDelete(task:any){
    task.delete = true
    this.httpService.deleteTask(task).subscribe(()=>{
      this.getAllTask()
    })
  }
 
}
