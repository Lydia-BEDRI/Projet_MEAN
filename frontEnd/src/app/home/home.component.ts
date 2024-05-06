import { Component } from '@angular/core';
import {FooterComponent} from "../layout/footer/footer.component";
import {FormSearchComponent} from "../form-search/form-search.component";
import {HeaderComponent} from "../layout/header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        FooterComponent,
        FormSearchComponent,
        HeaderComponent,
        RouterOutlet
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
