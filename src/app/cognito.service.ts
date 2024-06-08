import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {


  constructor() { }

  cognitoPool = new CognitoUserPool(environment.congnito)

  userSignUp(username: string, password: string, email: string, name: string, surname: string): Promise<string>{
    
    let mailAttribute = new CognitoUserAttribute({
      Name: "email", 
      Value: email
    })

    let nameAttribute = new CognitoUserAttribute({
      Name: "given_name", 
      Value: name
    })

    let surnameAttribute = new CognitoUserAttribute({
      Name: "family_name", 
      Value: surname
    })

    return new Promise((resolve, reject) => {
      this.cognitoPool.signUp(username, password, [mailAttribute, nameAttribute, surnameAttribute], [], (err, res)=>{
        if (err) reject(err.message)
        else resolve("OK")
      })
    })
  }

  userSingIn(username: string, password: string): Promise<string>{
    let user = new CognitoUser({
      Pool: this.cognitoPool,
      Username: username
    })

    let details = new AuthenticationDetails({ Username: username, Password: password })

    return new Promise ((resolve, reject)=> {
      user.authenticateUser(details, {
        onSuccess: () => { resolve("OK")},
        onFailure: (err) => { reject(err.message)}
      })
    })
  }

  userConfirm(username: string, code: string): Promise<string> {
    let user = new CognitoUser({
      Pool: this.cognitoPool,
      Username: username
    })

    return new Promise((resolve, reject)=>{
      user.confirmRegistration(code, false, (err, result) => {
        if(err) reject(err.message)
        else resolve("OK")
      })
    })
  }
}
