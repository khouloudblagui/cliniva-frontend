import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RoomService } from '../allroom/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-allotment',
  templateUrl: './edit-allotment.component.html',
  styleUrls: ['./edit-allotment.component.scss'],
})
export class EditAllotmentComponent {
  roomForm: UntypedFormGroup;
  formdata = {
    id: 1, // ID de l'entité à modifier
    rNo: '105',
    rType: '2',
    pName: 'John Doe',
    aDate: '2020-02-17',
    dDate: '2020-02-19',
    gender: 'Male',
    status: 'Available',
  };

  constructor(
    private fb: UntypedFormBuilder,
    private roomService: RoomService,
    private snackBar: MatSnackBar
  ) {
    this.roomForm = this.createContactForm();
  }

  onSubmit() {
    if (this.roomForm.valid) {
      this.roomService.updateRoom(this.roomForm.value);
      this.snackBar.open('Room updated successfully', '', {
        duration: 2000,
      });
    }
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.formdata.id],
      rNo: [this.formdata.rNo, [Validators.required]],
      rType: [this.formdata.rType, [Validators.required]],
      pName: [this.formdata.pName, [Validators.required]],
      aDate: [this.formdata.aDate, [Validators.required]],
      dDate: [this.formdata.dDate, [Validators.required]],
      gender: [this.formdata.gender, [Validators.required]],
      status: [this.formdata.status, [Validators.required]],
    });
  }
}







/*export class EditAllotmentComponent {
  roomForm: UntypedFormGroup;
  formdata = {
    rNo: '105',
    rType: '2',
    pName: 'John Deo',
    aDate: '2020-02-17T14:22:18Z',
    dDate: '2020-02-19T14:22:18Z',
  };
  constructor(private fb: UntypedFormBuilder) {
    this.roomForm = this.createContactForm();
  }
  onSubmit() {
    console.log('Form Value', this.roomForm.value);
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      rNo: [this.formdata.rNo, [Validators.required]],
      rType: [this.formdata.rType, [Validators.required]],
      pName: [this.formdata.pName, [Validators.required]],
      aDate: [this.formdata.aDate, [Validators.required]],
      dDate: [this.formdata.dDate, [Validators.required]],
    });
  }
}*/
