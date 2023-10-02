import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private availableTaxis: { [location: string]: number } = {
    'Coimbatore' : environment.Coimbatore,
    'Pollachi': environment.Pollachi,
    'Kinathukadavu': environment.Kinathukadavu,
    'Udumalpet': environment.Udumalpet,
    'Palani': environment.Palani,
    'Valparai': environment.Valparai,
    'Thirupur': environment.Thirupur,
    'Palakad': environment.Palakad
  };
  bookingHistory: any;

  constructor(private http: HttpClient) {}

  calculateFare(pickupLocation: string, dropoffLocation: string, passengerCount: number): number {
    const distanceInKm = this.calculateDistance(pickupLocation, dropoffLocation);
    const farePerKm = environment.farePerKm;
    console.log('Distance (in km):', distanceInKm);
    console.log('Fare per km:', farePerKm);
    console.log('Passenger count:', passengerCount);
    const estimatedFare = distanceInKm * farePerKm * passengerCount;

    if (!this.isTaxisAvailable(pickupLocation)) {
      console.log('No taxis available for pickup location: ' + pickupLocation);
      return -1;
    }

    return estimatedFare;
  }

  isTaxisAvailable(location: string): boolean {
    const availableTaxisCount = this.availableTaxis[location];
    return availableTaxisCount > 0;
  }

  calculateDistance(pickupLocation: string, dropoffLocation: string): number {
    const pickupCoordinates = environment.pickupCoordinates;
    const dropoffCoordinates = environment.dropoffCoordinates;

    const earthRadiusKm = environment.earthRadiusKm;

    const pickupLatRad = this.degreesToRadians(pickupCoordinates.lat);
    const pickupLonRad = this.degreesToRadians(pickupCoordinates.lon);
    const dropoffLatRad = this.degreesToRadians(dropoffCoordinates.lat);
    const dropoffLonRad = this.degreesToRadians(dropoffCoordinates.lon);

    const latDiff = dropoffLatRad - pickupLatRad;
    const lonDiff = dropoffLonRad - pickupLonRad;

    const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
              Math.cos(pickupLatRad) * Math.cos(dropoffLatRad) *
              Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = earthRadiusKm * c;
    return distanceInKm;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }


  private apiUrl = environment.bookings;

  getBookingHistory() {
    return this.http.get<any[]>(this.apiUrl);
  }
  bookTaxi(pickupLocation: string): boolean {
    if (this.availableTaxis[pickupLocation] > 0) {
      this.availableTaxis[pickupLocation]--;
      return true;
    } else {
      return false;
    }
  }

  cancelTaxi(pickupLocation: string): void {
    this.availableTaxis[pickupLocation]++;
  }


  getTotalBookingsCount(): number {
    const uniqueBookingIds = new Set(this.getBookingIds());
    return uniqueBookingIds.size;
  }

  private getBookingIds(): number[] {
    return this.bookingHistory.map((booking: { id: any; }) => booking.id);
  }


}
