const { response } = require("express");
const db = require("../models");

const ProgramModel = db.program;

// Creaza si salveaza un nou Program
exports.create = (request, response) => {
  // Validarea requestului
  if (!request.body.ziua) {
    response.status(400).send({ message: "Continutul nu poate fi gol!" });
    return;
  }

  // Creaza un Program nou
  const program = new ProgramModel({
    ziua: request.body.ziua,
    ora: request.body.ora,
    categoria: request.body.categoria,
  });

  // Salveaza Programul in database
  ProgramModel
    .create(program)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "A intervenit o eroare in timpul salvarii Programului."
      });
    });

};

// Adu toate Programele din database
exports.getAll = (request, response) => {
  ProgramModel.find()
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "A intervenit o eroare in timpul aducerii Programelor."
      });
    });
};

// Aducerea unui Program cu un anume id
exports.findById = (request, response) => {
    const id = request.params.id;

    ProgramModel.findById(id)
    .then(data => {
      if (!data)
        response.status(404).send({ message: "Nu exista Programul cu id " + id });
      else response.send(data);
    })
    .catch(err => {
      response
        .status(500)
        .send({ message: "Eroare la aducerea Programului cu id=" + id });
    });
};

// Updateaza un Program dupa id
exports.update = (request, response) => {
    if (!request.body) {
        return response.status(400).send({
          message: "Informatiile de facut update nu pot fi goale!"
        });
      }
    
    const id = request.params.id;

    ProgramModel.findByIdAndUpdate(id, request.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        response.status(404).send({
          message: `Nu se poate face update la Programul cu id=${id}. Poate Programul nu exista!`
        });
      } else response.send({ message: "Programul a fost updatat cu succes." });
    })
    .catch(err => {
      response.status(500).send({
        message: "Eroare la updatarea Programului cu id=" + id
      });
    });
};

// Sterge un Program dupa id
exports.delete = (request, response) => {
    const id = request.params.id;

    ProgramModel.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
          response.status(404).send({
            message: `Nu se poate sterge Programul cu id=${id}. Poate Programul nu exista!`
          });
        } else {
          response.send({
            message: "Programul a fost sters cu succes!"
          });
        }
    })
    .catch(err => {
        response.status(500).send({
          message: "Eroare la updatarea Programului cu id=" + id
        });
    });
};

// Aducerea tuturor programelor din categoria Incepatori
exports.getAllIncepatori = (request, response) => {
  ProgramModel.find({ categoria: "Incepatori" })
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Eroare la aducerea Programelor de Incepatori."
      });
    });
};