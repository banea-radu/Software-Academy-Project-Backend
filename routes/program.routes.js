    const express = require("express");
    const programController = require("../controllers/program.controller");

    const router = express.Router();

    // Creaza un Program nou
    router.post("/program-cursuri/", programController.create);

    // Adu toate Programele din database
    router.get("/program-cursuri/", programController.getAll);

    // Aducerea unui Program cu un anume id
    router.get("/program-cursuri/:id", programController.findById);
    
    // Updateaza un Program dupa id
    router.put("/program-cursuri/:id", programController.update);

    // Sterge un Program dupa id
    router.delete("/program-cursuri/:id", programController.delete);

    // Aducerea tuturor programelor din categoria Incepatori
    router.get("/program-cursuri/filter/categorie", programController.getAllIncepatori);

    module.exports = router;