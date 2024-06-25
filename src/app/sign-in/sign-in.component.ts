import { EmailserviceService } from './../emailservice.service';
import { email } from './email';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { users } from './users';
import { registration } from './registration';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  
  nom:string='';
  pass:string='';
  
  vider():void{
    this.nom='';
    this.pass='';
  }
  constructor(public UsersService : UsersService , public EmailserviceService: EmailserviceService ,private router: Router, private route: ActivatedRoute){}
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
  }
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
  email:email={
    from: '',
    subject: '',
    body: '',
    attachement: ''
  };
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
  getDeviceType(): string {
    const userAgent = navigator.userAgent;
  
    if (/Mobi|Android/i.test(userAgent)) {
      return 'Mobile';
    } else if (/Tablet|iPad/i.test(userAgent)) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }
  getBrowserName(): string {
    const userAgent = navigator.userAgent;
  
    if (userAgent.includes('Chrome')) {
      return 'Google Chrome';
    } else if (userAgent.includes('Firefox')) {
      return 'Mozilla Firefox';
    } else if (userAgent.includes('Edge')) {
      return 'Microsoft Edge';
    } else if (userAgent.includes('Safari')) {
      return 'Apple Safari';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
      return 'Opera';
    } else {
      return 'Unknown Browser';
    }
  } 
  ok=true;
  submit(){
    let i = 0;
    while(i<this.us2.length ){
      if (this.us2[i]?.username.toLowerCase() === this.nom.toLowerCase() && this.passwords[i].toLowerCase() === this.pass.toLowerCase()) {
        this.ok = false;
        if (this.us2[i]) {
          this.us_finded = this.us2[i];
        }
        break;
      }
      i++;
    }
    if(this.ok==false){
      const currentDate = new Date();

      const currentTimeString = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

      const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

      const dateTimeString = `${currentDateString} ${currentTimeString}`;

      const deviceType = this.getDeviceType();
      const browserName = this.getBrowserName();


      this.email.from=this.us_finded.email;
      this.email.subject="you are connected"
      this.email.body="welcome to our application mr jerbi vous souhaite le bonjour et le bonsoir \n vous etes connecté le "+dateTimeString+" avec "+deviceType+" sur "+browserName ;
      this.email.attachement=""
      this.EmailserviceService.send_mail(this.email).subscribe(
        (message)=>{
          
          console.log(message);
        }
      );
      let crypted_id = this.UsersService.encryptString(this.us_finded.id.toString(), this.UsersService.secret_key);
      if(this.us_finded.admin==true){
        this.router.navigate([`admin/${crypted_id}`]);

      }
      else{
        this.router.navigate([`user/${crypted_id}/dashboard`]);
      }
      
    
    }
    else{
      let text = "verifier vos données";
      this.myFunction(text);
    }
  }

  /***************** sign up *********************************/
  place='';
  pass1='';
  pass2='';
  username_sign_up='';
  email_sign_up='';
  image_sign_up='';
  numero=0;
  r: registration = {
    email: '',
    username: '',
    password: '',
    image: '',
    numero: 0,
    place: '',
    date: new Date()
  };
  verif = false;
  ajout_user(){
    
    let i = 0;
    let text = '';
    if(this.pass1==this.pass2 && this.pass1.length>8 && this.pass1!='' && this.username_sign_up!='' && this.email_sign_up!=''){
      while(i<this.us2.length ){
        if (this.us2[i]?.username === this.username_sign_up) {
          this.verif = false;
          text = "username deja utilise";
          this.myFunction(text);
          break;
        }
        if(this.us2[i]?.email === this.email_sign_up){
          text = "email deja utilise";
          this.myFunction(text);
          this.verif = true;
          break;
        }
        i++;
      }
      if(this.verif==true){
        this.r.email=this.email_sign_up;
        this.r.password=this.pass1;
        this.r.username=this.username_sign_up;
        this.r.image=this.image_sign_up;
        this.r.numero=this.numero;
        this.r.place=this.place;
        this.UsersService.add_registration(this.r).subscribe(
          (data)=>{
            console.log(data);
          }
        );
        
        this.UsersService.username_sign_up=this.username_sign_up;
        this.UsersService.password_sign_up=this.pass1;
        this.UsersService.place_sign_up=this.place;
        this.UsersService.image_sign_up=this.image_sign_up;
        this.UsersService.numero_sign_up=this.numero;
        let crypt_email=this.UsersService.encryptString(this.email_sign_up,this.UsersService.secret_key);
        this.router.navigate([`verif_email/${crypt_email}`]);

        
        
      }
      else{
        text = "verifier vos donnée";
        this.myFunction(text);
      }
    } 
    else{
      text = "veuillez remplir tout le formulaire"
      this.myFunction(text);
    }
  }
 




}
