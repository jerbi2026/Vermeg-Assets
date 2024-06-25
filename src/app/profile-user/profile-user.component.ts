import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../sign-in/users';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  constructor(public UsersService:UsersService,private router: Router, private route: ActivatedRoute,private location: Location){}
  id_admin=0;
  admin:users={
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
    image: '',
    numero: 0,
    solde: 0,
    place: '',
    date_embauche: 0,
    nb_transaction: 0
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_admin = parseInt(this.UsersService.decryptString(params['id'],this.UsersService.secret_key));
      console.log(this.id_admin);
    }); 
    this.UsersService.get_user_by_id(this.id_admin).subscribe(
      (data)=>{
        this.admin=data;

      }
    )   
  }
  goBack(): void {
    this.location.back();
  }
}
