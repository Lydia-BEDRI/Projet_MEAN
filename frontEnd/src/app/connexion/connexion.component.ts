import { Component } from '@angular/core';
import { AuthentificationServiceService } from '../Services/authentification-service.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { FormSearchComponent } from '../form-search/form-search.component';
import { CommonModule } from '@angular/common';
import { PropertyListComponent } from '../property-list/property-list.component';
import { PaginatorModule } from 'primeng/paginator';
import { PropertyDetailComponent } from '../property-detail/property-detail.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  public user = { email: '', pass: '' };

  constructor(private auth: AuthentificationServiceService) {}

  onSubmit(): void {
    this.auth.verification(this.user).subscribe(response => {
      if (response['success']) {
        this.auth.connect(this.user.email);
        // Rediriger l'utilisateur vers une autre page ou exécuter d'autres actions
      } else {
        // Gérer le cas où l'authentification a échoué (afficher un message d'erreur, etc.)
      }
    });
  }
}
