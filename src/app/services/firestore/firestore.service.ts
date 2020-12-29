import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}
  // Obtiene todos los gatos
  public getSintomas() {
    return this.firestore.collection('sintomas').snapshotChanges();
  }

  public getData(d :Date, symtomId: string )
  {
    var date_ini: Date = new Date(d);
    var date_finish: Date = new Date(d);
    date_ini.setHours(0);
    date_ini.setMinutes(0);
    date_ini.setSeconds(0);
    date_ini.setMilliseconds(0);
    date_finish.setHours(23);
    date_finish.setMinutes(59);
    date_finish.setSeconds(59);
    date_finish.setMilliseconds(999);
    return this.firestore.collection('sintomas_usuario', ref => ref.where('fecha', '>=', date_ini)
    .where('fecha', '<=', date_finish)
    .where('idSintoma', '==', symtomId)
    ).snapshotChanges();
  }
}
