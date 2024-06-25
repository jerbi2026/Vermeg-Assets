import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../sign-in/users';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  constructor(private UsersService:UsersService,private router: Router, private route: ActivatedRoute){};
  us2:users[]=[];
  p: number = 1;
  tab: number = 3;
  users_affiche: users[] = [];
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

  ngOnInit(): void {
    this.UsersService.get_users().subscribe(
      (data: users[]) => {
        this.us2 = data;
        console.log(data);
  
        this.users_affiche = this.set_users(this.users_affiche);
      },
      (error) => {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    );
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
  
  set_users(users_affiche: users[]): users[] {
    this.us2.forEach(user => {
      if (user.admin === false) {
        users_affiche.push(user);
      }
    });
    return users_affiche;
  }

  delete_user(id:number){
    this.UsersService.delete_user_by_id(id).subscribe(
      (data)=>{
        console.log("user delete successfully");
        this.users_affiche.splice(0, this.users_affiche.length);
        this.ngOnInit();
      },
      (error)=> {
        console.error("user not deleted");
      }
    )
  }
  affiche_box=true
  username='';
  email='';
  place='';
  image='';
  numero=0;
  solde=0;
  date=0;

  user:users={
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
  };
  id=0;
  edit(user_id:number){
    this.id=user_id;
    this.affiche_box=false;
    this.affiche_box_add=true;
    this.UsersService.get_user_by_id(this.id).subscribe(
      (data)=>{
        this.user=data;
        console.log(this.user);
        this.username=this.user.username;
        this.email=this.user.email;
        this.image=this.user.image;
        this.place=this.user.place;
        this.numero=this.user.numero;
        this.solde=this.user.solde;
         this.date=this.user.date_embauche;
      }
    );
    
  }

  update_user(){
    this.user.id=this.id;
    if(this.username!=this.user.username){
      this.user.username=this.username;
    }
    
    if(this.email!=this.user.email){
      this.user.email=this.email;
    }
    if(this.image!=this.user.image){
      this.user.image=this.image;
    }
    if(this.place!=this.user.place){
      this.user.place=this.place;
    }
    if(this.numero!=this.user.numero){
      this.user.numero=this.numero;
    }
    if(this.solde!=this.user.solde){
      this.user.solde=this.solde;
    }
    if(this.date!=this.user.date_embauche){
      this.user.date_embauche=this.date;
    }
    this.user.password='';
    this.UsersService.update_user_by_id(this.id,this.user).subscribe(
      (data)=>{
        console.log(data);
        

        alert("user updated successfully");
        this.users_affiche.splice(0, this.users_affiche.length);
        this.ngOnInit();
        this.affiche_box=true
      }
    )
    
  }
  cancel(){
    this.affiche_box=true
  }
  /*************************************************** */
  affiche_box_add=true;
  add_new_user(){
    this.affiche_box_add=false;
    this.affiche_box=true;
    this.username='';
    this.email='';
    this.place='';
    this.image='';
    this.numero=0;
    this.solde=0;
    this.date=0;
    
  }
  pass='';
  

  user_added(){
    this.user.username='';
    this.user.password='';
    this.user.email='';
    this.user.image='';
    this.user.place='';
    this.user.numero=0;
    this.user.date_embauche=0;
    this.user.solde=0;

    
    if(this.username==''){
    }
    else if(this.pass==''){

    }
    else if(this.email==''){
    }
    else if(this.date==0){
    }
    else if(this.place==''){
    }
    else{
      this.user.username=this.username;
      this.user.password=this.pass;
      this.user.email=this.email;
      this.user.place=this.place;
      this.user.image=this.image;
      this.user.solde=this.solde;
      this.user.numero=this.numero;
      this.user.date_embauche=this.date;
      this.user.id = (this.us2[this.us2.length-1].id)+1;
      console.log(this.user)
      this.UsersService.add_user(this.user).subscribe(
        (data)=>{
          console.log(data);
          alert("user added successfully");
          this.affiche_box_add=true;
          this.affiche_box=true;
          this.users_affiche.splice(0, this.users_affiche.length);
         this.ngOnInit();
        }
      )


      
    }

    
    
   
    
    
  }
  cancel_add(){
    this.affiche_box_add=true;
    this.username='';
    this.email='';
    this.place='';
    this.image='';
    this.numero=0;
    this.solde=0;
    this.date=0;
    this.pass='';

  }




  

}
