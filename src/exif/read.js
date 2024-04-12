const { exiftool } = require('exiftool-vendored');

async function readExif(filePath) {
    try {
        const metadata = await exiftool.read(filePath);
        return metadata;
    } catch (error) {
        console.error('Error reading EXIF metadata:', error);
        throw error;
    }
}

module.exports = readExif;
