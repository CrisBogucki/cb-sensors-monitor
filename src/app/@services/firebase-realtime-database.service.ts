import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Observable} from "rxjs";
import {SensorModel} from "../@models/SensorModel";


@Injectable({
  providedIn: 'root'
})
export class FirebaseRealtimeDatabaseService {

  // @ts-ignore
  sensors: AngularFireList<SensorModel> = null;
  private dbPath = "temp-history";

  constructor(private db: AngularFireDatabase) {
    this.sensors = this.db.list<SensorModel>(this.dbPath);
  }

  getAll() :AngularFireList<SensorModel> {
    return this.sensors;
  }

  getCurrent() :AngularFireList<SensorModel> {
    return this.db.list<SensorModel>(this.dbPath, ref => {
      return ref.limitToLast(1).orderByKey();
    });
  }

  getLastByAddress(addressSensor: string | null) :AngularFireList<SensorModel> {
    return this.db.list<SensorModel>(this.dbPath, ref => {
      return ref.limitToLast(10000).orderByKey();
    });
  }

  getLastDefineByAddress(addressSensor: string | null, countLast: number) :AngularFireList<SensorModel> {
    return this.db.list<SensorModel>(this.dbPath, ref => {
      return ref.limitToLast(countLast).orderByKey();
    });
  }


}
