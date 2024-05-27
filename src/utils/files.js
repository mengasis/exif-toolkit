const path = require("node:path");
const recursive = require("recursive-readdir");

async function getFiles(folder) {
	return await recursive(folder, [
		(file) => {
			const ext = path.extname(file).toLowerCase();
			return !(
				ext === ".jpg" ||
				ext === ".jpeg" ||
				ext === ".png" ||
				ext === ".mp4" ||
				ext === ".mov" ||
				ext === ".avi"
			);
		},
	]);
}

module.exports = { getFiles };
