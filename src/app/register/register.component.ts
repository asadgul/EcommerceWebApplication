import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerform!:FormGroup;
  isinvalidpassword:boolean=false;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.registerform=this.fb.group({
      firstName:[
        '',
        [Validators.required,
          Validators.minLength(2)
//          Validators.pattern('[a-az-Z],*'),


        ],

      ],lastName:[
        '',
        [Validators.required,
          Validators.minLength(2)
         // ,Validators.pattern('[a-az-Z],*'),


        ],
      ],
      email:[
        '',
        [Validators.required,
          Validators.email
        ]
      ],
      pwd:[
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15)
        ]
      ],
      rpwd:[
        ''
      ]
    })
  }
  get FIRSTNAME():FormControl{
   return this.registerform.get('firstName') as FormControl 
  }
  get LASTNAME():FormControl{
    return this.registerform.get('lastName') as FormControl 
   }
     get EMAIL():FormControl{
    return this.registerform.get('email') as FormControl 
   }
   get PASSWORD():FormControl{
    return this.registerform.get('pwd') as FormControl 
   }
   get REPEATPASSWORD():FormControl{
    return this.registerform.get('rpwd') as FormControl 
   }
   register(){

   }

}
