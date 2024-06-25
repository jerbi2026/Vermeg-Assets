import { transaction } from './../notification/transaction';
import { EmailserviceService } from './../emailservice.service';
import { email } from './../sign-in/email';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../sign-in/users';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.css']
})
export class MarcheComponent implements OnInit {
  constructor(private UsersService:UsersService ,private router:Router, private route:ActivatedRoute, private EmailserviceService:EmailserviceService){};
  us2:users[]=[];
  nombre_actions_disp=0;
  nombre_actions_non_disp=0;
  nombre_solde_total=0;
  comparaison_action:any[]=[];
  password:string[]=[]
  comparaison_solde:any[]=[];
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Clients';
  yAxisLabel = 'Actions';
  all_transactions:transaction[]=[]
  user_connected:users={
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
  id_admin=0;
  achat_box=true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_admin = parseInt(this.UsersService.decryptString(params['id'],this.UsersService.secret_key));
      console.log(this.id_admin);
    });
    this.UsersService.get_user_by_id(this.id_admin).subscribe(
      (data)=>{
        this.user_connected=data;
    

      }
    )
    this.UsersService.get_passwords().subscribe(
      (data)=>{
        this.password=data;

      }
    );
    this.UsersService.get_transactions().subscribe(
      (data)=>{
        this.all_transactions=data;
      }
    )
    this.UsersService.get_users().subscribe(
      (data: users[]) => {
        this.us2 = data;
        console.log(data);
        this.us2.forEach(user => {
          this.nombre_actions_non_disp=this.nombre_actions_non_disp+user.nb_transaction;
          this.nombre_solde_total=this.nombre_solde_total+user.solde;
          
        });
        this.nombre_actions_disp=this.UsersService.nombre_actions_total-this.nombre_actions_non_disp;
        console.log(this.nombre_solde_total)
        this.comparaison_action=[
          {
            name:"total",
            value:this.UsersService.nombre_actions_total
          },
          {
            name:"Client",
            value:this.user_connected.nb_transaction
          },
          {
            name:'actions disponible',
            value:this.nombre_actions_disp
          }
        ]
        this.comparaison_solde=[
          {
            name:"total",
            value:this.nombre_solde_total
          },
          {
            name:"Client",
            value:this.user_connected.solde
          }

        ]



        


  
       
      },
      (error) => {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    );
  }
  buy_action(){
    this.achat_box=false;
    this.sell_box=true;
  }
  cancel_order(){
    this.achat_box=true;
  }
  username='';
  user_pass='';
  quantite=0;
  prix=0;
  email:email={
    from: '',
    subject: '',
    body: '',
    attachement: ''
  }
  transaction:transaction={
    id: 0,
    message: '',
    client_id: 0,
    quantite: 0
  }

  submit_order(){
    let id= this.user_connected.id;
    let i=0;
    for(i = 0;i<this.us2.length;i++){
      if(this.us2[i].id==id){
        break;
      }
    }
    if(this.password[i]==this.user_pass && this.username == this.user_connected.username){
      if(this.quantite>this.nombre_actions_disp){
        alert("you have atteint the max i will consider you will buy all the assets");
        this.quantite=this.nombre_actions_disp;
        this.nombre_actions_disp=0;
      }
      this.prix=this.quantite*100;


      if(this.prix>this.user_connected.solde){
        alert("you don't have money enough to buy");
      }
      else{
        this.user_connected.password='';
        this.user_connected.solde=this.user_connected.solde-this.prix;
        this.user_connected.nb_transaction= this.user_connected.nb_transaction+this.quantite;
        console.log(this.user_connected.nb_transaction);
        this.nombre_actions_disp=this.nombre_actions_disp-this.quantite;
        this.UsersService.update_user_by_id(this.user_connected.id,this.user_connected).subscribe(
          (data)=>{
            alert("operation done");
            this.email.from=this.user_connected.email;
            this.email.subject="Congrats"
            this.email.body="You have Bought "+this.quantite+" actions, Your new Solde "+this.user_connected.solde+" and you have "+this.user_connected.nb_transaction+" actions"  ;
            this.email.attachement=""
            this.EmailserviceService.send_mail(this.email).subscribe(
              (message)=>{
                
                console.log(message);
              }
            );
            if(this.all_transactions.length>0){
              this.transaction.id=this.all_transactions[this.all_transactions.length-1].id+1;

            }
            else{
              this.transaction.id=1;

            }
            this.transaction.client_id=this.user_connected.id;
            this.transaction.quantite=this.quantite;
            this.transaction.message="le client "+this.user_connected.username+" have bought "+this.quantite+" actions";
            this.UsersService.add_transaction(this.transaction).subscribe(
              (data)=>{
                console.log("transaction done")
              },
              (error)=>{
                console.error("transaction not done")
              }
            )
            
            this.achat_box=true;
            this.ngOnInit();
          }
          
        )
      }
    }
    else{
      alert("wrong data");
    }
  }
  sell_box=true;
  cancel_sell(){
    this.sell_box=true;
    

  }
  order_sell(){
    this.sell_box=false;
    this.achat_box=true;


  } 
  submit_sell(){
    let id= this.user_connected.id;
    let i=0;
    for(i = 0;i<this.us2.length;i++){
      if(this.us2[i].id==id){
        break;
      }
    }
    if(this.password[i]==this.user_pass && this.username == this.user_connected.username){
      if (this.user_connected.nb_transaction > 0) {
        if (this.quantite > this.user_connected.nb_transaction) {
          alert("You have reached the maximum; I will consider you will sell all the assets");
          this.quantite = this.user_connected.nb_transaction;
          this.nombre_actions_disp = this.nombre_actions_disp + this.quantite;
          this.user_connected.nb_transaction = 0;
          
        this.prix = this.quantite * 100;
        console.log(this.prix);
  
  
        console.log(this.user_connected.nb_transaction);
          this.user_connected.password='';
          this.user_connected.solde=this.user_connected.solde+this.prix;
          
          this.UsersService.update_user_by_id(this.user_connected.id,this.user_connected).subscribe(
            (data)=>{
              alert("operation done");
              this.email.from=this.user_connected.email;
              this.email.subject="Congrats"
              this.email.body="You have sold "+this.quantite+" actions, Your new Solde "+this.user_connected.solde+" and you have "+this.user_connected.nb_transaction  ;
              this.email.attachement=""
              this.EmailserviceService.send_mail(this.email).subscribe(
                (message)=>{
                  
                  console.log(message);
                }
              );
              if(this.all_transactions.length>0){
                this.transaction.id=this.all_transactions[this.all_transactions.length-1].id+1;
              }
              else{
                this.transaction.id=1;
  
              }
              this.transaction.client_id=this.user_connected.id;
              this.transaction.quantite=this.quantite;
              this.transaction.message="le client "+this.user_connected.username+" have sold "+this.quantite+" actions";
              this.UsersService.add_transaction(this.transaction).subscribe(
                (data)=>{
                  console.log("transaction done")
                },
                (error)=>{
                  console.error("transaction not done")
                }
              )
              this.achat_box=true;
              this.ngOnInit();
            }
            
          )
        }
        else{
          this.user_connected.nb_transaction=this.user_connected.nb_transaction-this.quantite; 
          console.log(this.user_connected.nb_transaction);
          this.nombre_actions_disp=this.nombre_actions_disp+this.quantite;
          
        this.prix = this.quantite * 100;
        console.log(this.prix);
  
  
        console.log(this.user_connected.nb_transaction);
          this.user_connected.password='';
          this.user_connected.solde=this.user_connected.solde+this.prix;
          
          this.UsersService.update_user_by_id(this.user_connected.id,this.user_connected).subscribe(
            (data)=>{
              alert("operation done");
              this.email.from=this.user_connected.email;
              this.email.subject="Congrats"
              this.email.body="You have sold "+this.quantite+" actions, Your new Solde "+this.user_connected.solde+" and you have "+this.user_connected.nb_transaction  ;
              this.email.attachement=""
              this.EmailserviceService.send_mail(this.email).subscribe(
                (message)=>{
                  
                  console.log(message);
                }
              );
              if(this.all_transactions.length>0){
                this.transaction.id=this.all_transactions[this.all_transactions.length-1].id+1;
  
              }
              else{
                this.transaction.id=1;
  
              }
              this.transaction.client_id=this.user_connected.id;
              this.transaction.quantite=this.quantite;
              this.transaction.message="le client "+this.user_connected.username+" have sold "+this.quantite+" actions";
              this.UsersService.add_transaction(this.transaction).subscribe(
                (data)=>{
                  console.log("transaction done")
                },
                (error)=>{
                  console.error("transaction not done")
                }
              )
              this.achat_box=true;
              this.ngOnInit();
            }
            
          )
        }
    

      }
      else{
        alert("you don't have assets")
      }
      
      
    }
    else{
      alert("wrong data");
    }
  }


}
