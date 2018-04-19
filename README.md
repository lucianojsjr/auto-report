<h1 align="center">
  <br>
   <img width="auto" height="180" src="https://cdn.iconscout.com/public/images/icon/free/png-512/financial-analysis-report-card-reporting-valuation-3e6ec64bf68be326-512x512.png" alt="Logo GreatReports" title="Logo GreatReports" />
  <br>
</h1>
<p align="center">  
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

<p align="center">
  This repository contains the <strong>GreatReports</strong> source code.
  GreatReports is a library to generate personalized PDF and XLS reports.
</p>

## Table of contents

  * [Installation](#installation)
  * [Examples](#examples)
     * [Example 1) Render a value:](#example-1-render-a-value)
     * [Example 2) Render a table:](#example-2-render-a-table)
     * [More examples](#more-examples)
  * [Contributing](#contributing)
  * [RoadMap](#roadmap)
  * [License](#license)


<h2 id="installation">Installation</h2>

```bash
npm install great-reports --save
```

Import it to your code using:

```javascript
const GreatReports = require("great-reports");
```

## Examples

`GreatReports` use HTML with tags to generate the PDF. For the examples below 
We will use the following HTML.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="{{#charset}}">
        <title>{{#title}}</title>
    </head>
    <body>
        <div>
            <p>{{@report_name}}</p>
        </div>
        {{@table}}
    </body>
</html>
```

### Example 1) Render a value:

```javascript
const template = '<html>...'; // Template defined above. 
const GreatReportsPDF = require('great-reports').pdf;

GreatReportsPDF.init(template);
GreatReportsPDF.config({
    charset: 'utf-8',
    title: 'New Report'
});

GreatReportsPDF.render('report_name', 'New Report Name');

GreatReportsPDF.create('your-path/file.pdf').then(data => console.log(data)).catch(err => console.log(err));
```

### Example 2) Render a table:

```javascript
const template = '<html>...'; // Template defined above. 
const GreatReportsPDF = require('great-reports').pdf;

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

GreatReportsPDF.init(template);
GreatReportsPDF.config({
    charset: 'utf-8',
    title: 'New Report'
});

GreatReportsPDF.renderTable(columns, rows, {
    tag: 'table' //The tag that should be replaced.
});

GreatReportsPDF.create('your-path/file.pdf').then(data => console.log(data)).catch(err => console.log(err));

```

**or** (the rows can be an array of objects):

```javascript
const columns = [{
    name: 'Name'
}, {
    name: 'Age'
}, {
    name: 'Country'
}];

const rows = [{
    name: 'Mário',
    user_age: 12,
    country: 'BR'
}, {
    name: 'Martin',
    user_age: 23,
    country: 'US'
}, {
    name: 'Jacque',
    user_age: 22,
    country: 'FR'
}];

GreatReportsPDF.init(template);
GreatReportsPDF.config({
    charset: 'utf-8',
    title: 'New Report'
});

GreatReportsPDF.renderTable(columns, rows, {
    tag: 'table', //The tag that should be replaced.,
    properties: ['name', 'user_age', 'country'] //Properties to access row object
});

GreatReportsPDF.create('your-path/file.pdf').then(data => console.log(data)).catch(err => console.log(err));
```

### More examples

For more example please check the [__Docs__](https://www.google.com/).

## Contributing

You may contribute in several ways like creating new features, fixing bugs, improving documentation and examples
or translating any document here to your language.

## RoadMap

* Add default styles based on Bootstrap.
* Set up tests.
* Create advanced examples.
* Publish to NPM.
* Create CONTRIBUTING.md to define the contributing flow.
* Create project site.
* Remove HTML-PDF dependency.

## License

[MIT](LICENSE)