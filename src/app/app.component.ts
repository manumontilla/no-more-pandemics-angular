import { OnInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { FirestoreService } from './services/firestore/firestore.service';
import { FormControl } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class AppComponent  implements OnInit  {
  title = 'no-more-pan';
  public map;
  public symptoms = [];
  public symptomsId = [];
  date = new FormControl(moment());
  public selectedSymtoms = [];
  public colors: string [] = ["#ff1744","#d500f9","#3d5afe","#00b0ff","#1de9b6","#76ff03","#ffea00","#ff9100","#ff3d00","#5d4037","#d81b60","#5e35b1","#1e88e5"];
  

  

  private  matrix = []

  constructor( private firestoreService: FirestoreService) { }

  ngOnInit(): void {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
           
      });
    }


     this.map = L.map('map').setView([51.505, -0.09], 13);


     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.map.setView([pos.coords.latitude, pos.coords.longitude], 11);
      });
    }
    else {
      
    }




    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.loadSymtoms();

  }

  loadSymtoms() {
    this.firestoreService.getSintomas().subscribe((snapshot) => {
      this.symptoms = [];
      this.symptomsId = [];
      snapshot.forEach((data: any) => {
        this.symptomsId.push(data.payload.doc.id);
        this.symptoms.push({
          id: data.payload.doc.id,
          name: data.payload.doc.data().nombre
        });
      });
    });
  }


  checkValue(values:any, id:string) {
    if (this.selectedSymtoms.includes(id)) {
      //remove
      const index = this.selectedSymtoms.indexOf(id, 0);
      if (index > -1) {
        this.selectedSymtoms.splice(index, 1);
      }

      this.deletePoints(id);
      
    } else {
      //add
      this.selectedSymtoms.push(id);
      this.loadData(id);
    }
    //if (this.selectedSymtoms.length>0)
   // {
     
   // }
  }

  deletePoints(id:string) {

    let index_to_remove = [];
    let index_selected = 0;
    this.matrix.forEach(el => {
     if(el.symtom == id)
      {
        this.map.removeLayer(el.point);
        index_to_remove.push(index_selected)
      }
      index_selected +=1;
    })
    

  
  }

  deleteallPoints() {
        this.matrix.forEach(
          el => {
            this.map.removeLayer(el.point);
          }
        );
        this.matrix = [];
    }



  changeDate (type: string, event: any) {
    this.deleteallPoints();
    if (this.selectedSymtoms.length > 0)
    {
       this.selectedSymtoms.forEach(id => {
         this.loadData(id);
      });
    }
  }

  loadData(symtomId:string) {
    this.firestoreService.getData(this.date.value.toDate(),symtomId).subscribe((snapshot) => {
      snapshot.forEach((data: any) => {

        var latitude = data.payload.doc.data().localizacion.latitude + (Math.random() - 0.5) / 100.0; 
        var logintude = data.payload.doc.data().localizacion.longitude - (Math.random() - 0.5) / 100.0;
        var circle = L.circle([latitude, logintude], {
          color: this.colors[this.symptomsId.indexOf(data.payload.doc.data().sintoma.id)],
          fillColor: this.colors[this.symptomsId.indexOf(data.payload.doc.data().sintoma.id)],
          fillOpacity: 0.9,
          radius: 120
          });

          this.matrix.push(
            {symtom : data.payload.doc.data().sintoma.id, point : circle}
          );

          circle.addTo(this.map);

         
      });
    });
  }

}
