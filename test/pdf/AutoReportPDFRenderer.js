const expect = require('chai').expect;
const PDFRenderer = require('../../lib/pdf/auto-report-pdf-renderer');
let AutoReportPDFRenderer = new PDFRenderer();

describe('AutoReportPDFRenderer module', () => {
	it('Should be an object', () => {
		expect(AutoReportPDFRenderer).to.be.a('object');
	});
	
	it('Should has render functions', () => {
		expect(AutoReportPDFRenderer.setTemplate).to.be.a('function');
		expect(AutoReportPDFRenderer.getTemplate).to.be.a('function');
		expect(AutoReportPDFRenderer.addCSS).to.be.a('function');
		expect(AutoReportPDFRenderer.renderFooter).to.be.a('function');
		expect(AutoReportPDFRenderer.renderTable).to.be.a('function');
		expect(AutoReportPDFRenderer.renderGroupedTable).to.be.a('function');
	});
	
	it('Should set and get a template', () => {
		const firstTemplate = '{{@element1}}';
		const secondTemplate = '{{@element2}}';
		
		AutoReportPDFRenderer.setTemplate(firstTemplate);
		expect(AutoReportPDFRenderer.getTemplate()).to.equal(firstTemplate);
		
		AutoReportPDFRenderer.setTemplate(secondTemplate);
		expect(AutoReportPDFRenderer.getTemplate()).to.equal(secondTemplate);
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
		
		AutoReportPDFRenderer.setTemplate(template);
		AutoReportPDFRenderer.render('element', value);
		
		expect(AutoReportPDFRenderer.getTemplate()).to.equal(value);
	});
	
	it('Should render styles', () => {
		const css = '.test-class { "background-color":red"; }';
		const templateWithStyle = '<html><head>{{#css}}</head></html>';
		
		AutoReportPDFRenderer.setTemplate(templateWithStyle);
		AutoReportPDFRenderer.addCSS(css);
		
		expect(AutoReportPDFRenderer.getTemplate()).to.have.string(css);
	});
});