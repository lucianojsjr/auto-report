const fs = require('fs');
const AutoReport = require('../../index');
const AutoReportPDF = new AutoReport.PDF();

const createReport = () => {
	fs.readFile('./pdf-chart-template.html', 'utf-8', (err, template) => {
		AutoReportPDF.init(template);
		AutoReportPDF.config({
			charset: 'utf-8',
			style: ['./pdf-chart.css']
		});
		
		AutoReportPDF.render('company_name', 'Custom Company');
		AutoReportPDF.render('report_name', 'Sale Chart');
		AutoReportPDF.render('date', 'Report Date: 20/10/2010');
		AutoReportPDF.render('logo_url', 'https://cdn.iconscout.com/public/images/icon/free/png-512/financial-analysis-report-card-reporting-valuation-3e6ec64bf68be326-512x512.png');
		AutoReportPDF.renderChart('linear_chart',  {
			"title": {
				"text": "Solar Employment Growth by Sector, 2010-2016"
			},
			"subtitle": {
				"text": "Source: thesolarfoundation.com"
			},
			"yAxis": {
				"title": {
					"text": "Number of Employees"
				}
			},
			"legend": {
				"layout": "vertical",
				"align": "right",
				"verticalAlign": "middle"
			},
			"plotOptions": {
				"series": {
					"animation": false,
					"label": {
						"connectorAllowed": false
					},
					"pointStart": 2010
				}
			},
			"series": [{
				"name": "Installation",
				"data": [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
			}, {
				"name": "Manufacturing",
				"data": [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
			}, {
				"name": "Sales & Distribution",
				"data": [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
			}, {
				"name": "Project Development",
				"data": [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
			}, {
				"name": "Other",
				"data": [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
			}]
		});
		AutoReportPDF.renderChart('pie_chart', {
			"chart": {
				"plotBackgroundColor": null,
				"plotBorderWidth": null,
				"plotShadow": false,
				"type": "pie"
			},
			"title": {
				"text": "Browser market shares in January, 2018"
			},
			"tooltip": {
				"pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
			},
			"plotOptions": {
				"pie": {
					"allowPointSelect": true,
					"cursor": "pointer",
					"dataLabels": {
						"enabled": false
					},
					"showInLegend": true
				}
			},
			"series": [
				{
					"name": "Brands",
					"colorByPoint": true,
					"data": [
						{
							"name": "Chrome",
							"y": 61.41,
							"sliced": true,
							"selected": true
						},
						{
							"name": "Internet Explorer",
							"y": 11.84
						},
						{
							"name": "Firefox",
							"y": 10.85
						},
						{
							"name": "Edge",
							"y": 4.67
						},
						{
							"name": "Safari",
							"y": 4.18
						},
						{
							"name": "Other",
							"y": 7.05
						}
					]
				}
			]
		});
		
		AutoReportPDF.create('./pdf-chart.pdf').then(data => console.log(data))
		  .catch(err => console.log(err));
	});
};

createReport();

