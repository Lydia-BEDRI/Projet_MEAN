import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {BiensService} from './services/biens.service';
import {Bien, Biens} from '../../types';
import {FormSearchComponent} from './form-search/form-search.component';
import {CommonModule} from '@angular/common';
import {PropertyListComponent} from './property-list/property-list.component';
import {PaginatorModule} from 'primeng/paginator';
import {PropertyDetailComponent} from './property-detail/property-detail.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet,HeaderComponent, FooterComponent, FormSearchComponent, CommonModule, PropertyListComponent, PaginatorModule, PropertyDetailComponent, ConnexionComponent, MatPaginator],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'frontEnd';

    constructor() {
    }


    // fetchBiens(page: number, perPage: number) {
    //     this.biensService.getBiens('http://localhost:8888/biens', {page, perPage}).subscribe((biens: Biens) => {
    //         console.log(biens);
    //         this.biens = biens.items;
    //         this.totalRecords = biens.total;
    //     });
    // }

    OnPageChange(event: any) {
        //this.fetchBiens(event.page, event.rows);
    }

    ngOnInit() {
        //this.fetchBiens(0, this.rows)

    }
}
