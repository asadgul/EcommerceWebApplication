import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../data-access.service';
import { Cart, Payment } from '../models/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartitems:Cart={
    id:0,
    user:this.dataser.getUser(),
    cartItems:[],
    ordered:false,
    orderedOn:''
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
  userPreviousCart:Cart[]=[];
  constructor(public dataser:DataAccessService ) { }

  ngOnInit(): void {
    this.dataser.GetCurrentCartItem(this.dataser.getUser().id).subscribe((res:any)=>{
      debugger
      this.cartitems=res;

      console.log('cart items are'+this.cartitems)
      this.dataser.calculatePayment(this.cartitems,this.userspayment);
    });
    this.dataser.getAllPreviousCart(this.dataser.getUser().id).subscribe((res:any)=>{
      this.userPreviousCart=res;

    });
    
  }

}
