import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem('roles',JSON.stringify(roles));
  }

  public getRoles():string[] | null{
    const rolesString = localStorage.getItem('roles');
    if (rolesString === null) {
      return null; // or handle the null case appropriately based on your application logic
    }
    return JSON.parse(rolesString);
  }

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken() : string | null{
    return localStorage.getItem('jwtToken');
  }

  public clear(){
    localStorage.clear()
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

}
