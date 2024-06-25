import { UsersService } from './../users.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../sign-in/users';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

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
    nb_transaction:0
  };
  
  name='';
  email='';
  numero=0;
  place='';
  image='';
  date=0;
  constructor(public UsersService:UsersService,private router: Router, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_admin = parseInt(this.UsersService.decryptString(params['id'],this.UsersService.secret_key));
      console.log(this.id_admin);
    });

    this.UsersService.get_user_by_id(this.id_admin).subscribe(
      (data)=>{
        this.admin=data;
        console.log(this.admin);
        this.name=this.admin.username;
        this.email=this.admin.email;
        this.numero=this.admin.numero;
        this.place=this.admin.place;
        this.image=this.admin.image;
        this.date=this.admin.date_embauche;
      }
    )
    
  }
  
  reset(){
    this.name=this.admin.username;
    this.email=this.admin.email;
    this.numero=this.admin.numero;
    this.place=this.admin.place;
    this.image=this.admin.image;
    this.date=this.admin.date_embauche;

  }
  update_admin(){
    this.admin.password='';
    

    if(this.name!=this.admin.username){
        this.admin.username=this.name;
    }
    if(this.place!=this.admin.place){
      this.admin.place=this.place;
    }
    if(this.email!=this.admin.email){
      this.admin.email=this.email;
    }
    if(this.image!=this.admin.image){
      this.admin.image=this.image;
    } 
    if(this.numero!=this.admin.numero){
      this.admin.numero=this.numero;
    }
    if(this.date!=this.admin.date_embauche){
      this.admin.date_embauche=this.date;
    }
    this.UsersService.update_user_by_id(this.admin.id,this.admin).subscribe(
      (data)=>{
        console.log("admin updated");
        this.admin=data;
        alert("admin's informations updated successfully....");
      }
    )
    this.reset();



  }


  
  
 

}
