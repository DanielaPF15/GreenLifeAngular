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


const routesApp: Routes = [
  {path: '', component: HomeComponent },
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'create-project',canActivate: [AuthGuard], data:{only: 'Admin'}, component: CreateProjectComponent},
  {path: 'list-project',canActivate: [AuthGuard], component:ListProjectComponent},
  {path: 'create-donation',canActivate: [AuthGuard], data:{only: 'Voluntario'}, component:CreateDonationComponent},
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
    CreateDonationComponent
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
