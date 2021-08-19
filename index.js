const express = require("express");

require("./app/db")("playground");
const getDB = require("./app/db").getDB;
const Joi = require("joi");

const app = express();

const courseSchema = Joi.object({
        name: Joi.string(),
        author: Joi.string(),
        tag: Joi.array().items(Joi.string()),
        date: Joi.date(),
        isPublished: Joi.boolean(),
        price: Joi.number(),
});

app.get("/", async (req, res) => {
        const db = getDB();
        const courses = await db
                .collection("courses")
                .find({ $or: [{ isPublished: true }, { tags: { $in: ["backend", "frontend"] } }] })
                .sort({ price: 1 })
                .project({ name: 1, author: 1, price: 1 })
                .toArray();
        res.send(courses);
});

const PORT = 3000;

app.listen(PORT, () => {
        console.log(`Connected to port ${PORT}...`);
});
