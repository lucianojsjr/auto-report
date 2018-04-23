const GreatReportsPDF = require('../index').pdf;
const expect = require('chai').expect;

describe('GreatReportsPDF module', () => {
	const template = '{{@element}}';
	
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
		
		filePath = './test.pdf';

		GreatReportsPDF.init(template);
		create = GreatReportsPDF.create(filePath);
		
		expect(create.then).to.be.a('function');
		expect(create.catch).to.be.a('function');
		create.then(response => expect(response).to.have.own.property('filename'));
	});
});