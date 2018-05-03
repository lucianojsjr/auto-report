const fs = require('fs');
const AutoReport = require('../../index');
const AutoReportPDF = new AutoReport.PDF();

const getColumns = () => {
	return [{
		name: 'Date'
	}, {
		name: 'Name'
	}, {
		name: 'Itens'
	}, {
		name: 'Total Price'
	}];
};

const getValues = () => {
	let values = [];
	
	for (let rowNumber = 1; rowNumber < 2; rowNumber++) {
		values.push({
			date: '10/10/2010',
			user: {
				name: `Sr(a). Number ${rowNumber}`
			},
			itens: `${rowNumber + 1} Shoes,${rowNumber + 2} Glass, and ${rowNumber + 3} Pants`,
			price: `R$ ${(rowNumber * 1.12).toFixed(2)}`
		});
	}
	
	return values;
};

const createReport = () => {
	fs.readFile('./pdf-table-template.html', 'utf-8', (err, template) => {
		AutoReportPDF.init(template);
		AutoReportPDF.config({
			charset: 'utf-8',
			style: ['./pdf-table.css'],
			footer: {
				height: '35px',
				template: '<p style="width: auto;border: 1px solid red;font-size: 10px; padding-top: 5px; margin-bottom: -10px">Pages {{ @page }} of {{ @pages }}</p>'
			}
		});
		
		AutoReportPDF.render('company_name', 'Custom Company');
		AutoReportPDF.render('report_name', 'Sale History');
		AutoReportPDF.render('date', 'Report Date: 20/10/2010');
		AutoReportPDF.render('logo_url', 'https://cdn.iconscout.com/public/images/icon/free/png-512/financial-analysis-report-card-reporting-valuation-3e6ec64bf68be326-512x512.png');
		
		AutoReportPDF.renderTable(getColumns(), getValues(), {
			tag: 'table',
			class: 'default-table',
			properties: ['date', 'user.name', 'itens', 'price']
		});
		
		AutoReportPDF.create('./pdf-table.pdf').then(data => console.log(data))
		  .catch(err => console.log(err));
	});
};

createReport();

