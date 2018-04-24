const expect = require('chai').expect;
const GreatReports = require('../../index');
const GreatReportsPDF = new GreatReports.PDF();

describe('GreatReportsPDF module', () => {
	it('Should be an object', () => {
		expect(GreatReportsPDF).to.be.a('object');
	});
	
	it('Should has pdf functions', () => {
		expect(GreatReportsPDF.init).to.be.a('function');
		expect(GreatReportsPDF.config).to.be.a('function');
		expect(GreatReportsPDF.render).to.be.a('function');
		expect(GreatReportsPDF.renderTable).to.be.a('function');
		expect(GreatReportsPDF.renderGroupedTable).to.be.a('function');
		expect(GreatReportsPDF.create).to.be.a('function');
	});
	
	it('Should create the pdf', () => {
		let create;
		let filePath;
		const template = '{{@element}}';
		
		filePath = './test.pdf';
		
		GreatReportsPDF.init(template);
		create = GreatReportsPDF.create(filePath);
		
		expect(create.then).to.be.a('function');
		expect(create.catch).to.be.a('function');
		create.then(response => expect(response).to.have.own.property('status' ));
	});
});