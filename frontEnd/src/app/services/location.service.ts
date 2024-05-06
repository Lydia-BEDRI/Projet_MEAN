import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private httpClient: HttpClient) {

    }

    book(criteria: any) {
        const url = 'http://localhost:8888/locations/'
        return this.httpClient.post(url, criteria);
    }

    getBookingList(user: any) {
        const url = `http://localhost:8888/locations/${user}`
        return this.httpClient.get(url);
    }

    updateAvis(idLocation: any, avis: any) {
        const url = `http://localhost:8888/locations/update-avis`
        return this.httpClient.post(url, {idLocation: idLocation, avis: avis})
    }
}
