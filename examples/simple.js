const fs = require('fs');
const GreatReport = require('../lib/great-report');

const getColumns = () => {
	return [{
		name: 'Label'
	}, {
		name: 'Date'
	}, {
		name: 'Company'
	}, {
		name: 'User Name'
	}]
};

const getValues = () => {
	let values = [];
	
	for (let rowNumber = 0; rowNumber < 330; rowNumber++) {
		values.push({
			name: `Row ${rowNumber}`,
			date: '2010-10-12',
			company_name: 'The Company',
			user: {
				name: `User ${rowNumber}`
			}
		});
	}
	
	return values;
};

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
		
		greatReport.renderTable(getColumns(), getValues(), ['name', 'date', 'company_name', 'user.name']);
		greatReport.create('./simple.pdf').then(data => console.log(data)).catch(err => console.log(err));
	});
};

createReport();

