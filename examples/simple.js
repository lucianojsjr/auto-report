const fs = require('fs');
const GreatReports = require('../index');
const GreatReportsPDF = new GreatReports.PDF();

const getColumns = () => {
	return [{
		name: 'Label'
	}, {
		name: 'Date'
	}, {
		name: 'Company'
	}, {
		name: 'User Name'
	}];
};

const getValues = () => {
	let values = [];
	
	for (let rowNumber = 0; rowNumber < 300; rowNumber++) {
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
	fs.readFile('../templates/simple.html', 'utf-8', (err, data) => {
		const columns = [{
			name: 'Name'
		}, {
			name: 'Age'
		}, {
			name: 'Country'
		}];
		const rows = [
			['Mário', 12, 'BR'],
			['Martin', 23, 'US'],
			['Jacque', 22, 'FR']
		];
		
		GreatReportsPDF.init(data);
		GreatReportsPDF.config({
			charset: 'utf-8',
			title: 'New Report'
		});
		
		GreatReportsPDF.render('report_name', 'New Report Name');
		GreatReportsPDF.renderTable(columns, rows, {
			tag: 'table' //The tag that should be replaced.
		});
		GreatReportsPDF.create('./simple.pdf').then(data => console.log(data))
		.catch(err => console.log(err));
	});
};

createReport();

