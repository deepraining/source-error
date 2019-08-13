import commander from 'commander';
import fse from 'fs-extra';
import axios from 'axios';
import SourceMap from 'source-map';
import { isUrl } from './util';
import { error, log, success } from './logger';

import pkg from '../package.json';

const { readFileSync } = fse;
const { SourceMapConsumer } = SourceMap;

/**
 * Lookup source stack
 * @param line
 * @param column
 * @param sourcemap
 */
function lookup({ line, column, sourcemap }) {
  SourceMapConsumer.with(sourcemap, null, consumer => {
    const result = consumer.originalPositionFor({ line, column });

    success(`source: ${result.source}`);
    success(`line: ${result.line}`);
    success(`column: ${result.column}`);
    success(`name: ${result.name}`);
  });
}

/**
 * Run command
 *
 * @param options
 */
function run(options) {
  if (!options.line || !options.column || !options.map) return;

  const line = parseInt(options.line, 10);
  const column = parseInt(options.column, 10);
  const { map } = options;

  if (!line) {
    log('-l, --line option need to be integer');
    return;
  }
  if (!column) {
    log('-c, --column option need to be integer');
    return;
  }

  if (isUrl(map)) {
    axios
      .get(map)
      .then(res => {
        lookup({ line, column, sourcemap: res.data });
      })
      .catch(e => {
        error(e.stack);
      });
  } else {
    lookup({ line, column, sourcemap: JSON.parse(readFileSync(map, 'utf8')) });
  }
}

commander
  .version(pkg.version)
  .description(
    'To see the original information of JavaScript error through map file',
  )
  .option('-l, --line <line>', 'error line')
  .option('-c, --column <column>', 'error column')
  .option('-m, --map <map>', 'map file path')
  .action(run)
  .parse(process.argv);
