import chalk from 'chalk';
import * as astring from 'astring';
import fs from 'node:fs';
import path from 'node:path';

export default class Reporter {
  static report({errors, ast, outputFilePath}) {
    errors
    .sort((err1, err2) => {
      const [aLine, aColumn] = err1.errorLocation.split(':').slice(1);
      const [bLine, bColumn] = err2.errorLocation.split(':').slice(1);
      
      if (aLine !== bLine) {  
        return aLine - bLine;
      }

      return aColumn - bColumn;
    })
    .forEach(({message, errorLocation}) => {
      const errorMessage = `${chalk.red('Error: ')} ${message}`;
      const finalMessage = `${errorMessage}\n${chalk.gray(errorLocation)}`;
      console.error(finalMessage);
    })

    const updateCode = astring.generate(ast);
    fs.writeFileSync(outputFilePath, updateCode, 'utf-8');


    if (!errors.length) {
      console.log(chalk.green('No errors found!'))
    } else {
      console.log(chalk.red(`Lint completed with ${errors.length} error(s).`));
    }

    console.log(
      chalk.green('\nCode fixed and saved at'),
      chalk.yellow('./' + path.basename(outputFilePath)),
      chalk.green('successfully!')
    )
  }
}