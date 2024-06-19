import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Category, NavigationItem } from '../models/models';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('modaltitle') modaltitle!:ElementRef;
  @ViewChild('container',{read:ViewContainerRef,static:true})
  container!:ViewContainerRef;
  navigationList:NavigationItem[]=[];
  cartItems:number=0;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    public dataservice:DataAccessService

  ) { }

  ngOnInit() {
    this.dataservice.getCategoryList().subscribe((list:Category[])=>{
      for(let item of list){
        let present=false;
        for(let navItem of this.navigationList){
          if(navItem.category===item.category){
            navItem.subcategories.push(item.subCategory)
            present=true;
          }
        }
        if(!present){
          this.navigationList.push({
            category:item.category,
            subcategories:[item.subCategory]

          });
        }
      }

    });
    if(this.dataservice.isLogin()){
      this.dataservice.GetCurrentCartItem(this.dataservice.getUser().id).subscribe((res:any)=>{
        this.cartItems=res.cartItems.length
      });
    }
    this.dataservice.updateCartItems.subscribe((res:any)=>{
      this.cartItems+=res
    });

  }
  openContainer(name:string){
    let componentFactory:any;
    if(name==='login'){
      this.modaltitle.nativeElement.textContent='Enter Login Information'
     componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoginComponent);
    }
    if(name==='register'){
      this.modaltitle.nativeElement.textContent='Enter Register Information'
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(RegisterComponent);
     }
    this.container.clear();
    this.container.createComponent(componentFactory)

  }

}
