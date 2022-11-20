import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  todoList: { id: number; task: string }[] = [];
  finishedTasks: { id: number; task: string }[] = [];
  taskToEdit!: { id: number; task: string };
  toggleModalVisibility = new EventEmitter<boolean>();

  constructor() {}

  addTask(task: string) {
    const todo = {
      id: this.todoList.length,
      task: task,
    };
    this.todoList.push(todo);
  }

  taskDone(task: { id: number; task: string }) {
    const popIndex = this.todoList.indexOf(task);
    this.todoList.splice(popIndex, 1);
    this.finishedTasks.push(task);
  }

  deleteTask(finishedTask: { id: number; task: string }) {
    const popIndex = this.finishedTasks.indexOf(finishedTask);
    this.finishedTasks.splice(popIndex, 1);
  }

  editTask(editTask: { id: number; task: string }) {
    const popIndex = this.todoList.indexOf(editTask);
    this.todoList.splice(popIndex, 1);
    this.taskToEdit = editTask;
  }

  newValue(task: string) {
    const todo = {
      id: this.todoList.length + 1,
      task: task,
    };
    this.todoList.push(todo);
  }
}
