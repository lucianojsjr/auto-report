const cheerio = require('cheerio');
const expect = require('chai').expect;
const AutoReportPDFTable = require('../../lib/pdf/auto-report-pdf-table');

describe('AutoReportPDFTable module', () => {
	it('Should be an object', () => {
		expect(AutoReportPDFTable).to.be.a('object');
	});
	
	it('Should has render functions', () => {
		expect(AutoReportPDFTable.renderTable).to.be.a('function');
		expect(AutoReportPDFTable.renderGroupedTable).to.be.a('function');
	});
	
	it('Should render a table', () => {
		const columns = [{
			name: 'Name'
		}, {
			name: 'Age'
		}, {
			name: 'Country'
		}];
		const rows = [
			['Mário', 12, 'BR'],
			['Martin', 23, 'US'],
			['Jacque', 22, 'FR']
		];
		
		const table = AutoReportPDFTable.renderTable(columns, rows, {tag: 'table'});
		const $ = cheerio.load(table);
		
		expect($('table').length).to.equal(1);
		expect($('table > thead').length).to.equal(1);
		expect($('table > thead > tr').length).to.equal(1);
		expect($('table > tbody').length).to.equal(1);
		expect($('table > tbody > tr').length).to.equal(3);
	});
	
	it('Should render a grouped table', () => {
		const columns = [{
			name: 'Name'
		}, {
			name: 'Age'
		}, {
			name: 'Country'
		}];
		const groups = [{
			name: 'Group 1',
			values: [
				['Mário', 12, 'BR'],
				['Martin', 23, 'US'],
				['Jacque', 22, 'FR']
			]
		}, {
			name: 'Group 2',
			values: [
				['Mário', 12, 'BR'],
				['Martin', 23, 'US'],
				['Jacque', 22, 'FR']
			]
		}];
		
		const groupedTable = AutoReportPDFTable.renderGroupedTable(columns, groups, {tag: 'table'});
		const $ = cheerio.load(groupedTable);
		
		expect($('div').length).to.equal(2);
		expect($('div > table').length).to.equal(2);
	});
});