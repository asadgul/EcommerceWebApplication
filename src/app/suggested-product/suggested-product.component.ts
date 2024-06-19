import { Component, OnInit,Input } from '@angular/core';
import { Category, Product } from '../models/models';
import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-suggested-product',
  templateUrl: './suggested-product.component.html',
  styleUrls: ['./suggested-product.component.scss']
})
export class SuggestedProductComponent implements OnInit {

  @Input() category:Category={
    id:0,
    category:'',
    subCategory:''
  }
  @Input() count:number=3;
  products:Product[]=[]
  constructor(private dataser:DataAccessService ) { }

  ngOnInit(): void {
    this.dataser.getProducts(
      this.category.category,
      this.category.subCategory,
      this.count
    ).subscribe((list:any[])=>{
      for(let item of list){
        this.products.push(item);
      }
      

    });

  }

}
