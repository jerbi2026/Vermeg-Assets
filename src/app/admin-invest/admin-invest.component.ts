import { UsersService } from './../users.service';
import { InvestService } from './../invest.service';
import { Component, OnInit } from '@angular/core';
import { investissement } from './investissement';
import * as XLSX from 'xlsx';

import { investir } from './investir';
import { users } from '../sign-in/users';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-invest',
  templateUrl: './admin-invest.component.html',
  styleUrls: ['./admin-invest.component.css']
})
export class AdminInvestComponent implements OnInit {
  

  projects_traited:investir[]=[];
  projects:investissement[]=[];
  stat_Van:any[]=[];
  stat_Dr:any[]=[];
  stat_Ip:any[]=[];
  stat_Capital:any[]=[];
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


  private arrondi_date(d: number): string {
    const annee: number = Math.floor(d);
    let inter: number = d - annee;
    let result: string = '';
  
    result=`le délai de récupération est : ${annee} annee`;
  
    if (inter > 0) {
      const mois: number = Math.floor(12 * inter);
      inter = (12 * inter) - mois;
      result=result+` ${mois} mois`;
  
      if (inter > 0) {
        const jour: number = Math.floor(inter * 365);
        result=result+` et ${jour} jours`;
      }
      

    }
    return result;
  
  
  }
  id_admin=0;

  constructor(private InvestService:InvestService , private UsersService:UsersService, private router: Router, private route: ActivatedRoute){};
  ngOnInit(): void {
    this.InvestService.get_projects().subscribe(
      (data)=>{
        this.projects=data;
        console.log(this.projects)
        this.stat_Van=this.calcul_stat_projects();
        this.stat_Ip=this.calcul_ip();
        this.stat_Dr=this.calcul_DR();
        this.stat_Capital=this.calcul_capital();
        this.projects_traited=this.traitement_projet();

      }
    )
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
  calcul_stat_projects():any[]{
    let stat_van:any[]=[];
    for (let i = 0; i < this.projects.length; i++) {
      if(this.projects[i].capital<80000){
        const project = this.projects[i];
    
      console.log(project);
    
      stat_van.push({
        name: project.projet,
        series: [
          {
            name: "VAN",
            value: project.van
          },
          {
            name: "Capital",
            value: project.capital
          },
         
        ]
      });

      }
      
    }
    console.log(stat_van);
    return stat_van;


  }
  calcul_ip():any[]{
    let stat_van:any[]=[];
    for (let i = 0; i < this.projects.length-1; i++) {
      const project = this.projects[i];
    
      console.log(project);
    
      stat_van.push({
        name: project.projet,
        series: [
          {
            name: "IP",
            value: project.ip
          },
          {
            name: "DR",
            value: project.dr,
            
            
          },
         
        ]
      });
    }
    console.log(stat_van);
    return stat_van;


  }
  calcul_DR():any[]{
    let stat_van:any[]=[];
    for (let i = 0; i < this.projects.length; i++) {
      const project = this.projects[i];
    
      console.log(project);
    
      stat_van.push({
        name: project.projet,
        value:project.dr
      })
    }
    console.log(stat_van);
    return stat_van;


  }
  calcul_capital():any[]{
    let stat_van:any[]=[];
    for (let i = 0; i < this.projects.length; i++) {
      const project = this.projects[i];
    
      console.log(project);
    
      stat_van.push({
        name: project.projet,
        value:project.capital+'$'
      })
    }
    console.log(stat_van);
    return stat_van;


  }

  traitement_projet():investir[]{
    let traited_projects:investir[]=[];
    this.projects.forEach(projet => {
      let projet_a_traiter:investir={
        id: 0,
        projet: '',
        dr: '',
        ip: 0,
        van: 0,
        capital: 0,
        taux: ''
      }
      projet_a_traiter.projet=projet.projet;
      projet_a_traiter.id=projet.id;
      projet_a_traiter.capital=projet.capital;
      projet_a_traiter.van=projet.van;
      projet_a_traiter.ip=projet.ip;
      projet_a_traiter.taux=(projet.taux*100).toString()+'%';
      projet_a_traiter.dr=this.arrondi_date(projet.dr);
      traited_projects.push(projet_a_traiter);
      
    });
    return traited_projects;

  }
  /************************************************************************ */
  delete_project(id:number){
    this.InvestService.delete_project_by_id(id).subscribe(
      (data)=>{
        alert("project deleted");
        this.projects.splice(0,this.projects.length);
        this.projects_traited.splice(0,this.projects_traited.length);
        this.ngOnInit();

      },
      (error)=>{
        console.error("projet non supprime")
      }
    )

  }
  affiche_add_box=true;
  project_name='';
  project_van=0;
  project_ip=0;
  project_dr=0;
  project_taux=0;
  project_capital=0;
  
  warning='';
  add_project(){
    this.affiche_add_box=false;
    this.project_name='';
    this.project_van=0;
    this.project_ip=0;
    this.project_dr=0;
    this.project_taux=0;
    this.project_capital=0;
  }
  add_new_project(){
    if( this.project_name!='' && this.project_van!=0 && this.project_ip!=0 &&this.project_dr!=0 &&this.project_capital!=0 &&this.project_taux!=0  ){
      let new_project:investissement={
        id: 0,
        projet: '',
        dr: 0,
        ip: 0,
        van: 0,
        capital: 0,
        taux: 0
      }
      new_project.id=this.projects[this.projects.length-1].id+1;
      new_project.capital=this.project_capital;
      new_project.dr=this.project_dr;
      new_project.van=this.project_van;
      new_project.taux=this.project_taux;
      new_project.ip=this.project_ip;
      new_project.projet=this.project_name;
      this.InvestService.add_project(new_project).subscribe(
        (data)=>{
          console.log(data);
          alert("project added successfully");
          this.cancel_add();
          this.projects.splice(0,this.projects.length);
          this.projects_traited.splice(0,this.projects_traited.length);
          this.ngOnInit();


        },
        (error)=>{
          console.error("project not added...");
        }
      );


    }
    else{
      alert("you must fill all the fields")
    }
  }
  cancel_add(){
    this.affiche_add_box=true;
    this.project_name='';
    this.project_van=0;
    this.project_ip=0;
    this.project_dr=0;
    this.project_taux=0;
    this.project_capital=0;

  }
  downloadExcelFile(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.projects_traited);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'table_projets');
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
