import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Bien} from '../../../types';
import {BiensService} from '../services/biens.service';
import {CommonModule} from '@angular/common';
import {GoogleMap, MapMarker} from "@angular/google-maps";
import {data} from "autoprefixer";

@Component({
    selector: 'app-property-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, GoogleMap, MapMarker],
    templateUrl: './property-detail.component.html',
    styleUrl: './property-detail.component.scss'
})


export class PropertyDetailComponent implements OnInit {


    bien!: Bien;
    storage: Storage = localStorage;

    mapOptions!: google.maps.MapOptions
    marker: any


    constructor(private route: ActivatedRoute, private biensService: BiensService) {
    }

    ngOnInit(): void {

        this.route.paramMap.subscribe(() =>
            this.getPropertyDetails()
        );


    }

    getPropertyDetails() {
        const hasPropertyId: boolean = this.route.snapshot.paramMap.has("id");
        if (hasPropertyId) {
            const propertyId: number = +this.route.snapshot.paramMap.get("id")!;
            this.biensService.getBienById(propertyId).subscribe(
                data => {
                    this.bien = data;
                    this.mapOptions = {
                        center: {lat: this.bien.lat, lng: this.bien.lng},
                        zoom: 14
                    }

                    this.marker = {
                        position: {lat: this.bien.lat, lng: this.bien.lat},
                    }
                }
            )
        }
    }

    persistProperty(bien: Bien) {
        this.storage.setItem("bien", JSON.stringify(bien));
    }


}
