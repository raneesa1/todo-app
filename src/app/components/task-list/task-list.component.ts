import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

@Input() taskList: any[] = [];
@Output() important = new EventEmitter<any>()
@Output() complete  = new EventEmitter<any>()
@Output() delete = new EventEmitter<any>()
@Output() edit = new EventEmitter<any>();

markImportant(task:any){
  this.important.emit(task)

}

markComplete(task:any){
  this.complete.emit(task)

}

markDeleted(task:any){
  console.log('clicked deleted')
  this.delete.emit(task)
}
// editTask(task:any){
//   console.log('clicked edit')
//    this.edit.emit(task);
  
// }


}