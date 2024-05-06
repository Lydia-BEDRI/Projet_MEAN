import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, RouterLink} from '@angular/router';
import {Bien, Biens} from '../../../types';
import {RatingModule} from 'primeng/rating';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {MessagesModule} from "primeng/messages";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {BiensService} from "../services/biens.service";

@Component({
    selector: 'app-property-list',
    standalone: true,
    imports: [RatingModule, CommonModule, FormsModule, RouterLink, PaginatorModule, MessagesModule, NgxSkeletonLoaderModule],
    templateUrl: './property-list.component.html',
    styleUrl: './property-list.component.scss'
})


export class PropertyListComponent implements OnInit {

    biens: Bien[] = [];
    totalRecords: number = 0;
    rows: number = 12;
    items = new Array(6);
    rowsPerPage = [5, 10, 20];

    constructor(private router: Router, private biensService: BiensService) {

    }

    fetchBiens(page: number, perPage: number) {

        if (this.router.url.indexOf('/home/search') > -1) {

            this.biensService.searchData.subscribe(res => {
                    this.biensService.searchBiens(res, {page, perPage}).subscribe(data => {
                        this.biens = data.items;
                        this.totalRecords = data.total;
                    })
                }
            );
        } else {
            this.biensService.getBiens({page, perPage}).subscribe((biens: Biens) => {
                this.biens = biens.items;
                this.totalRecords = biens.total;
            });
        }
    }

    onPageChange(event: any) {

        this.fetchBiens(event.page, event.rows);

    }

    ngOnInit() {

        setTimeout(() => {
            this.fetchBiens(0, this.rows);
        }, 2000);

    }


}
