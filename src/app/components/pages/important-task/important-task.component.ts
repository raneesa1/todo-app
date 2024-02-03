import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-important-task',
  standalone: true,
  imports: [PageTitleComponent,TaskListComponent],
  templateUrl: './important-task.component.html',
  styleUrl: './important-task.component.scss'
})
export class ImportantTaskComponent {
newTask='';
  taskList:any[] = []
  httpService=inject(HttpService)
  
  ngOnInit(){
    this.getAllTask()
  }

 
  getAllTask(){

    this.httpService.getAllTask().subscribe((result:any)=>{

      this.taskList=result.filter((x:any)=>x.important === true)

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
