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

  public lineChartLabels: Label[] = [];

  public lineChartOptions = {
    bezierCurve: false,
    lineTension: 0,
    responsive: true,
    elements: {
      point:{
        radius: 0
      },
      line: {
        tension: 0.5
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
          fontSize: 12
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
              if(i % 10 == 0){
                this.lineChartLabels.push(_date);
              } else {
                this.lineChartLabels.push("");
              }
            }
          }
        }

        this.lineChartData.push({data: this.chartDataSet, label: 'tempC'})
      });

    this.getNextData();
  }

  getNextData(): void {
    this.lineChartLabels = [];
    this.lineChartData[0].data = [];
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
              if(i % 10000 == 0)
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
