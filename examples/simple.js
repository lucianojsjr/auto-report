const fs = require('fs');
const AutoReport = require('../index');
const AutoReportPDF = new AutoReport.PDF();

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
		
		AutoReportPDF.init(data);
		AutoReportPDF.config({
			charset: 'utf-8',
			title: 'New Report',
			show_footer: true
		});
		
		AutoReportPDF.render('report_name', 'New Report Name');
		AutoReportPDF.renderTable(columns, rows, {
			tag: 'table' //The tag that should be replaced.
		});
		AutoReportPDF.create('./simple.pdf').then(data => console.log(data))
		.catch(err => console.log(err));
	});
};

createReport();

