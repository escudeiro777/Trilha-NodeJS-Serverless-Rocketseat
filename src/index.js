const { request } = require('express');
const express = require('express')

const app = express();
app.use(express.json());

//chamado de porta: localhost:3333

/**
 * GET - Buscar info
 * POST - Inserir info
 * PUT - Atualizar info
 * PATCH - Atualizar info específica
 * DELETE - Deletar info
 */

/**
 * Tipos de Parametros
 * 
 * -Route Params => Identifica recursos de editar/deletar/buscar
 * - Query Params => Paginação / Filtro
 * - Body Params => Para Alteração / Inserção (JSON)
 */

app.get("/cursos", (request, response)=>{
    const query = request.query;
    console.log(query);
    return response.json(["curso 1 2 3"])
});

app.post("/cursos/:id", (request, response)=>{
    const body = request.body;
    console.log(body)
    return response.json(["curso 1 2 3 4"])
});

app.put("/cursos/:id", (request, response)=>{
    const params = request.params;
    console.log(params);
    return response.json(["curso 1 2 3 5"])
});

app.put("/cursos/:id", (request, response)=>{
    return response.json(["curso 1 2 3 5"])
});

app.patch("/cursos/:id", (request, response)=>{
    return response.json(["curso 1 2 4 5"])
});

app.delete("/cursos/:id", (request, response)=>{
    return response.json(["curso 1 3 5"])
});
app.listen(3333)