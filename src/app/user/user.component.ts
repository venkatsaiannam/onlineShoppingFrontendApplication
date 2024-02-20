import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { response } from 'express';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private userService:UserService){

  }
  

  ngOnInit(){
    this.forUser();
  }
  message:any;

  public forUser(){
    this.userService.forUser().subscribe(
      (response)=>{
        console.log(response);
        this.message = response;
      }, 
      (error)=>{
        console.log(error);
      }
    )
  }

}
