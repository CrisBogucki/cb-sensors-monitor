import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import * as moment from "moment/moment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  data: any = [];

  toggle: boolean = false;


  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    const ref = this.db.list("temp-history", ref => {
      return ref.limitToLast(25).orderByKey();
    });

    ref.valueChanges().pipe().subscribe((data)=> {
      this.data = data;
    })
  }

  toDateTime(epoch: number){
    const day = moment.unix(epoch); //seconds
    return day.add(0, "hour").format('YYYY-MM-DD HH:mm:ss');
  }

}
