let GreatReportsUtils = {};

GreatReportsUtils.findPropertyNested = (currentObject, property) => {
	const path = property.split('.');
	
	return path.reduce((obj, key) => (obj && obj[key]) ? obj[key] : null, currentObject);
};

GreatReportsUtils.replaceTags = (template, values, properties) => {
	properties.forEach((property) => {
		if (!values[property]) {
			return console.warn(`Warning: The property ${property} was not found in values.`);
		}
		
		template = template.replace(`{{#${property}}}`, values[property]);
	});
	
	return template;
};

module.exports = GreatReportsUtils;