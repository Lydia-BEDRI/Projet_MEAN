import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DecimalPipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Bien} from "../../../../types";
import {FormsModule} from "@angular/forms";
import {LocationService} from "../../services/location.service";
import {RatingModule} from "primeng/rating";
import Swal from "sweetalert2";
import {AuthentificationService} from "../../services/authentification.service";

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [
        CurrencyPipe,
        RouterLink,
        FormsModule,
        DecimalPipe,
        RatingModule
    ],
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {

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

    constructor(private router: Router, private locationService: LocationService, private authService: AuthentificationService) {

    }


    ngOnInit(): void {
        this.getSelectedProp()
    }

    bien!: Bien;
    storage: Storage = localStorage;
    reservation: any = {};

    getSelectedProp() {
        this.bien = JSON.parse(this.storage.getItem("bien") ?? "");
    }

    book() {
        let user: any = this.authService.getUser();
        if (this.reservation.dateDebutLocation !== undefined && !this.reservation.dateFinLocation !== undefined) {

            if (this.reservation.dateDebutLocation < this.reservation.dateFinLocation) {
                this.reservation.mailLoueur = user.mail
                this.reservation.idBien = this.bien.idBien
                this.locationService.book(this.reservation).subscribe(
                    () => {
                        this.storage.removeItem("bien");
                        this.Toast.fire({
                            icon: 'success',
                            title: 'Reservation added successfully',
                            timer: 2000
                        }).then(
                            void this.router.navigate(["dashboard/bookings"])
                        )
                    },
                    err => {
                        this.Toast.fire({
                            icon: 'error',
                            title: 'Deja reserver',
                            timer: 3000
                        })
                    }
                )
            } else {
                this.Toast.fire({
                    icon: 'error',
                    title: 'Date debut inferieur a date fin',
                    timer: 3000
                })

            }
        }
    }
}
