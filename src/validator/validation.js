import Joi from 'joi'
export const userSchema = Joi.object({
   name: Joi.string().min(3).required(),
   email: Joi.string().email().required(),
   password: Joi.string().min(6).required(),
})

export const loginSchema = Joi.object({
   email: Joi.alternatives()
      .try(Joi.string().email(), Joi.string().pattern(/^\+?[0-9]{10,15}$/))
      .required(),
   password: Joi.string().min(6).required(),
})
