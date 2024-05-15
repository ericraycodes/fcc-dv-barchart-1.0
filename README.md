

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
The stringed **date** data was converted into *Date* objects for d3 to process.
This is the reference for visualizing **temporal dates** in this project: [reference](https://using-d3js.com/04_04_working_with_dates.html)

## SVG Chart
- **Padding**, must be set for svgs to keep display within its borders, nothing is shown when outside.

- **ticks** [ref](https://ghenshaw-work.medium.com/customizing-axes-in-d3-js-99d58863738b)

- **tooltip** [ref](https://gramener.github.io/d3js-playbook/tooltips.html)

- axes **label** [ref](https://d3-graph-gallery.com/graph/custom_axis.html)

## D3 Library
D3 works on all browsers except IE8 and lower. [Reference](https://www.tutorialsteacher.com/d3js/setup-d3js-development-environment).

A `<script>` tag sources CDN link of the d3 library:
  ```
  <script defer src="https://d3js.org/d3.v4.min.js"></script>
  ```

## Responsive
[reference](https://d3-graph-gallery.com/graph/custom_responsive.html)