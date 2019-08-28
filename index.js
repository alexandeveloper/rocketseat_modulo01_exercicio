//cria uma variável fixa chamada express que requisitará o Express
const express = require("express");
//Cria a variável Server que chamará a função Express
const server = express();
//Configura o server para utilizar as respostas em Json
server.use(express.json());
//Cria um exemplo de dados dos Projetos
const projects = [
  {
    id: "0",
    title: "Titulo 1",
    tasks: ["task1", "task2"]
  },
  {
    id: "1",
    title: "Titulo 2",
    tasks: ["task2", "task3"]
  },
  {
    id: "2",
    title: "Titulo 3",
    tasks: ["task3", "task4"]
  }
];
/////
function verifyIfUserExist(req, res, next) {
  const id = projects[req.params.id];
  if (!id) {
    return res.status(400).json({ error: "ID não encontrado" });
  }
  return next();
}
//Retorna o log da quantidade de requisições realizadas do inćio da contagem
//até o momento
let requestNumber = 0;
function showLogResults(req, res, next) {
  requestNumber++;
  console.log(`Número de requisições: ${requestNumber}`);
  return next();
}
/////
//Cadastrar novo Projeto
server.post("/projects/", showLogResults, (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { tasks } = req.body;
  projects.push({ id: `${id}`, title: `${title}`, tasks: tasks });
  return res.json(projects);
});
//Retorna Todos os projetos
server.get("/projects", showLogResults, (req, res) => {
  return res.json(projects);
});
//Alterar o projeto
server.put("/projects/:id", verifyIfUserExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects[id].title = title;
  return res.json(projects);
});
//Exclui um projeto
server.delete("/projects/:id", verifyIfUserExist, (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);
  return res.json(projects);
});
//Adiciona um novo campo nas Tarefas
server.post("/projects/:id/tasks", verifyIfUserExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects[id].tasks.push(title);
  return res.json(projects);
});
//Retorna os resultados na porta 3000
server.listen(3000);
