import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter2';
import { Dimension } from 'crossfilter2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public yearDim: any;
  public spendPerYear: any;
  public spendDim: any;
  public spendHist: any;
  public nonEmptyHist: any;
  public nameDim: any;
  public spendPerName: any;

  private yearRingChart: dc.pieChart;
  private spendHistChart: dc.barChart;
  private spenderRowChart: dc.rowChart;
  //spenderRowChart= dc.rowChart("#chart-row-spenders");
// use static or load via d3.csv("spendData.csv").then(function(spendData) {/* do stuff */});
 spendData = [
    {Name: 'Mr A', Spent: 40, Year: 2011},
    {Name: 'Mr B', Spent: 10, Year: 2011},
    {Name: 'Mr C', Spent: 40, Year: 2011},
    {Name: 'Mr A', Spent: 70, Year: 2012},
    {Name: 'Mr B', Spent: 20, Year: 2012},
    {Name: 'Mr B', Spent: 50, Year: 2013},
    {Name: 'Mr C', Spent: 30, Year: 2013}
];

ndx = crossfilter(this.spendData);

  constructor() {
   }


  ngOnInit() {
    this.paintChart()
  }

  remove_empty_bins(source_group) {
    return {
        all:function () {
            return source_group.all().filter(function(d) {
                return d.value != 0;
            });
        }
    };
}


  paintChart(){
     this.yearRingChart = dc.pieChart('#chart-ring-year');
     this.spendHistChart = dc.barChart('#chart-hist-spend')
     this.spenderRowChart = dc.rowChart("#chart-row-spenders");

     this.yearDim  = this.ndx.dimension(function(d) {return +d.Year});
     this.spendDim = this.ndx.dimension(function(d) {return Math.floor(d.Spent/10);}),

     this.spendPerYear = this.yearDim.group().reduceCount();
     this.yearRingChart.width(200).height(200).dimension(this.yearDim).group(this.spendPerYear);

     this.spendHist    = this.spendDim.group().reduceCount();
     this.nonEmptyHist = this.remove_empty_bins(this.spendHist)

     this.nameDim  = this.ndx.dimension(function(d) {return d.Name;}),
     this.spendPerName = this.nameDim.group().reduceSum(function(d) {return +d.Spent;}),

     this.spendHistChart
    .width(300).height(200)
    .dimension(this.spendDim)
    .group(this.nonEmptyHist)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .elasticX(true)
    .elasticY(true);

    this.spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
    this.spendHistChart.yAxis().ticks(2);

    this.spenderRowChart
    .width(350).height(200)
    .dimension(this.nameDim)
    .group(this.spendPerName)
    .elasticX(true);

     dc.renderAll();
  }

}
