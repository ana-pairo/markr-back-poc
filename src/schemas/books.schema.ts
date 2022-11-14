import joi from "joi";

const newBookSCHEMA = joi.object({
  name: joi.string().trim().required(),
  link: joi
    .string()
    .regex(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    ),
  chaptersNumber: joi.number(),
  pagesNumber: joi.number(),
  status: joi.string().required().valid("reading", "finished"),
});

export { newBookSCHEMA };
