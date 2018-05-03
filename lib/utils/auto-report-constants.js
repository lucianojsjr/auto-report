let AutoReportConstants = {};

AutoReportConstants.pdf_options = ['path', 'format', 'printBackground', 'margin',
	'displayHeaderFooter', 'footerTemplate', 'headerTemplate'];

AutoReportConstants.report_pdf_config = {
	format: 'A4',
	printBackground: true,
	margin: {
		top: '10px',
		left: '10px',
		right: '10px',
		bottom: '10px'
	}
};

AutoReportConstants.page_template_map = {
	empty: '<span><span/>',
	page: '<span class="pageNumber"></span>',
	pages: '<span class="totalPages"></span>'
};

module.exports = AutoReportConstants;