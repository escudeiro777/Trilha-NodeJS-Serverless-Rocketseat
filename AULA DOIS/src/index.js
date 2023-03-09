const express = require ("express")
const { v4: uuidv4 } = require ("uuid")

const app = express ();
app.use(express.json());

const customers = [];

/**
 * cpf - string
 * name -string
 * id - uuid - identificador unico universal
 * statement []
 */

//MIDDLEWARE
function verifyIfExistsAccountCPF(req, res, next){
    const {cpf} = req.headers;
    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer ) {
        return res.status(400).json({error: "Costumer not found"});
    }

    req.customer = customer;

    return next();

}

//////// CADASTRO DE CONTA
app.post("/account" , (request, response) => {

    const {cpf, name} = request.body;

//////// VALIDAÇÃO DE CPF
    const costumerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );


    if (costumerAlreadyExists) {
        return response.status(400).json({error: "Customer already exists!"})
    }

    customers.push({
        cpf,
        name,
        id: uuidv4,
        statement: []
    });

    return response.status(201).send();
});

//////// BUSCA DE EXTRATO BANCARIO
app.get("/statement", verifyIfExistsAccountCPF, (req , res)=>{

    const {customer} = req;
    return res.json(customer.statement);
});

//////// FAZER DEPOSITO
app.post("/deposit", verifyIfExistsAccountCPF, (req, res) =>{
    const {description, amount} = req.body;

    const {customer} = req;

    const statmentOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit",
    };

    customer.statement.push(statmentOperation);

    return res.status(201).send();
});

console.log("deu certo")
app.listen(3333);