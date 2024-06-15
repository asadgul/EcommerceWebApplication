import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationItem } from '../models/models';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('modaltitle') modaltitle!:ElementRef;
  @ViewChild('container',{read:ViewContainerRef,static:true})
  container!:ViewContainerRef;
  navigationList:NavigationItem[]=[
    {
category:"electronics",
subcategories:["mobile","laptops"]
    },
    {
      category:"furniture",
      subcategories:["chairs","tables"]      
    }
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
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
