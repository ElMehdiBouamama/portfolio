import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import content from '../shared/content.json';
import { EmailService } from '../shared/email.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  emailForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(11)]),
    message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)])
  })

  about: { picture: string, name: string, role: string, bio: string, cta: string };
  constructor(private emailService: EmailService) {
    this.about = content.about;
  }

  onSubmit() {
    if (this.emailForm.valid) {
      this.emailService.sendEmail(this.emailForm.controls.name.value ?? "Hacker", this.emailForm.controls.email.value ?? "Hacker@gmail.com", this.emailForm.controls.message.value ?? "Hacker");
    }
  }
}
