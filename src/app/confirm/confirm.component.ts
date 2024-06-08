import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

  constructor(private service: CognitoService, private router: Router) { }

  confirm(username: string, code: string) { 
    this.service.userConfirm(username, code).then(() => {
      this.router.navigateByUrl("/home")
      alert("Codice corretto")
    }).catch((err) => {
      alert(err)
    })
  }

}
