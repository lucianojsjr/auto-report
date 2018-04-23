const expect = require('chai').expect;
const GreatReportsPDFRenderer = require('../lib/pdf/great-reports-pdf-renderer');

describe('GreatReportsPDFRendererRenderer module', () => {
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