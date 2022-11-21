// modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

// modulos internos
const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar conta",
          "Consultar saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answers) => {
      const action = answers["action"];
      if (action === "Criar conta") {
        createAccount();
      } else if (action === "Consultar saldo") {
        checkBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(chalk.green("Obrigado por utilizar nossos serviços!"));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ])
    .then((answers) => {
      const accountName = answers["accountName"];

      console.info(answers["accountName"]);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.red("Já existe uma conta com esse nome!"));
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );

      console.log(chalk.green("Conta criada com sucesso!"));
      operation();
    })
    .catch((err) => {
      console.log(err);
    });
}

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta:",
      },
    ])
    .then((answers) => {
      const accountName = answers["accountName"];
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Digite o valor do depósito:",
          },
        ])
        .then((answers) => {
          const amount = answers["amount"];
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Conta não encontrada, escolha outro nome!"));
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!")
    );
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  console.log(chalk.green("Foi depositado R$ " + amount + " na sua conta!"));
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

function checkBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta:",
      },
    ])
    .then((answers) => {
      const accountName = answers["accountName"];
      if (!checkAccount(accountName)) {
        return checkBalance();
      }
      const accountData = getAccount(accountName);
      console.log(
        chalk.bgCyan.black(
          "O saldo da sua conta é de R$ " + accountData.balance
        )
      );
      operation();
    })
    .catch((err) => {
      console.log(err);
    });
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta:",
      },
    ])
    .then((answers) => {
      const accountName = answers["accountName"];
      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Digite o valor do saque:",
          },
        ])
        .then((answers) => {
          const amount = answers["amount"];
          const accountData = getAccount(accountName);
          if (accountData.balance < amount) {
            console.log(chalk.bgRed.black("Saldo insuficiente!"));
            return withdraw();
          }
          accountData.balance =
            parseFloat(accountData.balance) - parseFloat(amount);
          fs.writeFileSync(
            `accounts/${accountName}.json`,
            JSON.stringify(accountData),
            function (err) {
              if (err) {
                console.log(err);
              }
            }
          );
          console.log(
            chalk.green("Foi sacado R$ " + amount + " da sua conta!")
          );
          operation();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}
