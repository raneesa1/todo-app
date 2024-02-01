import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule,DatePipe],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss'
})
export class AllTaskComponent {
  newTask='';
  takeList:any[] = []
  httpService=inject(HttpService)
  dateNow = new Date()
  ngOnInit(){
    this.getAllTask()
  }

  addTask(){
    console.log(this.newTask)
    this.httpService.addTask(this.newTask).subscribe(()=>{
      console.log('added')
      this.newTask=""
      this.getAllTask()
    })
  }
  getAllTask(){
    this.httpService.getAllTask().subscribe((result:any)=>{
      console.log(result)
      this.takeList=result

    })
  }

}
