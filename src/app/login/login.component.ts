import { HttpClient } from '@angular/common/http';
import { Component,NgModule,OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoggerService } from '../logger.service';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router, private logger : LoggerService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^\\w+([-+.\\w])*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]]
    });

  }
  login(){

    this.http.get<any>(environment.login)
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success!");
        this.logger.log(`Login Success!`)

        this.loginForm.reset();
        this.router.navigate(['home'])
      } else {
        alert("User not found!");
        this.logger.error(`User not found`)

      }
    },err=>{
      alert("Something went wrong!")
      this.logger.error(`Something went wrong!`)
    })

  }


}





