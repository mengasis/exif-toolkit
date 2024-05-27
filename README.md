# exif-toolkit
exif-toolkit is a handy CLI tool designed to streamline the organization of media files, like photos and videos, by standardizing their dates and filenames. Ever found yourself dealing with a mishmash of dates and names from various devices? exif-toolkit's got your back!

## Purpose

The main goal of exif-toolkit is to make your life easier by ensuring consistency in file dates and names. No more confusion when merging files from different gadgets! Plus, it adopts the iOS date format (e.g., "YYYY-MM-DD HH:mm:ss") for a neat and uniform naming convention across all your files.

## Features

- Set Date from Filename: Easily adjust a photo's date based on its filename.
- Set Date for All Files in a Folder: Quickly set dates for all photos in a folder using their filenames.
- Adjust Date by Hours: Fine-tune a photo's date by adding or subtracting hours.
- Adjust Dates for All Files in a Folder: Bulk-adjust dates for all photos in a folder by a specified time period.
- Rename Files by Date: Effortlessly rename files in a folder based on their metadata dates.
Dependencies

## Underlying Technology

exif-toolkit leverages the power of [ExifTool](https://exiftool.org), a renowned metadata processing tool widely used in the photography industry. To facilitate seamless integration into Node.js applications, exif-toolkit relies on the following third-party dependency:

exif-toolkit utilizes [exiftool-vendored](https://github.com/photostructure/exiftool-vendored.js/tree/main), a Node.js wrapper for ExifTool. This wrapper simplifies the integration of ExifTool's functionality into Node.js applications, allowing exif-toolkit to access and manipulate metadata within media files efficiently. By leveraging exiftool-vendored, exif-toolkit ensures robust metadata processing capabilities without the need for complex setup procedures.

## Note

Please note that this project is still in its early stages and is continuously evolving. Currently, it offers only basic features, and not all functionalities are fully implemented. However, the core features necessary for mass renaming and editing of files have been successfully implemented.


## Usage
```
cli.js show <filePath>
cli.js set:date:filename <filePath>
cli.js set:date:all <folderPath>
cli.js adjust:hours <filePath> <timePattern>
cli.js adjust:hours:all <folderPath> <timePattern>
cli.js rename:date <folderPath>
cli.js --help
```

For detailed usage instructions, check out the CLI help message.

## License
This project is licensed under the MIT License. Feel free to use and modify it according to your needs.