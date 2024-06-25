import { email } from './../sign-in/email';
import { users } from '../sign-in/users';
import { EmailserviceService } from './../emailservice.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit{
  constructor(public UsersService : UsersService , public EmailserviceService : EmailserviceService , private router: Router, private route: ActivatedRoute){}

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
  user_email='';

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

  myFunction(text : string): void {
    const x: HTMLElement | null = document.getElementById("snackbar");
  
    if (x) {
      x.className = "show";
      x.textContent = text; 
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
  
  randomString: string = this.generateRandomString(10);
  ok=true;
  i = 0;
  isButtonDisabled1: boolean = false;
  isButtonDisabled2: boolean = true;
  submit(){
    
    
    while(this.i<this.us2.length ){
      if (this.us2[this.i]?.email === this.user_email) {
        this.ok = false;
        if (this.us2[this.i]) {
          this.us_finded = this.us2[this.i];
        }
        break;
      }
      this.i++;
    }
    if(this.ok==false){
      this.myFunction("we have sent to you a code please write it in password field");
      const spanElement = document.getElementById("monSpan");

      if (spanElement) {
          spanElement.textContent = "write the code ";
      }
      this.email.from=this.us_finded.email;
      this.email.subject="The code"
      this.email.body="your code is : "+this.randomString+"  (please try to not forget it)"
      this.email.attachement="C:/Users/jerbi/OneDrive/Images/jack02.jpg"
      this.EmailserviceService.send_mail_with_attachment(this.email).subscribe(
          (message)=>{
            
            console.log(message);
          }
        );
      this.user_email='';
      this.isButtonDisabled1 = true;
      this.isButtonDisabled2 = false;


    }
    else{
      this.myFunction("Email don't found");
    }
    


    
   

  }
  submit2(){
    if(this.user_email==this.randomString){
      const email = this.us_finded.email;
      let crypted_email=this.UsersService.encryptString(email,this.UsersService.secret_key);
      this.router.navigate([`reset_pass/${crypted_email}`]);
        this.user_email='';
        this.isButtonDisabled1 = false;
        this.isButtonDisabled2 = true;
       

    }
    else{
      this.myFunction("wrong code");
    }
  }


}
