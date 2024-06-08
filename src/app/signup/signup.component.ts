import { Component } from '@angular/core';
import { CognitoService } from '../cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private service: CognitoService, private router: Router) { }

  singup(username: string, password: string, email: string, name: string, surname: string){
    this.service.userSignUp(username, password, email, name, surname).then(() => {
      this.router.navigateByUrl("/signin")
    }).catch((err) => {
      alert(err)
    })
  }
}
