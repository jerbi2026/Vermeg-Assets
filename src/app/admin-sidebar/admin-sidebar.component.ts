import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  constructor(public UsersService:UsersService,private router: Router, private route: ActivatedRoute){}
  id_connected=''
  move_to_dashboard(){
    this.route.params.subscribe(params => {
      this.id_connected=params['id'];
      
    });
    this.router.navigate([`admin/${this.id_connected}`]);
  }
  move_to_users(){
    this.route.params.subscribe(params => {
      this.id_connected=params['id'];
      
    });
    this.router.navigate([`admin/${this.id_connected}/users`]);
  }
  move_to_invest(){
    this.route.params.subscribe(params => {
      this.id_connected=params['id'];
      
    });
    this.router.navigate([`admin/${this.id_connected}/invest`]);
  }
  move_to_send_email(){
    this.route.params.subscribe(params => {
      this.id_connected=params['id'];
      
    });
    this.router.navigate([`admin/${this.id_connected}/sendmessage`]);
  }
  move_to_profile(){
    this.route.params.subscribe(params => {
      this.id_connected=params['id'];
      
    });
    this.router.navigate([`admin/${this.id_connected}/profile`]);
  }
  move_to_notif(){
    this.route.params.subscribe(params => {
      this.id_connected=params['id'];
      
    });
    this.router.navigate([`admin/${this.id_connected}/notif`]);
  }







}
