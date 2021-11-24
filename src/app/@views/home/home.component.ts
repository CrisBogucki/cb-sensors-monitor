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

  tempCoOut: any = "0";
  tempCoIn: any = "0";
  tempCwuOut: any = "0";
  tempOut: any = "0";

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
      console.log("TU",this.data);
      if(this.data.length == 0)
        return;

      this.datetime = this.utils.epochStringToDateTime(this.data[0].epochTime);

      this._tempCoOut = this.utils.stringToFloat(this.tempCoOut?.replace("℃",""));
      this._tempCoIn= this.utils.stringToFloat(this.tempCoIn?.replace("℃",""));
      this._tempCwuOut= this.utils.stringToFloat(this.tempCwuOut?.replace("℃",""));
      this._tempOut= this.utils.stringToFloat(this.tempOut?.replace("℃",""));

      // @ts-ignore
      this.tempCoOut = this.utils.stringToFloat(this.data[0]?.value[3].tempC);
      // @ts-ignore
      this.tempCoIn = this.utils.stringToFloat(this.data[0]?.value[1].tempC);
      // @ts-ignore
      this.tempCwuOut = this.utils.stringToFloat(this.data[0]?.value[2].tempC);
      // @ts-ignore
      this.tempOut = this.utils.stringToFloat(this.data[0]?.value[0].tempC);
    })
  }
}
