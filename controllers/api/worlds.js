const World = require('../../models/Worlds')

exports.all = (req, res) => {
  World.find()
    .populate('scenes')
    .exec((err, data) => {
    if (!data) return res.status(404).send("no worlds found");
    if (err) return res.status(500).send(err, "error finding all worlds");
    res.json(data);
  });
};


exports.create = (req, res) =>{
  let newWorld = new World();
  newWorld.title = req.body.title;

  console.log(newWorld, "A WHOLE NEW WORLD... SAVED");

  newWorld.save((err, data) =>{
    if(err){
      res.send(err);
    } else {
      res.json({data: data, message: "world successfully added!"});
    }
  })
}

exports.destroy = (req, res) => {
  World.remove({ _id: req.params.world_id}, (err, world) => {
    if(err) {
      res.send(err);
    } else {
      res.json ({ message: "TERMINATED LE WORLD!!"})
    }
  });
};


exports.getOne = (req, res) => {
  World.findById(req.params.world_id)
    .populate('scenes')
    .exec((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  })
}
