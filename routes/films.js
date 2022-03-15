'use strict';

const express = require('express');
const { Sequelize, Op } = require('sequelize');
const { sequelize, Film, Category, CategoryFilm } = require('../models');
var fileupload = require("express-fileupload");
var UtilsServices = require('../services/utilsServices');
var UploadServices = require("../services/uploadServices");
const utilsServices = new UtilsServices();
const uploadServices = new UploadServices();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = express.Router();
router.use(fileupload());


/**
 * @swagger
 * /films:
 *   get:
 *     summary: JSONPlaceholder.
 *     tags: [films]
 *     parameters:
 *     - name: page
 *       in: query
 *       required: false
 *     - name: size
 *       in: query
 *       required: false
 *     - name: name
 *       in: query
 *       required: false
 *     description: prototyping or testing an API.
 *     responses:
 *       200:
 *         description: .
 */

router.get('/films', async(req, res) => {
  try {
    const page = req.query.page ? req.query.page:0;
    const size = req.query.size ? req.query.size:5;
    const { limit, offset } = await utilsServices.getPagination(page, size);

    let operation = [];

    if (req.query.name != null) {
        operation = {
            [Op.or]: [{
                    firstname: {
                        [Op.like]: '%' + req.query.name + '%'
                    }
                },
                {
                    lastname: {
                        [Op.like]: '%' + req.query.name + '%'
                    }
                }
            ]
        }
    }

    if (req.query.name != null) {
        operation = {
            [Op.or]: [{
            name: {
                [Op.like]: '%' + req.query.name + '%'
            }
        },
        {
            description: {
                [Op.like]: '%' + req.query.name + '%'
            }
        }
        ]
        }
    }
    Film.findAndCountAll({
            where: {
                [Op.and]: operation
            },
            limit,
            offset,
            order: [
                'id'
            ]
        })
        .then(async data => {
            const response = await utilsServices.getPagingData(data, page, size);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving."
            });
        });
} catch (err) {
    console.log(err)
    return res.status(500).json(err)
}
});

/**
 * @swagger
 * /films/{id}:
 *   get:
 *     summary:  JSONPlaceholder.
 *     tags: [films]
 *     parameters:
 *      - name: id
 *        in: path
 *     description: prototyping or testing an API.
 *     responses:
 *       200:
 *         description: .
 */
router.get('/films/:id', async(req, res) => {
    try {
        var film = await Film.findOne({ where: { id: req.params.id } });
        return res.json({
            film
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
});

/**
 * @swagger
 * /films:
 *   post:
 *     summary:  JSONPlaceholder.
 *     tags: [films]
 *     description: prototyping or testing an API.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               miniature:
 *                 type: file
 *                 description: miniature.
 *               data:
 *                 type: string
 *                 description: json stringify of.
 *                 example: {"name": "example1", "description": "description: description example1", "date": "2021-08-21", "note":3, "duration":1, "categories": [1,2,3]}
 *     responses:
 *       200:
 *         description: .
 */

router.post('/films', async(req, res) => {
    try {
console.log(req.files)
        let date = Date.now();
        let miniaturePath = await uploadServices.miniatureUpload(date, req, res);
        console.log(miniaturePath)
        if(miniaturePath.error != undefined)
        {
            return res.status(500).json({ error: String(miniaturePath.error) })
        }
        let json = JSON.parse(req.body.data);
        const newFilm = {
            name: json.name,
            description: json.description,
            date:new Date(json.date),
            note:json.note,
            duration:json.duration,
            url: String(miniaturePath),
            createdAt: new Date(),
            updatedAt: new Date()
        }
            
        let categoriesId = Array.from(json.categories)
        var film = await Film.findOne({ where: { name: json.name } });
        if(film)     
        return res.status(422).json({message: "ce film existe déjà"});
        film = await Film.create(newFilm);
        for(let i = 0; i< categoriesId.length; i++)
        {
            let newCategoryFilm =
            {
                filmId: film.id,
                categoryId: categoriesId[i]
            }
            let categoryFilmCreated =  await CategoryFilm.create(newCategoryFilm);
        }
        return res.status(201).json({
            film
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
});

/**
 * @swagger
 * /films/{id}:
 *   put:
 *     summary:  JSONPlaceholder.
 *     tags: [films]
 *     parameters:
 *      - name: id
 *        in: path
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               miniature:
 *                 type: file
 *                 description: miniature.
 *               data:
 *                 type: string
 *                 description: json stringify of.
 *                 example: {"name": "example1", "description": "description: description example1", "date": "2021-08-21", "note":3, "duration":1, "categories": [1,2,3]}
 *     responses:
 *       200:
 *         description: .
 */

router.put('/films/:id', async(req, res) => {
    try {
        var film = await Film.findOne({ where: { id: req.params.id } })

        film.name = req.body.name;
        film.description = req.body.description;
        film.date = new Date(req.body.date);
        film.note = req.body.note;
        film.duration = req.body.duration;
        film.updatedAt = new Date();

        await film.save();

        return res.json({
            film
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
});

/**
 * @swagger
 * /films/{id}:
 *   delete:
 *     summary:  JSONPlaceholder.
 *     tags: [films]
 *     parameters:
 *      - name: id
 *        in: path
 *     description: prototyping or testing an API.
 *     responses:
 *       200:
 *         description: .
 */

router.delete('/films/:id', async(req, res) => {
    const id = req.params.id
    try {
        const film = await Film.findOne({ where: { id:req.params.id } })

        await film.destroy()

        return res.json({ message: 'Film deleted!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
});

/**
 * @swagger
 * /films/{id}/categories:
 *   get:
 *     summary:  JSONPlaceholder.
 *     tags: [films]
 *     parameters:
 *      - name: id
 *        in: path
 *     description: prototyping or testing an API.
 *     responses:
 *       200:
 *         description: .
 */

 router.get('/films/:id/categories', async(req, res) => {
    try {
        var film = await Film.findByPk(req.params.id,{
            attributes: ['id'],
            include: [
                { model: Category, as: 'categories',attributes: ["id", "name"], required: false }
            ]
        })
        return res.json({
            film
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
});
module.exports = router;