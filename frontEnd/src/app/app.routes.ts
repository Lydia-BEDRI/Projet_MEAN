import {Routes} from '@angular/router';
import {PropertyListComponent} from "./property-list/property-list.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BookingComponent} from "./dashboard/booking/booking.component";
import {canActivate, canActivateChild} from "./_guards/auth.guard";
import {ReservationListComponent} from "./dashboard/reservation-list/reservation-list.component";

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            {path: 'properties', component: PropertyListComponent},
            {path: 'properties/:id', component: PropertyDetailComponent},
            {path: 'search', component: PropertyListComponent},
            {path: '', redirectTo: "properties", pathMatch: "full"},
            {path: "**", redirectTo: "properties", pathMatch: "full"}
        ]
    },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [canActivate],canActivateChild:[canActivateChild],
        children: [
            {path: 'book', component: BookingComponent},
            {path: 'bookings', component: ReservationListComponent},
            {path: '', redirectTo: "bookings", pathMatch: "full"},
            {path: "**", redirectTo: "bookings", pathMatch: "full"}
        ]
    },
    {path: 'login', component: ConnexionComponent},
    {path: 'dashboard', component: DashboardComponent},

    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "**", redirectTo: "/home", pathMatch: "full"}
];
