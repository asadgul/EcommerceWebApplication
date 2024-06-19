import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/models';
import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerform!:FormGroup;
  isinvalidpassword:boolean=false;
  createuser:boolean=false;
  message:string='';

  constructor(private fb:FormBuilder,private dataacces:DataAccessService) { }

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
   registerUser(){
    let user:User={
      id:0,
      email:this.EMAIL.value,
      address:'',
      firstName:this.FIRSTNAME.value,
      password:this.PASSWORD.value,
      createdAt:'',
      modifiedAt:'',
      mobile:'1234567',
      lastName:this.LASTNAME.value
    }
    this.dataacces.createUser(user).subscribe((res:any)=>{
      debugger;
      if(res=="true"){
        this.message='Account Created'
      }
      else{
        this.message='Account already exist .Try with other email'
      }
      console.log(res);
    })
    

   }

}
