const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processClassTokens(content) {
  let newContent = content;
  
  // 1. Primary Colors -> Accent
  newContent = newContent.replace(/(?<![\w-:])bg-primary-[4567]00(?![\w-])/g, 'bg-light-accent dark:bg-dark-accent');
  newContent = newContent.replace(/(?<![\w-:])text-primary-[4567]00(?![\w-])/g, 'text-light-accent dark:text-dark-accent');
  newContent = newContent.replace(/(?<![\w-:])border-primary-[4567]00(?![\w-])/g, 'border-light-accent dark:border-dark-accent');
  
  newContent = newContent.replace(/(?<![\w-:])hover:bg-primary-[4567]00(?![\w-])/g, 'hover:bg-light-accent/90 dark:hover:bg-dark-accent/90');
  newContent = newContent.replace(/(?<![\w-:])hover:text-primary-[4567]00(?![\w-])/g, 'hover:text-light-accent dark:hover:text-dark-accent');
  newContent = newContent.replace(/(?<![\w-:])hover:border-primary-[4567]00(?![\w-])/g, 'hover:border-light-accent dark:hover:border-dark-accent');
  
  newContent = newContent.replace(/(?<![\w-:])dark:bg-primary-[4567]00(?![\w-])/g, 'dark:bg-dark-accent');
  newContent = newContent.replace(/(?<![\w-:])dark:text-primary-[4567]00(?![\w-])/g, 'dark:text-dark-accent');
  newContent = newContent.replace(/(?<![\w-:])dark:border-primary-[4567]00(?![\w-])/g, 'dark:border-dark-accent');

  newContent = newContent.replace(/(?<![\w-:])dark:hover:bg-primary-[4567]00(?![\w-])/g, 'dark:hover:bg-dark-accent/90');
  newContent = newContent.replace(/(?<![\w-:])dark:hover:text-primary-[4567]00(?![\w-])/g, 'dark:hover:text-dark-accent');
  newContent = newContent.replace(/(?<![\w-:])dark:hover:border-primary-[4567]00(?![\w-])/g, 'dark:hover:border-dark-accent');

  // 2. Backgrounds & Surfaces
  newContent = newContent.replace(/(?<![\w-:])bg-white(?![\w-])/g, 'bg-light-background');
  newContent = newContent.replace(/(?<![\w-:])dark:bg-black(?![\w-])/g, 'dark:bg-dark-background');
  newContent = newContent.replace(/(?<![\w-:])dark:bg-gray-900(?![\w-])/g, 'dark:bg-dark-background');
  
  newContent = newContent.replace(/(?<![\w-:])bg-gray-50(?![\w-])/g, 'bg-light-surface/20');
  newContent = newContent.replace(/(?<![\w-:])bg-gray-100(?![\w-])/g, 'bg-light-surface/30');
  newContent = newContent.replace(/(?<![\w-:])bg-gray-[23]00(?![\w-])/g, 'bg-light-surface/50');
  newContent = newContent.replace(/(?<![\w-:])dark:bg-gray-800(?![\w-])/g, 'dark:bg-dark-surface');
  newContent = newContent.replace(/(?<![\w-:])dark:bg-gray-700(?![\w-])/g, 'dark:bg-dark-surface/80');

  newContent = newContent.replace(/(?<![\w-:])hover:bg-gray-100(?![\w-])/g, 'hover:bg-light-surface/40');
  newContent = newContent.replace(/(?<![\w-:])dark:hover:bg-gray-800(?![\w-])/g, 'dark:hover:bg-dark-surface');

  // 3. Borders
  newContent = newContent.replace(/(?<![\w-:])border-gray-[12]00(?![\w-])/g, 'border-light-surface');
  newContent = newContent.replace(/(?<![\w-:])dark:border-gray-[78]00(?![\w-])/g, 'dark:border-dark-surface');
  
  // 4. Texts
  newContent = newContent.replace(/(?<![\w-:])text-gray-[89]00(?![\w-])/g, 'text-light-foreground');
  newContent = newContent.replace(/(?<![\w-:])text-gray-[56]00(?![\w-])/g, 'text-light-foreground/70');
  newContent = newContent.replace(/(?<![\w-:])text-gray-[4]00(?![\w-])/g, 'text-light-foreground/50');
  
  newContent = newContent.replace(/(?<![\w-:])dark:text-white(?![\w-])/g, 'dark:text-dark-foreground');
  newContent = newContent.replace(/(?<![\w-:])dark:text-gray-100(?![\w-])/g, 'dark:text-dark-foreground');
  newContent = newContent.replace(/(?<![\w-:])dark:text-gray-200(?![\w-])/g, 'dark:text-dark-foreground/90');
  newContent = newContent.replace(/(?<![\w-:])dark:text-gray-[34]00(?![\w-])/g, 'dark:text-dark-foreground/70');
  newContent = newContent.replace(/(?<![\w-:])dark:text-gray-500(?![\w-])/g, 'dark:text-dark-foreground/50');

  // Text Hovers
  newContent = newContent.replace(/(?<![\w-:])hover:text-gray-[89]00(?![\w-])/g, 'hover:text-light-foreground');
  newContent = newContent.replace(/(?<![\w-:])dark:hover:text-white(?![\w-])/g, 'dark:hover:text-dark-foreground');
  newContent = newContent.replace(/(?<![\w-:])dark:hover:text-gray-[12]00(?![\w-])/g, 'dark:hover:text-dark-foreground');
  newContent = newContent.replace(/(?<![\w-:])dark:hover:text-gray-[34]00(?![\w-])/g, 'dark:hover:text-dark-foreground/70');
  
  newContent = newContent.replace(/(?<![\w-:])hover:text-white(?![\w-])/g, 'hover:text-light-background dark:hover:text-dark-background');
  newContent = newContent.replace(/(?<![\w-:])dark:hover:text-black(?![\w-])/g, 'dark:hover:text-dark-background');

  // Clean up any weird double darks caused by replace logic
  newContent = newContent.replace(/dark:bg-dark-accent dark:bg-dark-accent/g, 'dark:bg-dark-accent');
  newContent = newContent.replace(/dark:text-dark-accent dark:text-dark-accent/g, 'dark:text-dark-accent');
  newContent = newContent.replace(/dark:border-dark-accent dark:border-dark-accent/g, 'dark:border-dark-accent');
  newContent = newContent.replace(/dark:hover:bg-dark-accent\/90 dark:hover:bg-dark-accent\/90/g, 'dark:hover:bg-dark-accent/90');

  return newContent;
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.astro') || filePath.endsWith('.tsx') || filePath.endsWith('.jsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = processClassTokens(content);
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
