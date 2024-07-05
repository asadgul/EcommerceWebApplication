import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataAccessService } from '../data-access.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

   view:'grid' |'list'='grid';
   sortby:'default' |'htl' |'lth'='default'
   products:Product[]=[]

  constructor(private activateroute:ActivatedRoute,
    private dataacces:DataAccessService
  ) { }

  ngOnInit(): void {
    this.activateroute.queryParams.subscribe((params:any)=>{
      let category=params.category
      let subcategory=params.subCategory;
      if(category && subcategory){
        this.dataacces.getProducts(category,subcategory,10).subscribe((res:any)=>{
          this.products=res;
          console.log('products are'+this.products);
        });
      }
    });
  }
  sortByPrice(sortKey:string){
    this.products.sort((a,b)=>{
      if(sortKey==='default'){
        return a.id>b.id ?1:-1;
      }
  if(sortKey==='htl'){
 return this.dataacces.applyDiscount(a.price,a.offer.discount)> 
  this.dataacces.applyDiscount(b.price,b.offer.discount)
  ?-1:1;
  }
if(sortKey==='lth'){  
  return this.dataacces.applyDiscount(a.price,a.offer.discount)> 
this.dataacces.applyDiscount(b.price,b.offer.discount)
?1:-1;
}
return 0;
    });
  }
}
