import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';  
import { FormsModule } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private userService:UserService,
    private userAuthService:UserAuthService,
    private router:Router
    ){  }

  login(loginForm:NgForm){
    // console.log("form is submitted");
    // console.log(loginForm.value);

    this.userService.login(loginForm.value).subscribe(
      (response:any) =>{
        // console.log(response.jwtToken);
        // console.log(response.user.role)

        this.userAuthService.setRoles(response.user.role)
        this.userAuthService.setToken(response.jwtToken)

        const role = response.user.role[0].roleName;
        console.log(role)
        if(role==='Admin'){
          this.router.navigate(['/admin']);
        }
        else{
          this.router.navigate(['/user']);
        }
      },
      (error)=>{
        console.log(error);
      }
    )


  }

}
