import {Component, OnInit, signal} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {AuthentificationService} from "../../services/authentification.service";
import {NgForOf} from "@angular/common";
import {MyDatePipe} from "../../pipes/myDate.pipe";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {SliderModule} from "primeng/slider";
import {InputTextModule} from "primeng/inputtext";
import Swal from "sweetalert2";

@Component({
    selector: 'app-reservation-list',
    standalone: true,
    imports: [
        NgForOf,
        MyDatePipe,
        RatingModule,
        FormsModule,
        ButtonModule,
        DialogModule,
        SliderModule,
        InputTextModule,

    ],
    templateUrl: './reservation-list.component.html',
    styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent implements OnInit {

    bookings!: any[];
    avis: any = 5;
    idLocation: any;
    Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    constructor(private locationService: LocationService, private authService: AuthentificationService) {
    }

    ngOnInit(): void {
        this.getBookingList()
    }

    getBookingList() {

        let user: any = this.authService.getUser();
        this.locationService.getBookingList(user.mail).subscribe(data => {
            {
                this.bookings = (data as [])
            }
        })

    }

    addRating() {
        this.locationService.updateAvis(this.idLocation, this.avis).subscribe(res => {
            this.Toast.fire({
                icon: 'success',
                title: 'Merci!',
                timer: 3000
            }).then(
                void this.getBookingList()
            )

        }, error => {
            this.Toast.fire({
                icon: 'error',
                title: 'Something wrong',
                timer: 3000
            })
        })
    }

    valueChanged(value: any) {
        this.avis = value.target.value;
    }

    getIdLocations(idLocation: any) {
        this.idLocation = idLocation
    }
}
