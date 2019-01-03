import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { APIToolService } from 'src/services/APIToolService';
import { UserService } from 'src/services/UserService';
import { User } from 'src/services/objects/User';
import {FormControl, Validators} from '@angular/forms';

enum Error {
  AccountAlreadyExists = 1,
  BadAuthentification = 2,
}
@Component({
  selector: 'app-accountform',
  templateUrl: './accountform.component.html',
  styleUrls: ['./accountform.component.css']
})
/**
 * The component to create an account or to log in
 */
export class AccountformComponent implements OnInit {

  nameInputMail = 'email';
  nameInputPwd = 'password';
  nameCreateAccount = 'create account';
  nameConnect = 'connect';
  errorMessage: Error = 0;

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  emailInput: string;
  userService: UserService;
  constructor(private apiToolService: APIToolService, private location: Location, private router: Router) {
  }

  async ngOnInit() {
    this.userService = await this.apiToolService.getUserService();
  }
  async handlerClickCreate(answerMail, answerPwd) {
    if (await this.checkValidityEmailAndPassword()) {
      const newUser: User = await this.userService.addUser(await new User(answerMail, answerPwd));
      if (newUser !== undefined ) {
        await this.doRedirection(newUser);
      } else {
        this.errorMessage = Error.AccountAlreadyExists;
      }
    }
  }
  async handlerClickConnect(answerMail, answerPwd) {
    console.log(answerMail, ' : ', answerPwd);
    if (await this.checkValidityEmailAndPassword()) {
      const userExist: User = await this.userService.getUserByMail(answerMail);
      if (userExist !== undefined && await userExist.getPassword() === answerPwd) {
        await this.doRedirection(userExist);
      } else {
        this.errorMessage = Error.BadAuthentification;
      }
    }
  }
  getErrorMessageEmail() {
    return this.emailControl.hasError('required') ? 'You must enter a value' :
        this.emailControl.hasError('email') ? 'Not a valid email' :
            '';
  }
  getErrorMessagePassword() {
    return this.passwordControl.hasError('required') ? 'You must enter a password' : '';
  }
  getErrorMessageInvalid() {
    let res = '';
    switch (this.errorMessage) {
      case Error.AccountAlreadyExists:
        res = 'Account already exists';
        break;
      case Error.BadAuthentification:
        res = 'Bad email or password';
        break;
    }
    return res;
  }
  private async checkValidityEmailAndPassword(): Promise<boolean> {
    return this.emailControl.valid && this.passwordControl.valid;
  }
  private async doRedirection(user: User) {
    await this.userService.setConnectedUser(user);
    this.router.navigateByUrl('app', {skipLocationChange: true});
  }
}
