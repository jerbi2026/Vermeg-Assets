import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  constructor(public UsersService:UsersService,private router: Router, private route: ActivatedRoute){}
  id_connected='';
  move_to_dashboard(){
    this.route.params.subscribe(params => {
      this.id_connected=params['id'];
      
    });
    this.router.navigate([`user/${this.id_connected}/dashboard`]);
  }
  move_to_profile(){
    this.route.params.subscribe(params => {
      this.id_connected=params['id'];
      
    });
    this.router.navigate([`user/profile/${this.id_connected}`]);
  }
  move_to_contact(){
    this.route.params.subscribe(params => {
      this.id_connected=params['id'];
      
    });
    this.router.navigate([`user/contact/${this.id_connected}`]);
  }



}
