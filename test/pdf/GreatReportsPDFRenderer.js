const expect = require('chai').expect;
let PDFRenderer = require('../../lib/pdf/great-reports-pdf-renderer');
let GreatReportsPDFRenderer = new PDFRenderer();

describe('GreatReportsPDFRenderer module', () => {
	it('Should be an object', () => {
		expect(GreatReportsPDFRenderer).to.be.a('object');
	});
	
	it('Should has render functions', () => {
		expect(GreatReportsPDFRenderer.setTemplate).to.be.a('function');
		expect(GreatReportsPDFRenderer.getTemplate).to.be.a('function');
		expect(GreatReportsPDFRenderer.addCSS).to.be.a('function');
		expect(GreatReportsPDFRenderer.renderFooter).to.be.a('function');
		expect(GreatReportsPDFRenderer.renderTable).to.be.a('function');
		expect(GreatReportsPDFRenderer.renderGroupedTable).to.be.a('function');
	});
	
	it('Should set and get a template', () => {
		const firstTemplate = '{{@element1}}';
		const secondTemplate = '{{@element2}}';
		
		GreatReportsPDFRenderer.setTemplate(firstTemplate);
		expect(GreatReportsPDFRenderer.getTemplate()).to.equal(firstTemplate);
		
		GreatReportsPDFRenderer.setTemplate(secondTemplate);
		expect(GreatReportsPDFRenderer.getTemplate()).to.equal(secondTemplate);
	});
	
	it('Should support multiple instances', () => {
		const template = '{{@element}}';
		const firstInstance = new PDFRenderer();
		const secondInstance = new PDFRenderer();
		
		firstInstance.setTemplate(template);
		secondInstance.setTemplate(template);
		
		firstInstance.render('element', 'instance1');
		secondInstance.render('element', 'instance2');
		
		expect(firstInstance.getTemplate()).to.equal('instance1');
		expect(secondInstance.getTemplate()).to.equal('instance2');
	});
	
	it('Should render a tag', () => {
		const value = 'tag-value';
		const template = '{{@element}}';
		
		GreatReportsPDFRenderer.setTemplate(template);
		GreatReportsPDFRenderer.render('element', value);
		
		expect(GreatReportsPDFRenderer.getTemplate()).to.equal(value);
	});
	
	it('Should render styles', () => {
		const css = '.test-class { "background-color":red"; }';
		const templateWithStyle = '<html><head>{{#css}}</head></html>';
		
		GreatReportsPDFRenderer.setTemplate(templateWithStyle);
		GreatReportsPDFRenderer.addCSS(css);
		
		expect(GreatReportsPDFRenderer.getTemplate()).to.have.string(css);
	});
});