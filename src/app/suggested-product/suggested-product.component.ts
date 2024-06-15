import { Component, OnInit,Input } from '@angular/core';
import { Category } from '../models/models';

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
  constructor() { }

  ngOnInit(): void {
  }

}
