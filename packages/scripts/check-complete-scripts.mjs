import * as fs from 'node:fs';
import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Validate that all packages have the below scripts defined in their package.json
// only spt shallow folder, unnecessary deep folder
const config = {
  root: './',
  include: ['package.json'],
  exclude: ['packages/components/*', 'apps/proj-tpl/*'],
  scripts: ['type-check', 'lint', 'format-check']
};

const root = path.resolve(__dirname, config.root);

function getPackageJson(pth) {
  return JSON.parse(
    fs.readFileSync(path.resolve(root, pth), 'utf8', {
      cwd: root
    })
  );
}

function getPackagePaths() {
  return glob(config.include, {
    ignore: config.exclude,
    cwd: root
  });
}

async function validate() {
  const paths = await getPackagePaths();
  console.log('paths', paths);
  const errors = [];
  for (const path of paths) {
    const packageJson = getPackageJson(path);
    console.log('packageJson', packageJson);
    const missScripts = [];
    for (const script of config.scripts) {
      if (!packageJson.scripts || !packageJson.scripts[script]) {
        missScripts.push(script);
      }
    }
    if (missScripts.length) {
      errors.push({
        path,
        name: packageJson.name,
        missScripts
      });
    }
  }
  for (const error of errors) {
    console.warn(`App name: ${error.name}`);
    console.warn(`Pkg path: ${error.path}`);
    console.warn(`Missing scripts: ${error.missScripts.join('、')}\n`);
  }
  if (errors.length) {
    process.exit(1); //如果有错误,则退出
  }
}

validate();
