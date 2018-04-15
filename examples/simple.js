const fs = require('fs');
const GreatReport = require('../lib/great-report');

const createReport = () => {
	let greatReport;
	
	fs.readFile('../templates/simple.html', 'utf-8', (err, data) => {
		greatReport = new GreatReport(data);
		
		greatReport.config({
			charset: 'utf-8',
			title: 'New Report'
		});
		
		greatReport.renderHeader({
			report_name: 'New Report'
		});
		
		greatReport.create('./simple.pdf').then(data => console.log(data)).catch(err => console.log(err));
	});
};

createReport();

