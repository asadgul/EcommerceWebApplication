import { Directive, HostListener, Input } from '@angular/core';
import { Category } from './models/models';
import { Router } from '@angular/router';

@Directive({
  selector: '[OpenProducts]'
})
export class OpenDirectivesDirective {
@Input() category:Category={
  id:0,
  category:'',
  subCategory:''
}
@HostListener('click') openProducts(){
this.router.navigate(['/products'],{
  queryParams:{
    category:this.category.category,
    subCategory:this.category.subCategory
  }
})

}

  constructor(private router:Router) { }

}
