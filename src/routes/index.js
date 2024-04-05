import routesLivros from "./livrosRoutes.js";
import routesAutores from "./autoresRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));

  app.use( 
    routesLivros, 
    routesAutores
  );
};

export default routes;