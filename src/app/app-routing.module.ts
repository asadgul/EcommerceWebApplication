import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
{path:'home',component:HomeComponent},
{path:'products',component:ProductsComponent},
{path:'product-details',component:ProductDetailsComponent},
{path:'cart',component:CartComponent},
{path:'orders',component:OrderComponent},
{path:'product',component:ProductComponent},
{path:'',redirectTo :'/home',pathMatch:'full'},
{path:'Login',component:LoginComponent},
{path:'Register',component:RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
