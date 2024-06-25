import { transaction } from './../notification/transaction';
import { email } from './../sign-in/email';
import { EmailserviceService } from './../emailservice.service';
import { Component, OnInit } from '@angular/core';
import { FileServiceService } from '../file-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { users } from '../sign-in/users';

@Component({
  selector: 'app-transfert-marche',
  templateUrl: './transfert-marche.component.html',
  styleUrls: ['./transfert-marche.component.css']
})
export class TransfertMarcheComponent  implements OnInit{
  
  constructor(private UsersService:UsersService, private fileService: FileServiceService, private router:Router, private route:ActivatedRoute,private EmailserviceService:EmailserviceService){};
  email:email={
    from: '',
    subject: '',
    body: '',
    attachement: ''
  }
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
  us2:users[]=[]
  password:string[]=[];
  transaction:transaction={
    id: 0,
    message: '',
    client_id: 0,
    quantite: 0
  }
  all_transaction:transaction[]=[]
  username_sender='';
  password_sender='';
  somme=0;
  quantite=0;
  id_receiver=0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_admin = parseInt(this.UsersService.decryptString(params['id'],this.UsersService.secret_key));
      console.log(this.id_admin);
    });
    this.UsersService.get_user_by_id(this.id_admin).subscribe(
      (data)=>{
        this.admin=data;
    

      }
    );
    this.UsersService.get_transactions().subscribe(
      (data)=>{
        this.all_transaction=data;
      }
    )
    this.UsersService.get_passwords().subscribe(
      (data)=>{
        this.password=data;

      }
    )
    this.UsersService.get_users().subscribe(
      (data: users[]) => {
        this.us2 = data;
      });
    
  }
  show_receiver=true;
  reciever:users={
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

  view_profile(){
    if(this.id_receiver!=0){
      this.UsersService.get_user_by_id(this.id_receiver).subscribe(
        (data)=>{
          this.reciever=data;
        },
        (error)=>{
          alert("verifier id")
        }
      )
      this.show_receiver=false;

    }
    
  }
  close_reciever(){
    this.show_receiver=true;
  }
  cancel(){
    this.username_sender='';
    this.password_sender='';
    this.somme=0;
    this.quantite=0;
    this.id_receiver=0;
  

  }



  send_money(){
    let id= this.admin.id;
    let i=0;
    for(i = 0;i<this.us2.length;i++){
      if(this.us2[i].id==id){
        break;
      }
    }
    if(this.password[i]==this.password_sender && this.username_sender == this.admin.username  && this.id_receiver!=this.admin.id){
   
      this.UsersService.get_user_by_id(this.id_receiver).subscribe(
        (data)=>{
          this.reciever=data;
          if(this.somme>this.admin.solde){
            alert("you don't have money enough to send");
          }
          else if(this.somme<=this.admin.solde){
            this.admin.solde=this.admin.solde-this.somme;
            this.reciever.solde=this.reciever.solde+this.somme;
        
            this.admin.password='';
            this.reciever.password='';
            this.UsersService.update_user_by_id(this.admin.id,this.admin).subscribe(
              (data)=>{
                alert("operation done");
                this.email.from=this.admin.email;
                this.email.subject="Done"
                this.email.body="You have sent "+this.somme+"$ to "+ this.reciever.username+", Your new Solde: "+this.admin.solde  ;
                this.email.attachement=""
                this.EmailserviceService.send_mail(this.email).subscribe(
                (message)=>{
                
                  console.log(message);
                }
                );
                if(this.all_transaction.length>0){
                  this.transaction.id=this.all_transaction[this.all_transaction.length-1].id+1;
    
                }
                else{
                  this.transaction.id=1;
    
                }
                this.transaction.client_id=this.admin.id;
                this.transaction.quantite=this.somme;
                this.transaction.message="le client "+this.admin.username+" have sent "+this.somme+"$ to "+this.reciever.username+" ("+this.reciever.id+") ";
                this.UsersService.add_transaction(this.transaction).subscribe(
                  (data)=>{
                    console.log("transaction done")
                  },
                  (error)=>{
                    console.error("transaction not done")
                  }
                )
              },
              (error)=>{
                alert("operation not done")
              }
  
            );
            this.UsersService.update_user_by_id(this.reciever.id,this.reciever).subscribe(
              (data)=>{
                this.email.from=this.reciever.email;
                this.email.subject="Done"
                this.email.body="You have received "+this.somme+"$ from "+ this.admin.username+", Your new Solde: "+this.reciever.solde  ;
                this.email.attachement=""
                this.EmailserviceService.send_mail(this.email).subscribe(
                (message)=>{
                
                  console.log(message);
                }
                );
                this.cancel();
                
              },
              (error)=>{
                alert("operation not done")

              }
  
            );
          
  
        }
          
        },
        (error)=>{
          alert("verifier id");
        }
      )
        
      
    }
    else{
      alert("verifier vos données")
    }

  }
  send_actions(){
    let id= this.admin.id;
    let i=0;
    for(i = 0;i<this.us2.length;i++){
      if(this.us2[i].id==id){
        break;
      }
    }
    if(this.password[i]==this.password_sender && this.username_sender == this.admin.username && this.id_receiver!=this.admin.id){
   
      this.UsersService.get_user_by_id(this.id_receiver).subscribe(
        (data)=>{
          this.reciever=data;
          if(this.quantite>this.admin.nb_transaction){
            alert("you don't have actions enough to send");
          }
          else if(this.somme<=this.admin.solde){
            this.admin.nb_transaction=this.admin.nb_transaction-this.quantite;
            this.reciever.nb_transaction=this.reciever.nb_transaction+this.quantite;
        
            this.admin.password='';
            this.reciever.password='';
            this.UsersService.update_user_by_id(this.admin.id,this.admin).subscribe(
              (data)=>{
                alert("operation done");
                this.email.from=this.admin.email;
                this.email.subject="Done"
                this.email.body="You have sent "+this.quantite+" Actions to "+ this.reciever.username+", Your new actions: "+this.admin.nb_transaction  ;
                this.email.attachement=""
                this.EmailserviceService.send_mail(this.email).subscribe(
                (message)=>{
                
                  console.log(message);
                }
                );
                if(this.all_transaction.length>0){
                  this.transaction.id=this.all_transaction[this.all_transaction.length-1].id+1;
    
                }
                else{
                  this.transaction.id=1;
    
                }
                this.transaction.client_id=this.admin.id;
                this.transaction.quantite=this.quantite;
                this.transaction.message="le client "+this.admin.username+" have sent "+this.quantite+" actions to "+this.reciever.username+" ("+this.reciever.id+") ";
                this.UsersService.add_transaction(this.transaction).subscribe(
                  (data)=>{
                    console.log("transaction done")
                  },
                  (error)=>{
                    console.error("transaction not done")
                  }
                )
              },
              (error)=>{
                alert("operation not done")
              }
  
            );
            this.UsersService.update_user_by_id(this.reciever.id,this.reciever).subscribe(
              (data)=>{
                this.email.from=this.reciever.email;
                this.email.subject="Done"
                this.email.body="You have received "+this.quantite+" Actions from "+ this.admin.username+", Your new actions: "+this.reciever.nb_transaction  ;
                this.email.attachement=""
                this.EmailserviceService.send_mail(this.email).subscribe(
                (message)=>{
                
                  console.log(message);
                }
                );
                
              },
              (error)=>{
                alert("operation not done")
              }
  
            );
          
          
              
            
          
  
  
        }
          
        },
        (error)=>{
          alert("verifier id");
        }
      )
        
      
    }
    else{
      alert("verifier vos données")
    }

  }


}
