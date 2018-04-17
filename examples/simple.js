const fs = require('fs');
const GreatReportsPDF = require('../index').pdf;

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
		GreatReportsPDF.init(data);
		
		GreatReportsPDF.config({
			charset: 'utf-8',
			title: 'New Report',
			show_footer: true
		});
		
		GreatReportsPDF.renderTable(getColumns(), getValues(), ['name', 'date', 'company_name', 'teste']);
		GreatReportsPDF.create('./simple.pdf').then(data => console.log(data))
		.catch(err => console.log(err));
	});
};

createReport();

