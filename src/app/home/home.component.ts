import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  suggestedpro:SuggestedProduct[]=[
    {
      banerimage:'Baner/Baner_Mobile.png',
      category:{
        id:0,
        category:'Electronics',
        subCategory:'Mobile'
      }
    },
    {
      banerimage:'Baner/Baner_Laptop.png',
      category:{
        id:1,
        category:'Electronics',
        subCategory:'Laptops'
      }
    },
    {
      banerimage:'Baner/Baner_Chair.png',
      category:{
        id:1,
        category:'furniture',
        subCategory:'chairs'
      }
    }


  ];
  constructor() { }

  ngOnInit(): void {
  }

}
