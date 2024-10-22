import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthService, Role } from '@core';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  role= '' ;

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('username')?.setValue('');
    this.authForm.get('password')?.setValue('');
  }
  doctorSet() {
    this.authForm.get('username')?.setValue('');
    this.authForm.get('password')?.setValue('');
  }
  patientSet() {
    this.authForm.get('username')?.setValue('');
    this.authForm.get('password')?.setValue('');
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.authService.signin(this.authForm.value).subscribe(res=>{
        console.log(res);
        localStorage.setItem('token' , res.access_token)
        localStorage.setItem('role' , res.role)
        localStorage.setItem('fisrtname' , res.firstname)
        localStorage.setItem('lastname' , res.lastname)
        if(res.role == 'USER'){
          this.router.navigate(['/patient/dashboard']);
        }else if(res.role == 'ADMIN'){
          this.router.navigate(['/admin/dashboard']);
        }else if(res.role == 'DOCTOR'){
          this.router.navigate(['/doctor/dashboard']);
        }else {
          alert("Somthing went wrong")
        }


      })
    }
  }
}
