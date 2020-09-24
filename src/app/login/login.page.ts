import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public signInForm: FormGroup;
  public signInFailed: boolean;
  public userAuth: Subscription;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthService
  ) {
    this.userAuth = this.auth.signedIn.subscribe((user) => {
      if (user) this.navCtrl.navigateForward('pages/home');
  });
  }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(4)]] 
    });
  }

  onSubmit = async (fg: FormGroup) => {
    try {
      this.signInFailed = false;
      if (!fg.valid) throw new Error('Invalid sign-in credentials');
      const result = await this.auth.signIn(fg.value.email, fg.value.password);
      if (result) this.navCtrl.navigateForward('pages/home');
      else throw new Error('Sign-in failed');
    } catch (error) {
      this.signInFailed = true;
    }
  }
}
