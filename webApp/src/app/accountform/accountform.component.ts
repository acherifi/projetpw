import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { APIToolService } from 'src/services/APIToolService';
import { UserService } from 'src/services/UserService';
import { User } from 'src/services/objects/User';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-accountform',
  templateUrl: './accountform.component.html',
  styleUrls: ['./accountform.component.css']
})
export class AccountformComponent implements OnInit {

  @Input() handlerValidate;
  @Input() handlerCancel;
  nameInputMail = 'email';
  nameInputPwd = 'password';
  nameCreateAccount = 'create account';
  nameConnect = 'connect';
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
      }
    }
  }
  async handlerClickConnect(answerMail, answerPwd) {
    console.log(answerMail, ' : ', answerPwd);
    if (await this.checkValidityEmailAndPassword()) {
      const userExist: User = await this.userService.getUserByMail(answerMail);
      if (userExist !== undefined && await userExist.getPassword() === answerPwd) {
        await this.doRedirection(userExist);
      }
    }
  }
  getErrorMessageEmail() {
    return this.emailControl.hasError('required') ? 'You must enter a value' :
        this.emailControl.hasError('email') ? 'Not a valid email' :
            '';
  }
  private async checkValidityEmailAndPassword(): Promise<boolean> {
    return this.emailControl.valid && this.passwordControl.valid;
  }
  private async doRedirection(user: User) {
    await this.userService.setConnectedUser(user);
    this.router.navigateByUrl('app', {skipLocationChange: true});
  }


}
