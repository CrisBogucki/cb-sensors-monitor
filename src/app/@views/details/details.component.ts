import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseRealtimeDatabaseService} from "../../@services/firebase-realtime-database.service";
import {Utils} from "../../@utils/utils";
import {ActivatedRoute} from "@angular/router";

import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {map, skip, take} from "rxjs/operators";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public lineChartData: ChartDataSets[] = []

  //   { data: [61, 59, 80, 65, 45, 55, 40, 56, 76, 65, 77, 60], label: 'Apple' },
  //   { data: [57, 50, 75, 87, 43, 46, 37, 48, 67, 56, 70, 50], label: 'Mi' },
  // ];

  public lineChartLabels: Label[] = [];

  public lineChartOptions = {
    responsive: true,
    elements: {
      point:{
        radius: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontSize: 10
        }
      }],
      xAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
        ticks: {
          fontSize: 1
        }
      }]
    }
  };

  public lineChartLegend = true;
  public lineChartPlugins = [];


  chartDataSet: any = [];
  sdata: any;
  addressSensor: string | null = "";

  constructor(private route: ActivatedRoute, private dbService: FirebaseRealtimeDatabaseService, private utils: Utils) {

  }

  ngOnInit(): void {

    this.addressSensor = this.route.snapshot.paramMap.get('id');
    this.dbService.getLastByAddress(this.addressSensor)
      .valueChanges()
      .pipe(take(1)).subscribe((data)=>{
        this.chartDataSet = [];
        this.lineChartLabels = [];
        this.lineChartData = [];
        this.sdata = data;

        for (let i = 0; i < this.sdata.length; i++) {
          const _date = this.utils.epochStringToDateTime(this.sdata[i].epochTime);
          for (let v = 0; v < this.sdata[i].value.length; v++) {
            const address = this.sdata[i].value[v].address;
            const tempC = this.sdata[i].value[v].tempC;
            if (address == this.addressSensor) {
              this.chartDataSet.push(tempC);
              this.lineChartLabels.push(_date);
            }
          }
        }

        this.lineChartData.push({data: this.chartDataSet, label: 'tempC'})
      });

    this.getNextData();
  }

  getNextData(): void {
    this.dbService.getLastDefineByAddress(this.addressSensor,1)
      .valueChanges()
      .subscribe((rows)=>{

        for (let i = 0; i < rows.length; i++) {
          const _date = this.utils.epochStringToDateTime(rows[i].epochTime);
          // @ts-ignore
          for (let v = 0; v < rows[i]?.value.length; v++) {
            // @ts-ignore
            const address = rows[i].value[v].address;
            // @ts-ignore
            const tempC = rows[i].value[v].tempC;
            if (address == this.addressSensor) {
              // @ts-ignore
              this.lineChartData[0].data.push(tempC);
              console.log(tempC, _date);
              this.lineChartLabels.push(_date);
            }
          }
        }


      });





  }

  convertToData(text: string): string {
    return this.utils.epochStringToDateTime(text);
  }


}
