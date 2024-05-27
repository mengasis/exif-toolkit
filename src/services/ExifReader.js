const { exiftool } = require('exiftool-vendored');

class ExifToolReader {
    async readExifData(filePath) {
        return exiftool.read(filePath);
    }
}

module.exports = ExifToolReader;
