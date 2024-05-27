const dayjs = require("dayjs");
const path = require("node:path");
const fs = require("node:fs");

const ExifReader = require("../services/ExifReader");
const ExifEditor = require("../services/ExifEditor");

const { formatDate, decodeDate } = require("../utils/dates");
const { getFiles } = require("../utils/files");

class ExifHandler {
	constructor() {
		this.reader = new ExifReader();
		this.editor = new ExifEditor();
	}

	getExifData(filePath) {
		return this.reader.readExifData(filePath);
	}

	async updateExifDates(filePath, date) {
		const newDateTime = dayjs(date, "YYYY:MM:DD HH:mm:ss");

		const dateFormatted = formatDate(newDateTime)

		await this.editor.editExifData(filePath, {
			DateTimeOriginal: dateFormatted,
            CreateDate: dateFormatted,
			ModifyDate: dateFormatted,
			FileModifyDate: dateFormatted,
			FileAccessDate: dateFormatted,
			MediaCreateDate: dateFormatted,
			TrackModifyDate: dateFormatted,
			TrackCreateDate: dateFormatted,
			MediaModifyDate: dateFormatted,
		});

		console.log(`new date: ${dateFormatted}`)
	}

    async batchUpdateExifDatesFromNames(folder) {
        const files = await getFiles(folder);

        for (const [i, file] of files.entries()) {
			console.log(`Progress: ${i+1}/${files.length}`)
            const dateTime = decodeDate(path.basename(file))
			await this.setExifDateData(file, dateTime)
        }
	}

	async adjustExifDatesByHours(filePath, pattern = "") {
		if (!/^[+-]/.test(pattern)) throw new Error("Invalid pattern");

		const sign = pattern.slice(0, 1);
		const hours = pattern.slice(1);

		const metadata = await this.getExifData(filePath);
		let newDateTime = dayjs(metadata.ModifyDate);

		if (sign === "+") {
			newDateTime = newDateTime.add(+hours, "hour");
		}

		if (sign === "-") {
			newDateTime = newDateTime.subtract(+hours, "hour");
		}

		const dateFormatted = formatDate(newDateTime)

		await this.editor.editExifData(filePath, {
			AllDates: dateFormatted,
			MediaCreateDate: dateFormatted,
			TrackModifyDate: dateFormatted,
			TrackCreateDate: dateFormatted,
			MediaModifyDate: dateFormatted,
		});

		console.log(`operation ${sign} | old date: ${metadata.ModifyDate} - new date: ${dateFormatted}`)
	}

    async batchAdjustExifDatesByHours(folder, pattern){
        const files = await getFiles(folder);

        for (const [i, file] of files.entries()) {
			console.log(`Progress: ${i+1}/${files.length}`)
            await this.adjustExifDatesByHours(file, pattern)
        }
    }

	async batchRenameFilesByDate(folder) {
		const files = await getFiles(folder);

        for (const [i, file] of files.entries()) {
			console.log(`Progress: ${i+1}/${files.length}`)

			const metadata = await this.getExifData(file);
			const dateTime = formatDate(metadata.CreateDate);
			const name = `${dateTime}${path.extname(file)}`;
			const filePath = path.join(path.dirname(file), name);

			fs.renameSync(file, filePath);
			console.log(`Archivo renombrado: ${path.basename(file)} -> ${name}`);
		}
	}
}

module.exports = ExifHandler;
