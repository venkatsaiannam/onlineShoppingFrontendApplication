import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  /*public setRoles(roles:[]){
    localStorage.setItem('roles',JSON.stringify(roles));
  }

  public getRoles():string[] | null{
    // const rolesString = localStorage.getItem('roles');
    // if (rolesString === null) {
    //   return null; // or handle the null case appropriately based on your application logic
    // }
    return JSON.parse(localStorage.getItem('roles'));
  }*/

  public setRoles(roles: any[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
}

public getRoles(): any[] | null {
    const rolesString: string | null = localStorage.getItem('roles');

    if (rolesString === null) {
        return null; // Handle the null case appropriately based on your application logic
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

  public isAdmin(): boolean {
    const roles: any = this.getRoles();
    if (roles != null)
      return roles[0].roleName === 'Admin';
    return false
  }
  public isUser(): boolean {
    const roles: any = this.getRoles();
    if (roles != null)
      return roles[0].roleName === 'User';
    return false
  }
}
