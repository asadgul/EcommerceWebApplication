import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[OpenProductDetails]'
})
export class ProductDetailsDirective {

  @Input() productId:number=0;

  @HostListener('click') openprodcutdetails(){
    window.scrollTo(0,0);
    this.router.navigate(['product-details'],{
      queryParams:{
        id:this.productId
      },

    })
  }
  constructor(private router:Router) { }

}
