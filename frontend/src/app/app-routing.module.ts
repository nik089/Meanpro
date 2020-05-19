import { PlaceorderComponent } from './pages/placeorder/placeorder.component';
import { ProductdetailsComponent } from './pages/productdetails/productdetails.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategorycomponentComponent } from './pages/categorycomponent/categorycomponent.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SignComponent } from './pages/sign/sign.component';
import { SearchComponent } from './pages/search/search.component';
import { ProductpricefilterComponent } from './pages/productpricefilter/productpricefilter.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'About', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'category/:cname', component: CategorycomponentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sign', component: SignComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search/:ser', component: SearchComponent },
  { path: 'product-details/:pid', component: ProductdetailsComponent },
  { path: 'productpricefilter/:min/:max', component: ProductpricefilterComponent },
  { path: 'myorder', component: PlaceorderComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
