import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  link: string = "assets/images/facebook.png";
  loginBtn: HTMLElement | null = null;
  isDisabled: boolean = true;
  oEye: HTMLElement | null = null;
  cEye: HTMLElement | null = null;
  eye: NodeListOf<HTMLInputElement> | null = null;
  up: NodeListOf<HTMLInputElement> | null = null;

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void{
    this.oEye = this.document.getElementById('o-eyeball');
    this.cEye = this.document.getElementById('c-eyeball');
    this.inputListener();
  }
  // navigateToPath() {
  //   this.router.navigate(['/path'])
  // }

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
}
