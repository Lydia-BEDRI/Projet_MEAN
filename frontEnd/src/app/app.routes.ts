import { Routes } from '@angular/router';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { RouterModule } from '@angular/router';
export const routes: Routes = [
    { path: '', redirectTo: '/properties', pathMatch: 'full' },
];
