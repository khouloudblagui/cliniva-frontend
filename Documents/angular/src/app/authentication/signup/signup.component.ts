import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core/service/auth.service';
import { RegisterRequest } from '@core/models/register-request';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthService
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      role: ['USER', Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    console.log("1");

    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid ) {
      console.log("2" , this.authForm.validator);
      return ;
    } else {
      console.log(this.authForm.value as RegisterRequest)
      this.authService.register(this.authForm.value as RegisterRequest).subscribe(res=>{
        console.log(res);

        localStorage.setItem("token" , res.access_token)
        localStorage.setItem("role" , 'USER')
        localStorage.setItem('fisrtname' , res.firstname)
        localStorage.setItem('lastname' , res.lastname)
        this.router.navigate(['/patient/dashboard']);
      })
    }
  }
}
