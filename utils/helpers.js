/**
 *
 * @param {import("express").RequestHandler} fn
 * @returns {import("express").RequestHandler}
 */
const catchError = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  catchError,
};
