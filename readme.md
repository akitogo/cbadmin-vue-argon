# Welcome to cbadmin-vue-argon
Cbadmin-vue-argon is a vue-based UI implementation for the cbadmin extension.
![Cbadmin-vue-argon preview image](https://raw.githubusercontent.com/akitogo/cbadmin-vue-argon/master/public/docs/readme-preview.png)
## License
Apache License, Version 2.0.
## Important Links
* Source Code - https://github.com/akitogo/cbadmin-vue-argon
## Quick Installation
### 1. Cbadmin as a pre-requisite
Before installing `cbadmin-vue-argon`, make sure you already have `cbadmin` (https://github.com/akitogo/cbadmin) installed in your ColdBox project.
### 2. Include cbadmin-vue-argon
Cbadmin-vue-argon contains a `box.json` file, so it can leverage [CommandBox](http://www.ortussolutions.com/products/commandbox) for its dependencies. To include `cbadmin-vue-argon` in your project, go to your project root and type:
```bash
box install cbadmin-vue-argon
```
This will download cbadmin-vue-argon along with all required dependencies.
### 3. Restart your server
After instlaling cbadmin-vue-argon you will need to restart your server:
```
box server restart
```
Refresh your main project page and - voila! - you should see a front-end application.
## Customizations
The project is written using the [vue.js framework](https://vuejs.org/) and based on the free [Vue Argon Dashboard](https://www.creative-tim.com/product/vue-argon-dashboard) template.
Feel free to make any changes in the UI as you wish. All the source files are included in the project.
It's as simple as running `npm run serve` from within the `modules/cbadmin-vue-argon` directory.