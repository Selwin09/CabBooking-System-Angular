import { Component,OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  bookingHistory: any[] = [];

  estimatedFare: number | undefined;


  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    // this.bookingService.getBookingHistory().subscribe((alldata: any[]) => {
    //   this.bookingHistory = alldata;
      this.fetchBookingHistory();


  }

  calculateFare(pickupLocation: string, dropoffLocation: string, passengerCount: number): void {
    this.estimatedFare = this.bookingService.calculateFare(pickupLocation, dropoffLocation, passengerCount);
  }

  fetchBookingHistory(): void {
    this.bookingService.getBookingHistory().subscribe(
      (bookingHistoryData: any[]) => {
        this.bookingHistory = bookingHistoryData;
      },
      (error) => {
        console.log('Error fetching booking history:', error);
      }
    );
  }


}
