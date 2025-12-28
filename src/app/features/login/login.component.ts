import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {




    private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService) ;

  // Login form
  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
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
    // Calculates percentage for 2 steps:
    // Step 1: 0%
    // Step 2: 100%
    return ((this.currentStep - 1) / 1) * 100 + '%';
  }

  // Login method to send data to backend
  loginSubmit() {
    if (this.loginForm.valid) {
      this._AuthService.Login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          // Navigate to dashboard or home after successful login if needed
          // this._Router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }



}
