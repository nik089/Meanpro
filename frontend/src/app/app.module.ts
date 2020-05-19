import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { SliderComponent } from './pages/slider/slider.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MainComponent } from './pages/main/main.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { SignComponent } from './pages/sign/sign.component';
import { CategorycomponentComponent } from './pages/categorycomponent/categorycomponent.component';
import { CartComponent } from './pages/cart/cart.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SearchComponent } from './pages/search/search.component';
import { ProductdetailsComponent } from './pages/productdetails/productdetails.component';
import { ProductpricefilterComponent } from './pages/productpricefilter/productpricefilter.component';
import { Ng5SliderModule } from 'ng5-slider';
import { PlaceorderComponent } from './pages/placeorder/placeorder.component';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('821111924126-tcefvq769ea7o0q77l91vm8o9fc2fft7.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('229383051466001')
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    MainComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    RegisterComponent,
    SignComponent,
    CategorycomponentComponent,
    CartComponent,
    SearchComponent,
    ProductdetailsComponent,
    ProductpricefilterComponent,
    PlaceorderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SocialLoginModule, FormsModule, ReactiveFormsModule, Ng5SliderModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
