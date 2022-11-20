import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { EditService } from '../services/edit.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent implements OnInit {
  @ViewChild('editTaskInput', { static: true }) editTaskInput!: ElementRef;
  showModal: boolean = false;

  constructor(private editService: EditService) {}

  ngOnInit(): void {
    this.passTask();
  }

  passTask() {
    this.editTaskInput.nativeElement.value = this.editService.taskToEdit.task;
  }

  passNewValue(task: string) {
    this.editService.newValue(task);
    this.editService.toggleModalVisibility.emit(this.showModal);
    this.editTaskInput.nativeElement.value = '';
  }
}
