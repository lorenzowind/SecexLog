module.exports = middleware => {
  return (req, res, next) => {
    if (req.user.cargo === "Administrador") {
      middleware(req, res, next);
    } else {
      res.status(401).send("Acesso somente para administradores");
    }
  };
};
