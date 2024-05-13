

# Concept

## Logic
1. Start functionalities when all source files are loaded.
1. Run request for the project's dataset.
  - **XHR** method
1. Parse response data.
  - parse response data into a **JavaScript object**.
1. Run data visualization required.
  - **d3 environment**

## Data
The **date** data is parsed into:
 - year
 - quarter
- Convert *timestamp* into *Date*. [ref](https://www.influxdata.com/blog/how-get-convert-format-javascript-date-timestamp/#:~:text=One%20way%20to%20convert%20a,get%20the%20individual%20date%20components.)

## SVG Chart
- **Padding**, must be set for svgs to keep display within its borders, nothing is shown when outside.

- **ticks** [ref](https://ghenshaw-work.medium.com/customizing-axes-in-d3-js-99d58863738b)

## D3 Library
D3 works on all browsers except IE8 and lower.
CDN [Reference](https://www.tutorialsteacher.com/d3js/setup-d3js-development-environment) 

- d3 library to project:
  ```
  <script defer src="https://d3js.org/d3.v4.min.js"></script>`
  ```
- axes,[reference](https://ghenshaw-work.medium.com/customizing-axes-in-d3-js-99d58863738b)

- *temporal date* input, [ref](https://using-d3js.com/04_04_working_with_dates.html)