import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart, Category, Payment, PaymentMethod, Product, User } from './models/models';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  baseurl='https://localhost:7223/api/Shopping/';
  updateCartItems=new Subject();
  constructor(private http:HttpClient,private jwt:JwtHelperService) {

   }
   applyDiscount(price:number,discount:number):number{
    let finalPrice:number=price-price*(discount/100);
    return finalPrice;
   }
   getCategoryList():Observable<Category[]>{
  let url = this.baseurl + 'GetProductsCategories';
  return this.http.get<any[]>(url).pipe(map(categories=>categories.map(category => {
      let mappedCategory: Category = {
        id: category.id,
        category: category.category,
        subCategory: category.subCategory,
      };
      return mappedCategory;
    }))
  ); 
}
getProducts(category:string,subcategory:string,count:number){
  return this.http.get<any[]>(this.baseurl+'GetProducts',
    {
    params:new HttpParams().set('category',category)
    .set('subcategory',subcategory)
    .set('count',count)
  });

}
getproductById(id:number){
  let url=this.baseurl+'GetProductById/'+id
 return this.http.get<any>(url);
}
createUser(user:User){
 let url=this.baseurl+'RegisterUser';
 return this.http.post(url,user,{responseType:'text'});
}
ValidateLoginandToken(email:string,password:string){
   let url=this.baseurl+'LoginUser';
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );

}
setToken(token:string){
localStorage.setItem('user',token);
}
public isLogin(){
  return localStorage.getItem('user')?true:false;
}
public Logout(){
  localStorage.removeItem('user');
}
getUser():User{
  let token=this.jwt.decodeToken();
  let user:User={
    id:token.id,
    firstName:token.FirstName,
    lastName:token.LastName,
    email:token.Email,
    address:'',
    createdAt:'',
    mobile:'',
    modifiedAt:'',
    password:''
  }
  return user;
}
submtReview(userid:number,productid:number,review:string){
  let url=this.baseurl+'Review'
  let obj:any={
    User:{
    Id:userid,
  },
  Product:{
    Id:productid,
  },
  Value:review,
  };
  return this.http.post(url,obj,{responseType:'text'})

}
GetReviews(id:number){
  return this.http.get(this.baseurl+'GetReviews/'+id);
}
cartItemsUpdate(product:Product){
  let uid=this.getUser().id;
  let productid=product.id
  this.InsertCart(uid,productid).subscribe((res:any)=>{
    this.updateCartItems.next(1);
  });
}
InsertCart(userId:number,prodictId:number){
  let url=this.baseurl+'InsertCart/'+userId+'/'+prodictId;
  return this.http.post(url,null,{responseType:'text'});
}
GetCurrentCartItem(userId:number){
let url=this.baseurl+'GetActiveCart/'+userId;
return this.http.get<any>(url);
}

calculatePayment(cart:Cart,payment:Payment){
  payment.totalAmount=0;
  payment.amountPaid=0;
  payment.amountReduced=0;
  for(let items of cart.cartItems){
    payment.totalAmount+=items.product.price;
    payment.amountReduced+=items.product.price-this.applyDiscount(items.product.price,items.product.offer.discount);
    payment.amountPaid+=this.applyDiscount(items.product.price,items.product.offer.discount);


  }
  if(payment.amountPaid>50000){
    payment.shipingCharges=2000
  }
  else{
    payment.shipingCharges=500
  }

}
getAllPreviousCart(userId:number){
  let url=this.baseurl+'GetAllPreviousCartsofUser/'+userId;
  return this.http.get(url);
}
calculatePricePaid(cart:Cart){
  let pricepaid=0;
  for(let cartItem of cart.cartItems){
    pricepaid+=this.applyDiscount(cartItem.product.price,cartItem.product.offer.discount)
  }
  return pricepaid;
}
GetAllPaymentMethods(){
  let url=this.baseurl+'GetAllPaymentMethods';
  return this.http.get<PaymentMethod[]>(url);
}
}
