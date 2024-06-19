import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  message = '';
  constructor(
    private fb: FormBuilder,
    private dataservice:DataAccessService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  login() {
    this.dataservice.ValidateLoginandToken(this.Email.value,this.PWD.value).subscribe((res:any)=>{
      if(res!=''){
        console.log('token is'+res);
        this.dataservice.setToken(res);
        this.message="Success";
        console.log('user is '+this.dataservice.getUser().email)
      }
      else{
        this.message="Invalid Email or Password";      
      }

    })
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

}
