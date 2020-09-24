import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public signedIn: Observable<any>;

  constructor( private auth: AngularFireAuth, private fs: AngularFirestore ) {
    this.signedIn = new Observable((subscriber) => {
      this.auth.onAuthStateChanged(subscriber);
    });
  }

  signIn = async(email: string, password: string) => {
    try {
      if (!email || !password) throw new Error('Invalid email and/or password');
      await this.auth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.log('Sign in failed', error);
      return false;
    }
  }

  signOut = async () => {
    try {
      await this.auth.signOut();
      return true;
    } catch (error) {
      console.log('Sign out failed', error);
      return false;
    }
  }
}
