import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marche-client',
  templateUrl: './marche-client.component.html',
  styleUrls: ['./marche-client.component.css']
})
export class MarcheClientComponent {
  constructor(public UsersService:UsersService,private router: Router, private route: ActivatedRoute){}
  id_connected='';
  move_to_transfert(){
    this.route.params.subscribe(params => {
      this.id_connected=params['id'];
     

      
    });
    this.router.navigate([`user/marche/${this.id_connected}`]);
  }
}
