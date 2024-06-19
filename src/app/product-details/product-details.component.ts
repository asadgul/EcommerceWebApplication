import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataAccessService } from '../data-access.service';
import { Product, Review } from '../models/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  imageIndex:number=1;
 public product!:Product;
status:boolean=false;  
otherreviews:Review[]=[];
cartItem:number=0;
reviewControl=new FormControl('');
  constructor(private activateroute:ActivatedRoute,
    public dataacceser:DataAccessService
  ) {
   }

  ngOnInit(): void {
    this.activateroute.queryParams.subscribe((params:any)=>{
      let id=params.id;      
      this.dataacceser.getproductById(id).subscribe((res:Product)=>{
        this.product=res;
        this.FetchAllReviews();
        this.reviewControl.setValue('');

      });
    });
  }
  submitReview(){
    let review=this.reviewControl.value;
    if(review===''||review===null){
      return;
    }
    let userid=this.dataacceser.getUser().id;
    let productid=this.product.id;
    this.dataacceser.submtReview(userid,productid,review).subscribe((res:any)=>{
      if(res==='Inserted'){
        this.status=true
        this.FetchAllReviews();
      
      }
    });
  }
  FetchAllReviews(){
    this.otherreviews=[];
    this.dataacceser.GetReviews(this.product.id).subscribe((res:any)=>{
      for(let item of res){
        this.otherreviews.push(item);
      }
      console.log(this.otherreviews);
    });

  }
  UpdateCartItems(){
    this.dataacceser.updateCartItems.subscribe((res:any)=>{
      this.cartItem+=res
    });
  }
}
