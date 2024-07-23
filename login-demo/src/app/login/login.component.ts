import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{
  login: FormGroup;
  loginBtn: HTMLElement | null = null;
  isDisabled: boolean = true;
  oEye: HTMLElement | null = null;
  cEye: HTMLElement | null = null;
  eye: NodeListOf<HTMLInputElement> | null = null;
  up: NodeListOf<HTMLInputElement> | null = null;
  link: string = "assets/images/facebook.png";
  

  constructor(
    private router: Router, 
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private authService: AuthService
  ) { 
    this.login = this.fb.group({
      uzr: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void{
    this.oEye = this.document.getElementById('o-eyeball');
    this.cEye = this.document.getElementById('c-eyeball');
    this.inputListener();
  }

  toggleEyeballs(): void{
    if(this.cEye && this.oEye){
      if(this.cEye.style.display === 'none'){
        this.cEye.style.display = 'block';
        this.oEye.style.display = "none";
      }else{
        this.cEye.style.display = 'none';
        this.oEye.style.display = "block";
      }
    }
  }

  togglePassword(e: Event): void{
    e.preventDefault();
    this.eye = this.document.getElementsByName('password') as NodeListOf<HTMLInputElement>;
    this.eye.forEach((element: HTMLInputElement) => {
      element.type = element.type === 'password' ? "text" : "password";
      this.toggleEyeballs();
    })
  }

  inputListener(): void{
    this.up = this.document.querySelectorAll('form input') as NodeListOf<HTMLInputElement>;
    this.isDisabled = Array.from(this.up).some((element) => !element.value.trim())
  }

  onSubmit(): void {
    console.log('submit', this.login.value);
    if (this.login.valid) {
      this.authService.login(this.login.value).subscribe(
        (response) => {
          // Handle successful login
          console.log('response ', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Handle login error
          console.error('Login error', error);
        }
      );
    }
  }

}
