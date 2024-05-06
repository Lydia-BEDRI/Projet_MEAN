import {Component, EventEmitter, Output, output} from '@angular/core';
import {BiensService} from '../services/biens.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: 'app-form-search',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './form-search.component.html',
    styleUrl: './form-search.component.scss'
})
export class FormSearchComponent {


    criteria: any = {}; // Object to store search criteria

    constructor(private route: Router, private biensService: BiensService) {
    }

    onSearch() {

        if (this.criteria.dateDebutLocation !== undefined && this.criteria.dateFinLocation !== undefined) {
            if (this.criteria.dateDebutLocation > this.criteria.dateFinLocation) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Date debut doit etre inferieure a date de fin",
                    timer: 3000
                });
            }
        }
        this.biensService.searchData.next(this.criteria);
        this.route.navigateByUrl("/home/search")
    }

}

