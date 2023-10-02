import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { environment } from 'src/environments/environment';
import { LoggerService } from '../logger.service';


@Component({
  selector: 'app-book-a-taxi',
  templateUrl: './book-a-taxi.component.html',
  styleUrls: ['./book-a-taxi.component.css']
})
export class BookATaxiComponent implements OnInit{
  pickupLocation: string | undefined;
  dropoffLocation: string | undefined;
  availableLocations: string[] = environment.availableLocations;
  passengers!: number ;
  maxPassengers: number = environment.maxPassengers;
  errorMessage: string | undefined;
  public bookingForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router, private bookingService: BookingService, private logger: LoggerService) {}

  ngOnInit(){
    this.initBookingForm();
  }

  initBookingForm() {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      pickuplocation:['', Validators.required],
      dropofflocation:['', Validators.required],
      pickupdate:['', Validators.required],
      pickuptime:['', Validators.required],
      passengercount:['', [Validators.required,Validators.min(1), Validators.max(this.maxPassengers)]]
    });
  }


  taxiBooking(){

    const bookingDetails = this.bookingForm.value;

    if (!this.bookingService.isTaxisAvailable(bookingDetails.pickuplocation)) {
      this.errorMessage = 'No taxis available for the selected pickup location.';
      return;
    }

    const estimatedFare = this.bookingService.calculateFare(
      bookingDetails.pickuplocation,
      bookingDetails.dropofflocation,
      bookingDetails.passengercount
    );

    this.logger.log(`'Estimated fare:, ${estimatedFare}'`);


    if (this.bookingForm.invalid) {
      this.errorMessage = 'Please fill in all the required fields.';
      return;
    }

    this.http.post<any>(environment.bookings,this.bookingForm.value)
    .subscribe(res=>{
      this.bookingForm.reset();
      this.router.navigate(['/payment']);
    },err=>{
      alert("Something went Wrong");
      this.logger.error(`Something went Wrong`)
    })


    const isBookingSuccessful = this.bookingService.bookTaxi(bookingDetails.pickuplocation);
    if (isBookingSuccessful) {
      alert('Taxi booked successfully!');
      this.logger.log(`Taxi booked successfully!`)
    } else {
      alert('No taxis available. Please try again later.');
      this.logger.error(`No taxis available. Please try again later.`)
    }

  }
  // bookTaxi() {
  //   if (this.passengers > this.maxPassengers) {
  //     this.errorMessage = "Exceeded maximum passenger limit";
  //   } else {
  //     console.log('Booking taxi with ' + this.passengers + ' passengers');
  //   }
  // }

}
