import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { FareService } from '../fare.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})


export class PaymentComponent implements OnInit {

  bookingDetails: any;
  estimatedFare: number = 0;
  errorMessage: string | undefined;
  public bookingForm!: FormGroup;



  constructor(private router: Router, private bookingService: BookingService, private currencyPipe: CurrencyPipe, private fareService: FareService) {}



  ngOnInit(): void {



    this.bookingService.getBookingHistory().subscribe((data: any) => {
    this.bookingDetails = data[0];
    console.log('bookingDetails:', this.bookingDetails);


    if (this.bookingDetails !== null && this.bookingDetails.passengercount !== undefined) {
      this.estimatedFare = this.calculateEstimatedFare(
        this.bookingDetails.pickuplocation,
        this.bookingDetails.dropofflocation,
        this.bookingDetails.passengercount
      );
      this.fareService.estimatedFare = this.estimatedFare;
    }
    console.log('estimatedFare:', this.estimatedFare);
  });
}

// initBookingForm() {
//   this.bookingForm = this.formBuilder.group({
//     // Define your form controls here
//     // For example:
//     // name: ['', Validators.required],
//     // pickuplocation: ['', Validators.required],
//     // dropofflocation: ['', Validators.required],
//     // pickupdate: ['', Validators.required],
//     // pickuptime: ['', Validators.required],
//     // passengercount: ['', [Validators.required, Validators.min(1), Validators.max(this.maxPassengers)]]
//   });
// }

  calculateEstimatedFare(pickupLocation: string, dropoffLocation: string, passengerCount: number): number {
    console.log('Pickup Location:', pickupLocation);
    console.log('Dropoff Location:', dropoffLocation);
    console.log('Passenger Count:', passengerCount);



    const distanceInKm = this.bookingService.calculateDistance(pickupLocation, dropoffLocation);
    const farePerKm = environment.farePerKm;
    console.log('Distance (in km):', distanceInKm);
    console.log('Fare per km:', farePerKm);
    console.log('Passenger count:', passengerCount);
    const estimatedFare = distanceInKm * farePerKm * passengerCount;

    if (!isNaN(estimatedFare)) {
      return estimatedFare;
    } else {
      return 0;
    }

  }



  confirmPayment() {
    this.router.navigate(['/success']);

  }

  redirectToCashPayment() {
    this.router.navigate(['/cash']);
  }

  cancelBooking() {

      this.errorMessage = '';
      this.router.navigate(['/book']);

    }
  }

