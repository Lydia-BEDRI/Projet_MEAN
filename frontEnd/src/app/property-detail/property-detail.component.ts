import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bien } from '../../../types';
import { BiensServiceService } from '../Services/biens-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit {
  bien: Bien | null = null;

  constructor(private route: ActivatedRoute, private biensService: BiensServiceService) {}

  ngOnInit(): void {
    // Récupérer l'ID du bien à partir de l'URL
    const id = this.route.snapshot.params['id'];

    // Appeler le service pour récupérer les détails du bien par son ID
    this.biensService.getBienById(id).subscribe((bien: Bien) => {
      this.bien = bien;
    });
  }
}
