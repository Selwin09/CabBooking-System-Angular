import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BookATaxiComponent } from './book-a-taxi/book-a-taxi.component';
import { AdminComponent } from './admin/admin.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';

const routes: Routes = [
  {path:'about-us', component:AboutUsComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'home', component:HomeComponent},
  {path:'', component:HomeComponent},
  {path:'Terms-of-service', component:TermsOfServiceComponent},
  {path:'Privacy-Policy', component:PrivacyPolicyComponent},
  {path:'contact-Us', component:ContactUsComponent},
  {path:'book', component:BookATaxiComponent},
  {path:'admin', component:AdminComponent},
  {path:'booking', component:BookingDetailsComponent},
  {path: '', component: BookATaxiComponent },
  {path:'payment', component:PaymentComponent},
  {path:'cash', component:CashPaymentComponent},
  {path:'dashboard', component:AdminDashboardComponent},
  {path:'analytics', component:AnalyticsComponent},
  {path:'success', component:SuccessPaymentComponent},
  {path:'successful', component:PaymentSuccessfulComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
