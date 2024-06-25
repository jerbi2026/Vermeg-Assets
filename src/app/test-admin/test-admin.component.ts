import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { users } from '../sign-in/users';
@Component({
  selector: 'app-test-admin',
  styleUrls: ['./test-admin.component.css'],
  templateUrl: './test-admin.component.html',
})
export class TestAdminComponent  implements OnInit {
  constructor(private UsersService:UsersService){};
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Countries';
  yAxisLabel = 'Clients';
  Countries:string[]=[];
  Nb_client_per_count:number[]=[];
  Nb_solde_per_count:number[]=[];
  nb_anne:string[]=[];
  nb_client_per_annee:number[]=[];


  


  us2: users[] = [];
  barChartData: any[] = [];

  barChartData2: any[] = [];
  barchartdata_anne:any[]=[];

  ngOnInit(): void {
    
    this.UsersService.get_users().subscribe(
      (data: users[]) => {
        this.us2 = data;
        console.log(data);
  
        this.barChartData=this.calcul_stat_clients(this.Nb_client_per_count, this.Countries);
        this.barChartData2=this.calcul_stat_solde(this.Nb_solde_per_count, this.Countries);
        this.barchartdata_anne=this.calcul_stat_client_per_annee(this.nb_anne,this.nb_client_per_annee);
      },
      (error) => {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    );
  }
  
  calcul_stat_clients(Nb_client_per_count:number[],Countries:string []):any[]{
    let barChartData:any[]=[]
    Nb_client_per_count.length = 0;
  Countries.length = 0;
  barChartData.length = 0;

  this.us2.forEach(user => {
    if (user.admin === false) {
      const index = Countries.findIndex(place => place.toLowerCase() === user.place.toLowerCase());
      if (index === -1) {
        Countries.push(user.place);
        Nb_client_per_count.push(1); 
      } else {
        Nb_client_per_count[index]++; 
        
      }
    }
  });

  for (let i = 0; i < Countries.length; i++) {
    console.log(Countries[i] + "         " + Nb_client_per_count[i]);
    barChartData.push({
      name: Countries[i],
      value: Nb_client_per_count[i]
    });
    console.log(barChartData[i]);

  }
  return barChartData;

  } 



  calcul_stat_solde(Nb_solde_per_count:number[],Countries:string []):any[]{
    let barChartData:any[]=[]
    Nb_solde_per_count.length = 0;
  Countries.length = 0;
  barChartData.length = 0;

  this.us2.forEach(user => {
    if (user.admin === false) {
      const index = Countries.findIndex(place => place.toLowerCase() === user.place.toLowerCase());
      if (index === -1) {
        Countries.push(user.place);
        Nb_solde_per_count.push(user.solde); 
      } else {
        Nb_solde_per_count[index]+=user.solde; 
        
      }
    }
  });

  for (let i = 0; i < Countries.length; i++) {
    barChartData.push({
      name: Countries[i],
      value: Nb_solde_per_count[i]
    });
    console.log(barChartData[i]);

  }
  console.log(barChartData);
  return barChartData;

  } 
 
  /*************************************************/
  calcul_stat_client_per_annee(nb_anne:string[],nb_client_per_annee:number []):any[]{
    let barChartData:any[]=[]
    nb_client_per_annee.length = 0;
    nb_anne.length = 0;
  barChartData.length = 0;

  this.us2.forEach(user => {
    if (user.admin === false) {
      const index = nb_anne.findIndex(date_embauche => date_embauche === user.date_embauche.toString());
      if (index === -1) {
        nb_anne.push(user.date_embauche.toString());
        nb_client_per_annee.push(1); 
      } else {
        nb_client_per_annee[index]++; 
        
      }
    }
  });

  for (let i = 0; i < nb_anne.length; i++) {
    console.log(nb_anne[i] + "         " + nb_client_per_annee[i]);
    barChartData.push({
      name: nb_anne[i],
      value: nb_client_per_annee[i]
    });
    console.log(barChartData[i]);

  }
  return barChartData;

  } 



}
