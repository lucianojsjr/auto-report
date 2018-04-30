const fs = require('fs');
const AutoReport = require('../../index');
const AutoReportPDF = new AutoReport.PDF();

const createReport = () => {
	fs.readFile('./simple-template.html', 'utf-8', (err, data) => {
		AutoReportPDF.init(data);
		AutoReportPDF.render('user_name', 'Bela Ciao!');
		AutoReportPDF.create('./simple.pdf')
		  .then(data => console.log(data))
		  .catch(err => console.log(err));
	});
};

createReport();

