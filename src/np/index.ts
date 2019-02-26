import { strings } from '@angular-devkit/core';
import { PageOptions } from './schema';
import { mergeWith, branchAndMerge, chain, move, template, url, apply, filter, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import { parseName } from '@schematics/angular/utility/parse-name';
import { getWorkspace } from '@schematics/angular/utility/config';

function filterTemplates(options: PageOptions): Rule {
  if (!options.pageService) {
    return filter(path => !path.match(/\.service\.ts$/) && !path.match(/-item\.ts$/) && !path.match(/\.bak$/));
  }
  return filter(path => !path.match(/\.bak$/));
}

function setupOptions(options: PageOptions, host: Tree): void {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  const project = workspace.projects[options.project];

  if (options.path === undefined) {
    const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
    options.path = `/${project.root}/src/${projectDirName}`;
  }

  const parsedPath = parseName(options.path, options.name);
  options.name = parsedPath.name;
  options.path = parsedPath.path;
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function newPage(options: PageOptions): Rule {

  return (host: Tree, context: SchematicContext) => {

    setupOptions(options, host);

    const templateSource = apply(url('./files'), [
      filterTemplates(options),
      template({
        ...strings,
        ...options
      }),
      move(options.path || '')
    ]);

    const rule = chain([
      branchAndMerge(chain([
        mergeWith(templateSource)
      ]))
    ]);

    return rule(host, context);
  }
}
