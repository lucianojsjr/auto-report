const cheerio = require('cheerio');
const expect = require('chai').expect;
const AutoReport = require('../../index');
const AutoReportPDF = new AutoReport.PDF();

describe('AutoReportPDF module', () => {
	const filePath = './test/test.pdf';
	const template = '{{@element}}';
	
	before(() => {
		AutoReportPDF.init(template);
	});
	
	it('Should be an object', () => {
		expect(AutoReportPDF).to.be.a('object');
	});
	
	it('Should has pdf functions', () => {
		expect(AutoReportPDF.init).to.be.a('function');
		expect(AutoReportPDF.config).to.be.a('function');
		expect(AutoReportPDF.addStyle).to.be.a('function');
		expect(AutoReportPDF.render).to.be.a('function');
		expect(AutoReportPDF.renderTable).to.be.a('function');
		expect(AutoReportPDF.renderGroupedTable).to.be.a('function');
		expect(AutoReportPDF.create).to.be.a('function');
	});
	
	it('Should add style to page', () => {
		const filepath = `${__dirname}/../../lib/css/auto-report.css`;
		
		AutoReportPDF.config({
			css: [filepath]
		});
		
		AutoReportPDF.addStyle((error, template) => {
			const $ = cheerio.load(template);
			
			expect($('head > style').length).to.equal(1);
		});
	});
	
	it('Should create the pdf', () => {
		const create = AutoReportPDF.create(filePath);
		
		expect(create.then).to.be.a('function');
		expect(create.catch).to.be.a('function');
		create.then(response => expect(response).to.have.own
		  .property('status'));
	});
});