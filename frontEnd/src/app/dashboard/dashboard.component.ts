import {Component, OnInit, signal} from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {initFlowbite} from "flowbite";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        RouterLink,
        RouterOutlet
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


    user: any;

    constructor(private authService: AuthentificationService) {
        initFlowbite();
    }

    ngOnInit(): void {
        this.getUser()
    }

    signOut() {
        this.authService.signOut()

    }

    getUser() {
        this.user = this.authService.getUser();
    }
    
}
