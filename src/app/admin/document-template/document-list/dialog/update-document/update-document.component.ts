import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DocTemp } from 'app/admin/document-template/model/DocTemp';
import { DocTempService } from 'app/admin/document-template/services/doc-temp.service';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss']
})
export class UpdateDocumentComponent {
  updatedDocument!: DocTemp;
  DocumentForm: FormGroup;
  selectedFile: File | null = null;


  constructor(
    public dialogRef: MatDialogRef<UpdateDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { document: DocTemp },
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private docTempService: DocTempService,
  ) {
    this.updatedDocument = data.document;
    this.DocumentForm = this.formBuilder.group({
      DocumentTitle: [data.document.templateDocTitle, Validators.required],
      DocumentDesc: [data.document.templateDoc_Desc, Validators.required],
      TemplateFormat: [data.document.templateDoc_Format, Validators.required],
      ElementType: [data.document.templateDoc_PrntElmntTp, Validators.required],
      file: [data.document.fileData, Validators.required],
      TemplateDoc_PrntElmntKy: [data.document.templateDoc_PrntElmntKy, Validators.required],
    });
  }

  /*onUpdate(): void {
    const documentId = this.updatedDocument.templateDoc_Ky;
    
    // Extract values from the form
    const title = this.DocumentForm.get('DocumentTitle')?.value;
    const description = this.DocumentForm.get('DocumentDesc')?.value;
    const format = this.DocumentForm.get('TemplateFormat')?.value;
    const parentElementType = this.DocumentForm.get('ElementType')?.value;
    const parentElementKey = this.DocumentForm.get('TemplateDoc_PrntElmntKy')?.value;
  
    this.docTempService.updateDocument(documentId, title, description, format, parentElementType, parentElementKey)
      .subscribe(
        response => {
          console.log('Document updated successfully:', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Failed to update document:', error);
          // Handle error here
        }
      );
  }*/
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
  
  onUpdate(): void {
    const documentId = this.updatedDocument.templateDoc_Ky;
    
    // Extract values from the form
    const title = this.DocumentForm.get('DocumentTitle')?.value;
    const description = this.DocumentForm.get('DocumentDesc')?.value;
    const format = this.DocumentForm.get('TemplateFormat')?.value;
    const parentElementType = this.DocumentForm.get('ElementType')?.value;
    const parentElementKey = this.DocumentForm.get('TemplateDoc_PrntElmntKy')?.value;
  
    // Check if the title already exists
    this.docTempService.checkTitleExists(title).subscribe(
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
          // Create FormData object and append fields
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          formData.append('format', format);
          formData.append('parentElementType', parentElementType);
          formData.append('parentElementKey', parentElementKey);
  
          // Check if a file is selected
          if (this.selectedFile) {
            formData.append('file', this.selectedFile);
          }
  
          // Call your service to update the document
          this.docTempService.updateDocument(documentId, formData).subscribe(
            response => {
              console.log('Document updated successfully:', response);
              this.dialogRef.close();
            },
            error => {
              console.error('Failed to update document:', error);
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
  }
  
  
  

  onCancel(): void {
    // Close the modal without performing any update
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const fileControl = this.DocumentForm.get('file');
    if (fileControl) {
      fileControl.updateValueAndValidity();
    }
  }

}
