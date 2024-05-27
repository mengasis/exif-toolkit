const ExifHandler = require("./domain/ExifHandler");

const args = process.argv.slice(2);
const command = args[0];
const filePaths = args.slice(1);

const exifHandler = new ExifHandler();

switch (command) {
	case "read": {
		if (filePaths.length !== 1) {
			console.error("Usage: cli.js read <filePath>");
			process.exit(1);
		}

		exifHandler
			.getExifData(filePaths[0])
			.then((metadata) => console.log(metadata))
			.catch((error) => console.error("Error reading EXIF:", error));

		break;
	}
	case "set-date:filename": {
		if (filePaths.length < 1) {
			console.error("Usage: cli.js set-date:filename <folderPath>");
			process.exit(1);
		}

		const input = args[1];
		
		exifHandler
				.batchUpdateExifDatesFromNames(input)
				.then(() => console.log("Files changed successfully."))
				.catch((error) => console.error("Error adjusting files:", error));

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
			.then(() => console.log("Files changed successfully."))
			.catch((error) => console.error("Error adjusting files:", error));
		break;
	}

	case "set-hour": {
		if (filePaths.length < 1) {
			console.error("Usage: cli.js edit <filePath> <timePattern>");
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

	case "rename": {
		if (filePaths.length < 1) {
			console.error("Usage: cli.js rename <folderPath>");
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
