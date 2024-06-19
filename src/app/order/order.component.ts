import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataAccessService } from '../data-access.service';
import { Cart, Payment, PaymentMethod } from '../models/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  selectedMethodName:string='a';
  selectedPaymentMethod=new FormControl('0');
  paymentmethod:PaymentMethod[]=[];
  usersCart:Cart={
    id:0,
    user:this.dataser.getUser(),
    ordered:false,
    orderedOn:'',
    cartItems:[]
  }
  userspayment:Payment={
    id:0,
    user:this.dataser.getUser(),
    paymentMethod:{
      id:0,
      type:'',
      provider:'',
      available:false,
      reason:''

    },
    totalAmount:0,
    shipingCharges:0,
    amountReduced:0,
    amountPaid:0,
    createdAt:''
  }
  constructor(private dataser:DataAccessService) { }

  ngOnInit(): void {
    this.dataser.GetAllPaymentMethods().subscribe((res:any)=>{
      this.paymentmethod=res;
    });
    this.dataser.GetCurrentCartItem(this.dataser.getUser().id).subscribe((res:any)=>{
      this.usersCart=res;
      this.dataser.calculatePayment(res,this.userspayment)
    });
    this.selectedPaymentMethod.valueChanges.subscribe((res:any)=>{
      if(res==='0'){
        this.selectedMethodName=''
      }
      else{
        this.selectedMethodName=res.toString();
        
      }

    });
  }
  getpaymentmethodname(id:string){
    let x=this.paymentmethod.find((v)=>v.id===parseInt(id));
    return x?.type+'-'+x?.provider;

  }

}
