

export const validateSchema = (schema) => (req, res, next) => {
   try {
      schema.parse(req.body);
      next();
   } catch (error) {
      // error.errors.map((error) => console.log(error.message));
      return res
         .status(400)
         .json(error.errors.map((error) => error.message));
   }
}