import { CommonModule } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


   // injection service here to ude in the ts file

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _ToastrService = inject(ToastrService);

  // register form
  registerForm: FormGroup = this._FormBuilder.group({
    userName: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    role: [null, [Validators.required]],
  });

  // Ninja Tracker State
  currentStep: number = 1;
  // Use a simple boolean to track password visibility
  isPasswordVisible: boolean = false;
  // Simple audio object
  private jumpSound = new Audio('assets/sounds/notification-jump.wav');

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  setStep(step: number): void {
    if (this.currentStep !== step) {
      this.currentStep = step;
      this.playSound(); // Ensure sound plays on step change
    }
  }

  playSound(): void {
    // Reset time to allow rapid re-playing
    this.jumpSound.currentTime = 0;
    this.jumpSound
      .play()
      .catch((err) => console.error('Audio play failed', err));
  }

  isCompleted(step: number): boolean {
    return this.currentStep > step;
  }

  get progressWidth(): string {
    // Calculates percentage: 0%, 33%, 66%, 100%
    return ((this.currentStep - 1) / 3) * 100 + '%';
  }



  // register method to send data to backend
  registerSubmit() {
    if (this.registerForm.valid) {
      this._AuthService.Register(this.registerForm.value).subscribe({
        next: (res) => {

          if (res.data.role === "Employee") {

            this._Router.navigate(['/login']) ;
            this._ToastrService.success(res.message , "Employee System") ;

          } else if (res.data.role === "Manager") {
             this._Router.navigate(['/login']) ;
            this._ToastrService.success(res.message , "Employee System") ;

          } else if (res.data.role === "Admin") {
             this._Router.navigate(['/login']) ;
            this._ToastrService.success(res.message , "Employee System") ;
          }
        },


      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  goToLogin() {
    this._Router.navigate(['/login']);
  }

}
