const emailMiddleware = (req, res, next) => {
  try {
    const email = req.headers.email.split(' ')[1];
    req.email = email;
    next();
  }catch(err) {
    console.log(err);
  }
}

export default emailMiddleware;
