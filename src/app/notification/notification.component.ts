import { registration } from './../sign-in/registration';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { transaction } from './transaction';
import { users } from '../sign-in/users';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  id_searched: string='';
  constructor(public UsersService:UsersService,private router: Router, private route: ActivatedRoute){}
  transactions:transaction[]=[];
  registrations:registration[]=[];

  p=1;
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
  users:users[]=[];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_admin = parseInt(this.UsersService.decryptString(params['id'],this.UsersService.secret_key));
      console.log(this.id_admin);
    });
    this.UsersService.get_transactions().subscribe(
      (data)=>{
          this.transactions=data;
          
      }
    )
    this.UsersService.get_registration().subscribe(
      (data)=>{
        this.registrations=data;
      }
    ) 
    this.UsersService.get_user_by_id(this.id_admin).subscribe(
      (data)=>{
        this.admin=data;

      }
    )
   
    
    this.UsersService.get_users().subscribe(
      (data)=>{
        this.users=data;

      }
    )
    

  }
  delete_registration(email:string):void{
    this.UsersService.delete_registration_by_id(email).subscribe(
      (data)=>{
        alert("registration deleted successfully...");
        this.ngOnInit();

      }
    )
   

  }
  search_id(id:number){
    let ok=false;
    for(let i=0;i<this.users.length;i++){
      if(this.users[i].id==id){
        ok=true;
        break;
      }
    }
    if(ok==false){
      alert("verifier les données, ce n'est pas possible, il faut contacter le developpeur backend de site");
    }
    else{
      this.id_searched= this.UsersService.encryptString(id.toString(),this.UsersService.secret_key);
      this.router.navigate([`user/${this.id_searched}`]);
    }


  }

  downloadExcelFile(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.transactions);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'table_transactions');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });

    // Create a temporary anchor element to trigger the download
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = URL.createObjectURL(data);
    a.download = `${fileName}.xlsx`;
    a.click();

    // Release the object URL immediately after the download
    URL.revokeObjectURL(a.href);
  }

  

}
