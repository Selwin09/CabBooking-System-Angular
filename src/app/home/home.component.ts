import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  showDiscountMessage = false;


  ngOnInit(): void {
    setTimeout(() => {
      this.showDiscountMessage = true;

      setTimeout(() => {
        this.showDiscountMessage = false;
      }, 5000);
    }, 3000);
 }


}
