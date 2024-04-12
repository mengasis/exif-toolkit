const readExif = require('./exif/read');

const args = process.argv.slice(2);
const command = args[0];
const filePaths = args.slice(1);

switch (command) {
    case 'read':
        if (filePaths.length !== 1) {
            console.error('Usage: cli.js read <filePath>');
            process.exit(1);
        }

        readExif(filePaths[0])
            .then(metadata => console.log(metadata))
            .catch(error => console.error('Error reading EXIF:', error));
        break;
  
    default:
        console.error('Usage: cli.js <command> [arguments...]');
        console.error('Commands:');
        console.error('  read <filePath>                Read EXIF metadata');
        console.error('  adjust <filePath> <newDate>    Adjust capture date');
        console.error('  pattern <files...> <timePattern> Adjust date/time with pattern');
        console.error('  rename <files...>              Rename files by date of capture');
        process.exit(1);
}
