import { EmailserviceService } from './../emailservice.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { users } from '../sign-in/users';
import { email } from '../sign-in/email';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-send-message',
  templateUrl: './admin-send-message.component.html',
  styleUrls: ['./admin-send-message.component.css']
})
export class AdminSendMessageComponent implements OnInit{

  constructor(private UsersService:UsersService , private EmailserviceService:EmailserviceService,private router: Router, private route: ActivatedRoute ){};
  us2:users[]=[];
  p: number = 1;
  tab: number = 3;
  users_affiche: users[] = [];
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
  subject='';
  body='';
  email_to_send:email={
    from: '',
    subject: '',
    body: '',
    attachement: ''
  }
  affiche_box_send=true;

  prepare_email(to:string){
    this.email_to_send.from=to;
    this.affiche_box_send=false;
  }

  send_email(){
    if(this.subject!='' && this.body!=''){
      this.email_to_send.subject=this.subject;
      this.email_to_send.body=this.body;
      this.EmailserviceService.send_mail(this.email_to_send).subscribe(
        (data)=>{
          console.log(data);
          alert("email sent successfully");
          this.subject='';
          this.body='';
          this.affiche_box_send=true;

        }
      )
    }
    else{
      alert("verifier les textfields");
    }
  }

  


}
