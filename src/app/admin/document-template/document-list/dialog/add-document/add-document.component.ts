import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DocTemp } from 'app/admin/document-template/model/DocTemp';
import { DocTempService } from 'app/admin/document-template/services/doc-temp.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {

  vaccinationForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddDocumentComponent>,
    private vaccinationService: DocTempService,
    private snackBar: MatSnackBar
  ) {
    const fileControl = new FormControl(null, Validators.required);
    this.vaccinationForm = this.formBuilder.group({
      DocumentTitle: ['', Validators.required],
      DocumentDesc: ['', Validators.required],
      TemplateFormat: ['', Validators.required],
      ElementType: ['', Validators.required],
      TemplateDoc_PrntElmntKy: ['', Validators.required],
      file: fileControl // Add file control to the form
    });
  }

  ngOnInit(): void {
  }

onSubmit(): void {
  if (this.vaccinationForm.valid && this.selectedFile) { // Check if form is valid and a file is selected
    const formData = this.vaccinationForm.value;
    const { DocumentTitle, DocumentDesc, TemplateFormat, ElementType, TemplateDoc_PrntElmntKy } = formData;

    // Check if the title already exists
    this.vaccinationService.checkTitleExists(DocumentTitle).subscribe(
      (exists) => {
        if (exists) {
          console.error('Title already exists');
          this.showNotification(
            'snackbar-warning',
            'Title already exists. Please choose a different title.',
            'bottom',
            'right'
          );
        } else {
          // Create a FormData object to append form data and file
          const formDataToSend = new FormData();
          formDataToSend.append('title', DocumentTitle);
          formDataToSend.append('description', DocumentDesc);
          formDataToSend.append('format', TemplateFormat);
          formDataToSend.append('parentElementType', ElementType);
          formDataToSend.append('parentElementKey', TemplateDoc_PrntElmntKy);
          if (this.selectedFile) {
            formDataToSend.append('file', this.selectedFile);
          } else {
            console.error('No file selected');
            // Handle the case where no file is selected, such as showing an error message
          }
  
          // Call your service to upload the document
          this.vaccinationService.uploadDocument(formDataToSend).subscribe(
            (response) => {
              console.log('Document uploaded successfully:', response);
              this.dialogRef.close();
              this.showNotification(
                'snackbar-success',
                'Document uploaded successfully',
                'bottom',
                'center'
              );
            },
            (error) => {
              console.error('Error uploading document:', error);
              this.dialogRef.close();
              this.showNotification(
                'snackbar-success',
                'Document uploaded successfully',
                'bottom',
                'center'
              );
            }
          );
        }
      },
      (error) => {
        console.error('Error checking title:', error);
        this.showNotification(
          'snackbar-error',
          'Error checking title. Please try again later.',
          'bottom',
          'right'
        );
      }
    );
  } else {
    console.error('Form is invalid or no file selected');
    this.showNotification(
      'snackbar-warning',
      'Please fill all required fields and select a file',
      'bottom',
      'right'
    );
  }
}

  

  onCancel(): void {
    this.dialogRef.close();
  }  

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const fileControl = this.vaccinationForm.get('file');
    if (fileControl) {
      fileControl.updateValueAndValidity();
    }
  }
}
