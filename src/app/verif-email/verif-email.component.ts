import { email } from './../sign-in/email';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { EmailserviceService } from '../emailservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../sign-in/users';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
})
export class VerifEmailComponent implements OnInit {
  constructor(public UsersService : UsersService , public EmailserviceService: EmailserviceService ,private router: Router, private route: ActivatedRoute){}
  us2: users[] = []; 

  myFunction(text:string): void {
    const x: HTMLElement | null = document.getElementById("snackbar");
  
    if (x) {
      x.className = "show";
      x.textContent=text;
      setTimeout(() => {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
  }
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  email: email={
    from: '',
    subject: '',
    body: '',
    attachement: ''
  }; 
  mail='';
  code='';
  input_code='';
  ngOnInit(): void {
    this.myFunction("we have sent to you the code")
    this.route.params.subscribe(params => {
      this.mail = this.UsersService.decryptString(params['email'],this.UsersService.secret_key);
      console.log(this.mail);
    });
    this.UsersService.get_users().subscribe(
      (data:users[])=>{
        this.us2=data;
        console.log(data);
      }
    )
   this.code = this.generateRandomString(8);
    this.email.from=this.mail;
    this.email.subject="Account Activation"
    this.email.body="Voici votre code pour activer ton compte : "+this.code;
    this.email.attachement=""
    this.EmailserviceService.send_mail(this.email).subscribe(
        (message)=>{
          
          console.log(message);
        }
    );
  }
  user : users ={
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
  submit(){
    let traited_input = this.input_code.replace(' ','');
    if(traited_input==this.code){
      this.user.id = (this.us2[this.us2.length-1].id)+1;
      this.user.email=this.mail;
      this.user.username=this.UsersService.username_sign_up;
      this.user.password = this.UsersService.password_sign_up;
      this.user.place=this.UsersService.place_sign_up;
      this.user.image=this.UsersService.image_sign_up;
      this.user.numero=this.UsersService.numero_sign_up;
      this.user.date_embauche=2023

      console.log(this.user);
      this.UsersService.add_user(this.user).subscribe(
        (data)=>{
          console.log(data);
        }
      );
      alert("compte crée avec succés");
      this.router.navigate([`/sign_in`]);

    
       
    }
    else{
      this.myFunction("verifier le code saisi");
    }
    
  }

}
