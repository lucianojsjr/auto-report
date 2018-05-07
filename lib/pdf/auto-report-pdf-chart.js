const _ = require('lodash');

let AutoReportPDFChart = {};

/**
 * Disable Animation
 * @param chart
 */
disableAnimation = (chart) => {
	chart.options = chart.options || {};
	
	if (!chart.options.plotOptions) {
		chart.options.plotOptions = {series: {animation: false}};
	} else if (chart.options.plotOptions && !chart.options.plotOptions.series) {
		chart.options.plotOptions.series = {animation: false};
	} else {
		chart.options.plotOptions.series.animation = false;
	}
	
	return chart;
};

/**
 * Create chart
 * to render
 * @param id
 * @param options
 * @returns {{id: *, options: *}}
 */
AutoReportPDFChart.renderChart = (id, options) => {
	let chart = {
		id: id,
		options: options
	};
	
	chart = disableAnimation(chart);
	
	return chart;
};

module.exports = AutoReportPDFChart;