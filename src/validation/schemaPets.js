const yup = require("./yupConfig");

const schemaRegisterPet = yup.object().shape({
   nome: yup.string().required(),
   raca: yup.string().required(),
   especie: yup.string().required(),
   // castrado: yup.bool().required(),
   // data: yup.date().required(),
   // bio: yup.string()
});

const schemaUpdatePet = yup.object().shape({
   nome: yup.string().required(),
   raca: yup.string().required(),
   genero: yup.string().required(),
   castrado: yup.bool().required(),
   data: yup.date().required(),
   bio: yup.string()
});

module.exports = {
   schemaRegisterPet,
   schemaUpdatePet,
};