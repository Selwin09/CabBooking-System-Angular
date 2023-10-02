import { NgModule } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BookATaxiComponent } from './book-a-taxi/book-a-taxi.component';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import { AdminComponent } from './admin/admin.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FareEstimateComponent } from './fare-estimate/fare-estimate.component';
import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';


const routes:Routes = [
  {path:'about-us', component:AboutUsComponent},
];

@Pipe({
  name: 'formattedIndianCurrency'
})
export class FormattedIndianCurrencyPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number | string, currencyCode: string): string {
    // if (value === null || isNaN(value)) {
    //   return 'N/A';
    // }
    const formattedValue = this.decimalPipe.transform(value, '1.2-2');
    return currencyCode + ' ' + formattedValue;
  }
}

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    LoginComponent,
    SignupComponent,
    FlashMessageComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    BookATaxiComponent,
    AdminComponent,
    BookingDetailsComponent,
    PaymentComponent,
    AdminDashboardComponent,
    AnalyticsComponent,
    FareEstimateComponent,
    FormattedIndianCurrencyPipe,
    CashPaymentComponent,
    SuccessPaymentComponent,
      PaymentSuccessfulComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [CurrencyPipe,DecimalPipe],

  bootstrap: [AppComponent]
})
export class AppModule { }
