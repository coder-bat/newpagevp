
# Getting Started

A small scaffolding tool to create new page in boilerplate - ViPlate

Goal: Focus more on add features to page and spend less time on creating and setting up one page.

### Installation

npm i newpagevp --save 

### Usage 

npm run generate newpagevp:np PageName --pageService 

-- add page service if the page will have API calls. (default=true)


### Files generated

PageName-routing.module.ts

PageName.component.html

PageName.component.scss

PageName.component.spec.ts

PageName.component.ts

PageName.module.ts 