const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    console.log(req.session.user);
    next(new Error("User is not logged in!"));
  }
};

export default isAuthenticated;
