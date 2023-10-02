import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  totalBookings: number = environment.totalBookings;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchTotalBookingsCount();
  }

  fetchTotalBookingsCount(): void {
    this.totalBookings = this.bookingService.getTotalBookingsCount();
  }
}
