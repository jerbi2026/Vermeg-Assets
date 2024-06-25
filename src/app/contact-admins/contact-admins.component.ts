import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../sign-in/users';

@Component({
  selector: 'app-contact-admins',
  templateUrl: './contact-admins.component.html',
  styleUrls: ['./contact-admins.component.css']
})
export class ContactAdminsComponent implements OnInit {
  constructor(public UsersService:UsersService,private router: Router, private route: ActivatedRoute){}
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
  id_admin=0;
  us2:users[]=[];
  admins:users[]=[];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_admin = parseInt(this.UsersService.decryptString(params['id'],this.UsersService.secret_key));
      console.log(this.id_admin);
    });

    this.UsersService.get_users().subscribe(
      (data: users[]) => {
        this.us2 = data;
        this.us2.forEach(user => {
          if(user.admin==true){
            this.admins.push(user);
          }
          
        });
       
      }
    )
    this.UsersService.get_user_by_id(this.id_admin).subscribe(
      (data)=>{
        this.admin=data;

      }
    )

   
  }


}
