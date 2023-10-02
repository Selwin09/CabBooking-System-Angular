import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  public adminForm !: FormGroup;

  constructor(private router: Router, private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      username:[''],
      password:['']

    })
  }

  login(): void {
    const validUsername = environment.validUsername;
    const validPassword = environment.validPassword;

    if (this.username === validUsername && this.password === validPassword) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password. Please try again.';
    }
  }

}






