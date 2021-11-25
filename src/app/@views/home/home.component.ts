import {Component, OnInit} from '@angular/core';
import {FirebaseRealtimeDatabaseService} from "../../@services/firebase-realtime-database.service";
import {SensorModel} from "../../@models/SensorModel";
import {Utils} from "../../@utils/utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tempCoOut: any;
  tempCoIn: any;
  tempCwuOut: any;
  tempOut: any;

  _tempCoOut: any = "0";
  _tempCoIn: any = "0";
  _tempCwuOut: any = "0";
  _tempOut: any = "0";

  datetime: string = "";

  data: SensorModel[] = [];

  constructor(private dbService: FirebaseRealtimeDatabaseService, private utils: Utils) {
  }

  ngOnInit(): void {
    this.dbService.getCurrent().valueChanges().subscribe((data) => {
      this.data = data;

      if(this.data.length == 0)
        return;

      this.datetime = this.utils.epochStringToDateTime(this.data[0]?.epochTime);

      this._tempCoOut = this.utils.stringToFloat(this.tempCoOut?.tempC);
      this._tempCoIn= this.utils.stringToFloat(this.tempCoIn?.tempC);
      this._tempCwuOut= this.utils.stringToFloat(this.tempCwuOut?.tempC);
      this._tempOut= this.utils.stringToFloat(this.tempOut?.tempC);

      // @ts-ignore
      this.tempCoOut = this.data[0]?.value[3];
      // @ts-ignore
      this.tempCoIn = this.data[0]?.value[1];
      // @ts-ignore
      this.tempCwuOut = this.data[0]?.value[2];
      // @ts-ignore
      this.tempOut = this.data[0]?.value[0];
    })
  }
}
