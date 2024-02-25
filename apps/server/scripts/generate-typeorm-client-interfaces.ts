import * as fs from 'fs';
import glob from 'glob';
import * as path from 'path';
import * as ts from 'typescript';

const generateInterfaceFromEntity = (entityPath: string, outputDir: string) => {
  const program = ts.createProgram([entityPath], {});
  const sourceFile = program.getSourceFile(entityPath)!;

  let output = '';

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isClassDeclaration(node) && node.name) {
      output += `export interface ${node.name.text} {\n`;

      node.members.forEach((member) => {
        if (ts.isPropertyDeclaration(member) && member.type) {
          const name = member.name.getText(sourceFile);
          const type = member.type.getText(sourceFile);
          output += `  ${name}: ${type};\n`;
        }
      });

      output += `}\n`;
    }
  });

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFilePath = path.join(
    outputDir,
    `${path.basename(entityPath, '.ts')}.interface.ts`,
  );
  fs.writeFileSync(outputFilePath, output);
  console.log(`Interface generated: ${outputFilePath}`);
};

const searchPattern = './src/**/*.entity.ts'; // Pattern to match all entity files
const outputDir = './src/interfaces'; // Output directory for generated interfaces

const files = glob.sync(searchPattern);
files.forEach((file) => {
  const sourceFile = ts.createSourceFile(
    file,
    fs.readFileSync(file).toString(),
    ts.ScriptTarget.Latest,
  );
  console.log('sourceFile', sourceFile);
  // Further processing...
});
