import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FareService } from '../fare.service';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent implements OnInit {
  paymentForm: FormGroup;
  paymentAmount: number = environment.paymentAmount;
  totalAmount: any;
  cardHolder: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  estimatedFare: number = 0;
  orderMessage: any;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fareService: FareService
  ) {
    this.paymentForm = this.formBuilder.group({
      nameOnCard: ['', [Validators.required, Validators.maxLength(255)]],
      creditCardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      expiryDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2]) / [0-9]{2}')]],
      securityCode: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]],
      zipCode: ['', [Validators.required, Validators.maxLength(10)]],
    });
    this.estimatedFare = this.fareService.estimatedFare;
  }

  ngOnInit(): void {}

  processPayment() {
    if (this.paymentForm.valid) {
      const paymentData = {
        cardHolder: this.cardHolder,
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        cvv: this.cvv,
      };

      this.http.post('http://localhost:3000/payments', paymentData).subscribe(
        (response) => {
          console.log('Payment details saved successfully:', response);
          this.successMessage = 'Payment Successful';
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error saving payment details:', error);
        }
      );
    } else {
      console.log('Form has errors. Please check.');
    }
  }



}
