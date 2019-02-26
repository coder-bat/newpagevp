"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
const config_1 = require("@schematics/angular/utility/config");
function filterTemplates(options) {
    if (!options.pageService) {
        return schematics_1.filter(path => !path.match(/\.service\.ts$/) && !path.match(/-item\.ts$/) && !path.match(/\.bak$/));
    }
    return schematics_1.filter(path => !path.match(/\.bak$/));
}
function setupOptions(options, host) {
    const workspace = config_1.getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];
    if (options.path === undefined) {
        const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
        options.path = `/${project.root}/src/${projectDirName}`;
    }
    const parsedPath = parse_name_1.parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
}
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function newPage(options) {
    return (host, context) => {
        setupOptions(options, host);
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            filterTemplates(options),
            schematics_1.template(Object.assign({}, core_1.strings, options)),
            schematics_1.move(options.path || '')
        ]);
        const rule = schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([
                schematics_1.mergeWith(templateSource)
            ]))
        ]);
        return rule(host, context);
    };
}
exports.default = newPage;
//# sourceMappingURL=index.js.map