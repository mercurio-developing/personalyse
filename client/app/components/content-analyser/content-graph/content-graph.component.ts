import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-graph',
  templateUrl: './content-graph.component.html',
  styleUrls: ['./content-graph.component.css']
})
export class ContentGraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Pie
  public pieChartLabels: string[] = ["Links", "Images", "Videos"];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string = 'pie';
  public pieChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',

    }
  ];
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
