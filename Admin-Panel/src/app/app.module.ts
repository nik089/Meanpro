import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { ChangepassComponent } from './pages/dashboard/changepass/changepass.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddcategoryComponent } from './pages/category/addcategory/addcategory.component';
import { ProductComponent } from './pages/product/product.component';
import { AddproductComponent } from './pages/product/addproduct/addproduct.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ChangepassComponent,
    CategoryComponent,
    AddcategoryComponent,
    ProductComponent,
    AddproductComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
