import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailserviceService } from './../emailservice.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { users } from '../sign-in/users';
import { email } from '../sign-in/email';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  constructor(public UsersService : UsersService , public EmailserviceService : EmailserviceService , private Router: Router, private route: ActivatedRoute){}

  us_finded : users = {
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

  us2: users[] = []; 
  passwords: string[] = []; 
  mail: string='';
  email:email={
    from: '',
    subject: '',
    body: '',
    attachement: ''
  };
  pass1='';
  pass2='';

  ngOnInit(): void {
    this.UsersService.get_users().subscribe(
      (data:users[])=>{
        this.us2=data;
        console.log(data);
      }
    )
    this.UsersService.get_passwords().subscribe(
      (pa:string[])=>{
        this.passwords=pa;
        console.log(pa);
      }
    )
    this.route.params.subscribe(params => {
      this.mail = this.UsersService.decryptString(params['email'],this.UsersService.secret_key);
      console.log(this.mail);
    });

    
  }

  verif(pass : string):boolean{
    if(pass.length>8)
      return true;
    else{
      return false;
    }
  }
  ok=true;
  i = 0;
   myFunction(): void {
    const x: HTMLElement | null = document.getElementById("snackbar");
  
    if (x) {
      x.className = "show";
      if(this.ok==false){
        x.textContent="mdp update successfully";
        
      }
      else{
        x.textContent="Verifier vos inputs";
      }
      
      
  
      setTimeout(() => {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
  }

  submit(){
    if(this.pass1==this.pass2 && this.verif(this.pass1)==true && this.verif(this.pass2)==true){
      while(this.i<this.us2.length ){
        if (this.us2[this.i]?.email === this.mail) {
          this.ok = false;
          if (this.us2[this.i]) {
            this.us_finded = this.us2[this.i];
          }
          break;
        }
        this.i++;
      }
      if(this.ok==false){
        this.UsersService.update_password(this.us_finded.id,this.pass1).subscribe(
          (up:users)=>{
            console.log(up);
          }
        )
        this.email.from=this.us_finded.email;
        this.email.subject="Your new Password"
        this.email.body=''
        this.email.attachement="C:/Users/jerbi/OneDrive/Images/jack02.jpg"
        this.EmailserviceService.send_mail_with_attachment(this.email).subscribe(
          (message)=>{
          
            console.log(message);
          }
        );
        this.Router.navigate(['/sign_in']);
      }

    }
    else{
      this.myFunction();
    }


  }


}
