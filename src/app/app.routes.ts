import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';
import { EmployeeComponent } from './layouts/employee/employee.component';

export const routes: Routes = [

  // auth layouts

  {path:"" , component: AuthComponent , children:[
    {path:"" , redirectTo:"register" , pathMatch:"full" , title:"register"} ,
    {path:"register" , component: RegisterComponent , title:"register"} ,
    {path:"login" , component: LoginComponent , title:"login"}
  ]} ,



  // employee layouts
  {path:"" , component: EmployeeComponent , children :[
    {path:"" , },
    {path:"" , },
    {path:"" , },
    {path:"" , }
  ]}
];
