'use strict';

const express = require('express');
const { Sequelize, Op } = require('sequelize');
const { sequelize, Film } = require('../models');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = express.Router();

/**
 * @swagger
 * /films:
 *   get:
 *     summary: JSONPlaceholder.
 *     tags: [films]
 *     description: prototyping or testing an API.
 *     responses:
 *       200:
 *         description: .
 */

router.get('/films', async(req, res) => {
    try {
       var films = await Film.findAll();

        return res.json({
          films
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: .
 *                 example: example
 *               description:
 *                 type: string
 *                 description: .
 *                 example: description example
 *               date:
 *                 type: date
 *                 description: .
 *                 example: 2021-08-21
 *               note:
 *                 type: number
 *                 description: .
 *                 example: 3
 *               duration:
 *                 type: number
 *                 description: .
 *                 example: 60
 *     responses:
 *       200:
 *         description: .
 */

router.post('/films', async(req, res) => {
    try {
        const newFilm = {
            name: req.body.name,
            description: req.body.description,
            date:new Date(req.body.date),
            note:req.body.note,
            duration:req.body.duration,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        var film = await Film.findOne({ where: { name: req.body.name } });
        if(film)     
        return res.status(422).json({message: "ce film existe déjà"});

        film = await Film.create(newFilm);
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: .
 *                 example: example
 *               description:
 *                 type: string
 *                 description: .
 *                 example: description example
 *               date:
 *                 type: date
 *                 description: .
 *                 example: 2021-08-21
 *               note:
 *                 type: number
 *                 description: .
 *                 example: 3
 *               duration:
 *                 type: number
 *                 description: .
 *                 example: 60
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

module.exports = router;