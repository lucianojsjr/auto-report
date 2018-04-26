const expect = require('chai').expect;
const AutoReport = require('../../index');
const AutoReportPDF = new AutoReport.PDF();

describe('AutoReportPDF module', () => {
	it('Should be an object', () => {
		expect(AutoReportPDF).to.be.a('object');
	});
	
	it('Should has pdf functions', () => {
		expect(AutoReportPDF.init).to.be.a('function');
		expect(AutoReportPDF.config).to.be.a('function');
		expect(AutoReportPDF.render).to.be.a('function');
		expect(AutoReportPDF.renderTable).to.be.a('function');
		expect(AutoReportPDF.renderGroupedTable).to.be.a('function');
		expect(AutoReportPDF.create).to.be.a('function');
	});
	
	it('Should create the pdf', () => {
		let create;
		let filePath;
		const template = '{{@element}}';
		
		filePath = './test.pdf';
		
		AutoReportPDF.init(template);
		create = AutoReportPDF.create(filePath);
		
		expect(create.then).to.be.a('function');
		expect(create.catch).to.be.a('function');
		create.then(response => expect(response).to.have.own.property('status' ));
	});
});