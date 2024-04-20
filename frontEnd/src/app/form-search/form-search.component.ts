import { Component } from '@angular/core';
import { BiensServiceService } from '../Services/biens-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Biens } from '../../../types';

@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.scss'
})
export class FormSearchComponent {
  criteria: any = {}; // Object to store search criteria
  biens: Biens[] = []; // Array to store retrieved biens
  rows: number = 2; // Number of items per page
  totalRecords: number = 0; // Total number of records

  constructor(private biensService: BiensServiceService) {}

  onSearch() {
    // Call biensService.getBiens with search criteria
    this.biensService.getBiens('http://localhost:8888/biens', this.criteria)
      .subscribe((result: any) => {
        this.biens = result.items; // Assign retrieved biens to the component property
        this.totalRecords = result.total; // Assign total number of records for pagination
      });
  }

  onPageChange(event: any) {
    // Handle pagination changes here if needed
    console.log(event);
  }
}

