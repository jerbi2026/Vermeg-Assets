import { catchError } from 'rxjs';
import { users } from '../sign-in/users';
import { todo } from '../todo';
import { UsersService } from './../users.service';
import {  Component, OnInit ,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  constructor(public UsersService:UsersService,private router: Router, private route: ActivatedRoute){}
  us2: users[] = []; 
  tasks:todo[]=[];
  p: number = 1;
  tab: number = 5;
  nb_user: number = 0;
  nb_admin: number = 0;
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
  };
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_admin = parseInt(this.UsersService.decryptString(params['id'],this.UsersService.secret_key));
      console.log(this.id_admin);
    });

    this.UsersService.get_users().subscribe(
      (data: users[]) => {
        this.us2 = data;
       
        this.nb_user = this.calcul_clients();
        this.nb_admin = this.calcul_admin();
      }
    )
    this.UsersService.get_user_by_id(this.id_admin).subscribe(
      (data)=>{
        this.admin=data;

      }
    )
    this.affiche_tasks();
   
  }
  
  calcul_clients(): number {
    let i = 0;
    this.us2.forEach((user) => {
      if (user.admin === false) {
        i++;
        console.log(i);
      }
    });
  
    return i;
  }
  
  calcul_admin(): number {
    let j = 0;
    this.us2.forEach((element) => {
      if (element.admin === true) {
        j++;
      }
    });
  
    return j;
  }
  task_field='';

  add_task():void{
    let tasky:todo={
      id: 0,
      task: ""
    };
    tasky.task=this.task_field;
    if(this.tasks.length>0){
      tasky.id=this.tasks[this.tasks.length-1].id+1;
    }
    else{
      tasky.id=1;
    }
    
    this.UsersService.add_task(tasky).subscribe(
      (data)=>{
        console.log(data);
        console.log("task added");
        this.task_field='';
        this.affiche_tasks();
      }
      
    )

  }
  affiche_tasks():void{
    this.UsersService.get_tasks().subscribe(
      (data: todo[]) => {
        this.tasks = data;
        console.log(data);

      }
    )
  }
  delete_task_by_id(id:number):void{
    this.UsersService.delete_task_by_id(id).subscribe(
      (data)=>{
        console.log(data);
        console.log("task deleted");
        this.affiche_tasks();
      }
    )
  }
  delete_all():void{
    this.UsersService.delete_all_tasks().subscribe(
      (data)=>{
        console.log(data);
        console.log("tasks deleted");
        this.affiche_tasks();
      }
    )
  }
  edit_task(id:number){
    if(this.task_field!=''){
      this.UsersService.update_task(id,this.task_field).subscribe(
        (data)=>{
          console.log(data);
          console.log("task_updated");
          this.affiche_tasks();
        }
      )
    }
    
  }
  
 
}
