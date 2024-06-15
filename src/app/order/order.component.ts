import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  selectedMethodName:string='a';
  selectedPaymentMethod=new FormControl('0');
  constructor() { }

  ngOnInit(): void {
    this.selectedPaymentMethod.valueChanges.subscribe((res:any)=>{
      if(res==='0'){
        this.selectedMethodName=''
      }
      else{
        this.selectedMethodName=res.toString();
        
      }

    });
  }

}
