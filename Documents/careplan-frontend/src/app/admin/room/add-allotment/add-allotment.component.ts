import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RoomService } from '../allroom/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-allotment',
  templateUrl: './add-allotment.component.html',
  styleUrls: ['./add-allotment.component.scss'],
})

export class AddAllotmentComponent {
  roomForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private roomService: RoomService,
    private snackBar: MatSnackBar
  ) {
    this.roomForm = this.fb.group({
      rNo: ['', [Validators.required]],
      rType: ['', [Validators.required]],
      pName: ['', [Validators.required]],
      aDate: ['', [Validators.required]],
      dDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      status: ['', [Validators.required]], // Ajout du champ 'status'
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {
      this.roomService.addRoom(this.roomForm.value);
      this.snackBar.open('Room added successfully', '', {
        duration: 2000,
      });
    }
  }
}


/*export class AddAllotmentComponent {
  roomForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {
    this.roomForm = this.fb.group({
      rNo: ['', [Validators.required]],
      rType: ['', [Validators.required]],
      pName: ['', [Validators.required]],
      aDate: ['', [Validators.required]],
      dDate: ['', [Validators.required]],
    });
  }
  onSubmit() {
    console.log('Form Value', this.roomForm.value);
  }
}*/
