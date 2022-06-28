const express = require('express');
const router = express.Router();
const Joi = require('joi');


const courses = [
    {id:1, name:"course 1"},
    {id:2, name:"course 2"},
    {id:3, name:"course 3"}
]

router.get("/", (req, res)=>{
    res.send(courses);
});

router.get("/:id", (req, res)=>{
    const found = courses.find(c=> c.id === parseInt(req.params.id));
    if(!found) return res.status(404).send("The course was not found !");
    res.send(found);
});

router.post("/", (req,res)=>{

    result = validateName(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

router.put("/:id", (req,res)=>{
    const found = courses.find(c=> c.id === parseInt(req.params.id));
    if(!found) return res.status(404).send("The course was not found !");

    result = validateName(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

        found.name = req.body.name;
        res.send(found);
});

router.delete('/:id', (req,res)=>{
    const found = courses.find(c=> c.id === parseInt(req.params.id));
    if(!found) return res.status(404).send("The course was not found !");

    const index = courses.indexOf(found);
    courses.splice(index, 1);
    res.send(found);
});

function validateName(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

module.exports = router;