import { Component } from '@angular/core';
import { CognitoService } from '../cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private service: CognitoService, private router: Router){ }

  signin(username: string, password: string){
    this.service.userSingIn(username, password).then(() => {
      this.router.navigateByUrl("/home")
    }).catch((err) => {
      if(err.includes("User is not confirmed")){
        this.router.navigateByUrl("/confirm")
      } else {
        alert(err)
      }
    })
  }
}
