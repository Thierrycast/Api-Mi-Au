const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const { uploadImage, updateImage } = require("../database/supabase");
const {
   schemaRegisterPet,
   schemaUpdatePet,
} = require("../validation/schemaPets");


const registerPet = async (req, res) => {
   const { nome, raca, especie, data, castrado, bio, foto } = req.body;

   try {
      await schemaRegisterPet.validate(req.body);

      const petDatas = {
         ...req.body,
         foto: ''
      };

      const petRegistration = await knex("pets")
         .insert(petDatas)
         .returning("*");
      if (petRegistration.length === 0) {
         return res.status(400).json("O novo pet não foi cadastrado.");
      }
      const petId = petRegistration[0].id;

      if (foto) {
         const response = await uploadImage("pets", petId, foto);

         if (response.error) {
            return res.status(400).json(error.message);
         }
         const updateImage = await knex("pets")
            .update({ foto: response.data.publicUrl })
            .where("id", userId);
      }

      return res
         .status(200)
         .json({ message: "O novo pet foi cadastrado com sucesso!" });
   } catch (error) {
      return res.status(400).json(error.message);
   }
}

module.exports = {
   registerPet
};