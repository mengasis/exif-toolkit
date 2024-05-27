const ExifHandler = require("./domain/ExifHandler");

const args = process.argv.slice(2);
const command = args[0];
const filePaths = args.slice(1);

const exifHandler = new ExifHandler();

const showUsage = () => {
	console.log(`
Usage:
	cli.js show <filePath>                       			- Show file info
	cli.js set:date <folderPath>           					- Set date for a file based on its filename
	cli.js set:date:all <folderPath>           				- Set dates from filenames in a folder
	cli.js adjust:hours:all <folderPath> <timePattern> 		- Adjust dates by hours for all files in a folder
	cli.js rename:date <folderPath>              			- Rename files by date in a folder
	cli.js --help                                  			- Show this help message
`);
};

if (args.length === 0 || command === "--help" || command === "-h") {
	showUsage();
	process.exit(0);
}

switch (command) {
	case "show": {
		if (filePaths.length !== 1) {
			console.error("Usage: cli.js show <filePath>");
			process.exit(1);
		}

		exifHandler
			.getExifData(filePaths[0])
			.then((metadata) => console.log(metadata))
			.catch((error) => console.error("Error reading EXIF:", error));

		break;
	}

	case "set-date": {
		if (filePaths.length < 1) {
			console.error("Usage: cli.js set-date <filePath> <date>");
			process.exit(1);
		}

		const date = filePaths[filePaths.length - 1];
		const input = args[1];

		exifHandler
			.updateExifDates(input, date)
			.then(() => console.log("File changed successfully."))
			.catch((error) => console.error("Error setting file date:", error));
		break;
	}

	case "set:date:all": {
		if (filePaths.length < 1) {
			console.error("Usage: cli.js set:date:all <folderPath>");
			process.exit(1);
		}

		const input = args[1];

		exifHandler
			.batchUpdateExifDatesFromNames(input)
			.then(() => console.log("Files changed successfully."))
			.catch((error) => console.error("Error setting file dates:", error));

		break;
	}

	case "adjust:hours:all": {
		if (filePaths.length < 1) {
			console.error("Usage: cli.js adjust:hours:all <filePath> <timePattern>");
			process.exit(1);
		}

		const pattern = filePaths[filePaths.length - 1];
		const file = args[1];

		exifHandler
			.batchAdjustExifDatesByHours(file, pattern)
			.then(() => console.log("Files changed successfully."))
			.catch((error) => console.error("Error adjusting files:", error));
		break;
	}

	case "rename:date": {
		if (filePaths.length < 1) {
			console.error("Usage: cli.js rename:date <folderPath>");
			process.exit(1);
		}

		const folder = args[1];

		exifHandler
			.batchRenameFilesByDate(folder)
			.then(() => console.log("Files changed successfully."))
			.catch((error) => console.error("Error adjusting files:", error));

		break;
	}

	default:
		process.exit(1);
}
