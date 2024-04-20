import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { BiensServiceService } from '../Services/biens-service.service';
import { Bien, Biens } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [RatingModule,CommonModule,FormsModule,RouterLink],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss'
})


export class PropertyListComponent {
  @Input() bien! : Bien;
  @Output() bienOutput : EventEmitter<Bien> = new EventEmitter<Bien>();
  public biens : any = new Array();
  public bien_ratting = 5;

  onBienOutput(bien : Bien){
    console.log(bien,'Output');
  }

constructor(private route : ActivatedRoute,private biensService : BiensServiceService,private router: Router) {}
onBienClicked(bien: Bien) {
  console.log('Bien cliqué :', bien);
  this.router.navigate(['/properties', bien.idBien]);
  // Ajoutez ici le code pour gérer le clic sur le bien (redirection, affichage détaillé, etc.)
  // Par exemple : Router vers une page de détails du bien
  // this.router.navigate(['/detail', bien.id]); // Exemple de redirection vers une page de détails
}
ngOnInit(){
 this.bienOutput.emit(this.bien);
}
}
