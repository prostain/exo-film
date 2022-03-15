'use strict';

const { Sequelize } = require('sequelize');
var bodyParser = require('body-parser');
const path = require('path');


module.exports = class UploadService {
    constructor() {}

    async miniatureUpload(date, req, res) {
        try {
        let sampleFile;
        let uploadPath;

        if (!req.files.miniature || Object.keys(req.files.miniature).length === 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }

        sampleFile = req.files.miniature;
        
        var validExtension = ["png","PNG","jpg","JPG","JPEG","JPEG"];
        var maxSize = 1 * 1000 * 1000;
        var extension = req.files.miniature.mimetype.split('/')[1]
        
        if(!validExtension.includes(extension))
        return {error: 'Format non valide'}

        if(req.files.miniature.size > maxSize)
        return {error: 'fichier trop volumineux'}

        uploadPath = path.resolve(__dirname, "../", 'public/assets/uploads/images/' + date + "." + extension);
        await sampleFile.mv(uploadPath, function(err) {
        });
        return __domainUri + '/assets/uploads/images/' + date + "." + extension;
    } catch (err) {
    }
    }

}