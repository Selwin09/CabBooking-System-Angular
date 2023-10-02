import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit{
  //bookings: any[] | undefined;

  //constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    //this.loadBookingHistory();
  }

  //loadBookingHistory() {
    // Call the booking service to fetch the booking history
    //this.bookingService.getBookingHistory()
    //.subscribe(
    //  (response: any[]) => {
    //  this.bookings = response;
    // },
    //(error: any) => {
        //console.error('Error loading booking history:', error);
     // }
    //);
    //}
}
