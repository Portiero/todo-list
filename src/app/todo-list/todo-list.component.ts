import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { EditService } from '../services/edit.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnChanges {
  todoList: { id: number; task: string }[] = [];
  finishedTasks: { id: number; task: string }[] = [];
  @ViewChild('task', { static: true }) taskInput!: ElementRef;
  modalHidden: boolean = false;
  changedValue!: string;
  disableAdd: boolean = false;

  constructor(private editService: EditService) {
    this.editService.toggleModalVisibility.subscribe((visibility: boolean) => {
      this.modalHidden = visibility;
    });
  }

  ngOnInit(): void {
    this.todoList = this.editService.todoList;
    this.finishedTasks = this.editService.finishedTasks;
  }

  ngOnChanges() {}

  onAdd(task: string) {
    if (this.taskInput.nativeElement.value === '') {
      return;
    }
    this.editService.addTask(task);
    this.taskInput.nativeElement.value = '';
  }

  onDone(task: { id: number; task: string }) {
    this.editService.taskDone(task);
  }

  onDelete(finishedTask: { id: number; task: string }) {
    this.editService.deleteTask(finishedTask);
  }

  onEdit(todo: { id: number; task: string }) {
    this.editService.editTask(todo);
    this.modalHidden = true;
  }
}
