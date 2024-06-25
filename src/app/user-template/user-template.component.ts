import { id } from '@swimlane/ngx-charts';
import { ActivatedRoute, Router } from '@angular/router';
import { FileServiceService } from '../file-service.service';
import { users } from '../sign-in/users';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.css']
})
export class UserTemplateComponent implements OnInit {

  fileContent: string='';
  constructor(private UsersService:UsersService, private fileService: FileServiceService, private router:Router, private route:ActivatedRoute){}
  us2:users[]=[];
  async readFile(fileContent:string):Promise<void> {
    const filePath = '/assets/image/actions.txt';
    try {
      fileContent = await this.fileService.readTextFile(filePath);
      
    this.UsersService.nombre_actions_total=parseInt(fileContent);
      console.log("the content "+fileContent );
      } catch (error) {
      console.error('Error reading file:', error);
      fileContent = 'Error reading file';
      }
    
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

  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_admin = parseInt(this.UsersService.decryptString(params['id'],this.UsersService.secret_key));
      console.log(this.id_admin);
    });
    this.UsersService.get_user_by_id(this.id_admin).subscribe(
      (data)=>{
        this.admin=data;
    

      }
    )
    this.UsersService.get_users().subscribe(
      (data: users[]) => {
        this.us2 = data;
        console.log(data);
  
       
      },
      (error) => {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    );
    this.readFile(this.fileContent);
    
    
  }
  

}
