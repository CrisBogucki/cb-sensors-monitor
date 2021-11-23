import {Component, OnInit} from '@angular/core';
import {FirebaseRealtimeDatabaseService} from "../../@services/firebase-realtime-database.service";
import {SensorModel} from "../../@models/SensorModel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tempCoOut: string = "";
  tempCoIn: string = "";
  tempCwuOut: string = "";
  tempOut: string = "";

  data: SensorModel[] = [];

  constructor(private dbService: FirebaseRealtimeDatabaseService) {
  }

  ngOnInit(): void {
    this.dbService.getCurrent().valueChanges().subscribe((data) => {
      this.data = data;
      console.log(this.data);
      // @ts-ignore
      this.tempCoOut = this.data[0]?.value[3].tempC + "℃";
      // @ts-ignore
      this.tempCoIn = this.data[0]?.value[1].tempC + "℃";
      // @ts-ignore
      this.tempCwuOut = this.data[0]?.value[2].tempC + "℃";
      // @ts-ignore
      this.tempOut = this.data[0]?.value[0].tempC + "℃";
    })
  }

}
