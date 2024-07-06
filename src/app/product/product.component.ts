import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../models/models';
import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() view:'grid' | 'list' |'currentcartitem' | 'prevcartitem'='grid';
  @Input() product:Product={
    id:0,
    title:'',
    description:'',
    price:0,
    quantity:0,
    productCategory:{
      id:1,
      category:'',
      subCategory:''
    },
    offer:{
      id:1,
      title:'',
      discount:0
    },
    imageName:''
  }

  constructor(public dataser:DataAccessService) { 

    
  }

  ngOnInit(): void {
    console.log(this.product.productCategory.subCategory)
    console.log(this.product.id)

  }

}
