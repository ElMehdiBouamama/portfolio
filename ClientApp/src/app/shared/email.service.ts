import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private _snackBar: MatSnackBar) {
    emailjs.init('user_rhcIlwwRnbiR3iBL7r8nH');
  }

  sendEmail(name: string, email: string, message: string) {
    emailjs.send("portfolio", "template_ppiuxan", {
      from_name: name,
      message: message,
      reply_to: email,
      publicKey: 'user_rhcIlwwRnbiR3iBL7r8nH'
    }).then(
      () => {
        this._snackBar.open('Email Sent!!', '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 1000
        });
      },
      (error) => {
        this._snackBar.open('An Error occured!!', '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 1000
        });
      },
    );
  }
}
