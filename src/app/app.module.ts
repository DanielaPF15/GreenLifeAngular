import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './Components/menu/menu.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginComponent } from './Components/login/login.component';
import { CreateProjectComponent } from './Components/create-project/create-project.component';
import { ListProjectComponent } from './Components/list-project/list-project.component';
import { CreateDonationComponent } from './Components/create-donation/create-donation.component';
import { AuthGuard} from './Guards/auth.guard';
import { CreateCategoryComponent } from './Components/create-category/create-category.component';
import { CreateExperiencesComponent } from './Components/create-experiences/create-experiences.component';
import { CreateNewsletterComponent } from './Components/create-newsletter/create-newsletter.component';
import { ListNewsletterComponent } from './Components/list-newsletter/list-newsletter.component';
import { ListUserComponent } from './Components/list-user/list-user.component';
import { UpdateUserComponent } from './Components/update-user/update-user.component';




const routesApp: Routes = [
  {path: '', component: HomeComponent },
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login' , component: LoginComponent},
  
  {path: 'create-project', canActivate: [AuthGuard], component: CreateProjectComponent},
  {path: 'list-project', canActivate: [AuthGuard], component:ListProjectComponent},
  {path: 'create-donation', canActivate: [AuthGuard], data:{only: 'Voluntario'}, component:CreateDonationComponent},
  {path: 'create-category', canActivate: [AuthGuard], data: {only: 'Admin'}, component: CreateCategoryComponent },
  {path: 'create-experiences', canActivate: [AuthGuard], data: {only: 'Voluntario'}, component: CreateExperiencesComponent },
  {path: 'create-newsletter', canActivate: [AuthGuard],data: {only: 'Admin'}, component: CreateNewsletterComponent},
  {path: 'list-newsletter', canActivate: [AuthGuard],data: {only: 'Admin'}, component: ListNewsletterComponent},
  {path: 'list-user' ,  canActivate: [AuthGuard],data: {only: 'Admin'}, component: ListUserComponent},
  {path: 'update-user/:id' ,  canActivate: [AuthGuard],data: {only: 'Admin'}, component: UpdateUserComponent},

]
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    CreateProjectComponent,
    ListProjectComponent,
    CreateDonationComponent,
    CreateCategoryComponent,
    CreateExperiencesComponent,
    CreateNewsletterComponent,
    ListNewsletterComponent,
    ListUserComponent,
    UpdateUserComponent


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routesApp),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
