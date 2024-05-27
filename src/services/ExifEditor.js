const { exiftool } = require("exiftool-vendored");

class ExifEditor {
	async editExifData(filePath, data) {
		await exiftool.write(filePath, data);
	}

	async editExifDataMassively(files, data) {
		for (const file of files) {
			await exiftool.write(file, data);
		}
	}
}

module.exports = ExifEditor;
