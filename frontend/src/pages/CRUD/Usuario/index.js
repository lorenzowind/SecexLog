import React, { Component } from "react";
import HeaderUser from "../components/HeaderUsuario/index";

import Mais from "../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Seach from "../../../assets/Cadastro de usuário/pesquisar.png";
import Edit from "../../../assets/Cadastro de usuário/editar.png";
import Close from "../../../assets/Cadastro de usuário/sair_secex.png";
import Trash from "../../../assets/Cadastro de usuário/lixeira.png";

import "./styles.css";

import api from "../../../services/api";

// eslint-disable-next-line
var e = 0;
var editedlogin = "";

export default class CrudUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      nome: "",
      login: "",
      email: "",
      cargo: "",
      senha: "",

      search: "",

      row: [],
      popUp: [],
      editPopUp: [],

      editNome: "",
      editLogin: "",
      editEmail: "",
      editCargo: "",
      editSenha: "",

      popUpStats: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  //Métodos CRUD

  //POST (CREATE usuário)
  handleSubmit = async ev => {
    ev.preventDefault();

    const isValid = this.validate();

    const state = {
      nome: this.state.nome,
      login: this.state.login,
      email: this.state.email,
      cargo: this.state.cargo,
      senha: this.state.senha
    };

    if (isValid) {
      // eslint-disable-next-line
      const post = await api.post("/users", state).catch(err => {
        alert(err);
        window.location.reload(false);
      });

      this.createRow(state);

      this.setState({ popUp: [], popUpStats: false });
    }
  };

  //GET (READ dados na tabela)
  loadData = async () => {
    const res = await api.get("/users").catch(err => {
      alert(err);
      window.location.reload(false);
    });
    const row = this.state.row;

    for (var i = 0; i < res.data.length; i++) {
      row.push(res.data[i]);
    }

    this.setState({ row: row });
  };

  //GET (READ dados de busca)
  handleSearch = async () => {
    const res = await api.get(`/users/${this.state.search}`);

    if (!res.data || res.data.length <= 0) {
      alert("Usuário não encontrado");
      return;
    }

    var nome = null;

    !isNaN(parseInt(this.state.search, 10))
      ? (nome = res.data.nome)
      : (nome = res.data[0].nome);

    var row = this.state.row;

    for (var i = 0; i < row.length; i++) {
      if (nome === row[i].nome) {
        const aux = row[i];
        row[i] = row[0];
        row[0] = aux;

        this.setState({ row: row });
        return;
      }
    }
  };

  //PUT (UPDATE usuário)
  handleEditSubmit = async ev => {
    ev.preventDefault();

    var state = {};

    if (
      this.state.nome !== this.state.editNome ||
      this.state.login !== this.state.editLogin ||
      this.state.email !== this.state.editEmail ||
      this.state.cargo !== this.state.editCargo ||
      this.state.senha !== this.state.editSenha
    ) {
      state = {
        nome: this.state.nome,
        login: this.state.login,
        email: this.state.email,
        cargo: this.state.cargo,
        senha: this.state.senha
      };
    } else {
      state = {
        nome: this.state.editNome,
        login: this.state.editLogin,
        email: this.state.editEmail,
        cargo: this.state.editCargo,
        senha: this.state.editSenha
      };
    }

    const isValid = this.validateEdit();

    if (isValid) {
      for (var i = 0; i < this.state.row.length; i++) {
        if (this.state.row[i].login === editedlogin) {
          const row = this.state.row;

          row[i].nome = state.nome;
          row[i].login = state.login;
          row[i].email = state.email;
          row[i].cargo = state.cargo;
          row[i].senha = state.senha;

          this.setState({ row: row });
        }
      }

      const res = await api.get("/users").catch(err => {
        alert(err);
        window.location.reload(false);
      });

      // eslint-disable-next-line
      for (var i = 0; i < this.state.row.length; i++) {
        if (res.data[i].login === editedlogin) {
          // eslint-disable-next-line
          const put = await api
            .put(`/users/${res.data[i].id}`, state)
            .catch(err => {
              alert(err);
              window.location.reload(false);
            });
        }
      }

      this.setState({ editPopUp: [], popUpStats: false });
    }
  };

  //DELETE (DELETE usuário)
  handleDelete = async ev => {
    ev.preventDefault();

    // eslint-disable-next-line
    var state = null;

    if (
      this.state.nome !== this.state.editNome ||
      this.state.login !== this.state.editLogin ||
      this.state.email !== this.state.editEmail ||
      this.state.cargo !== this.state.editCargo ||
      this.state.senha !== this.state.editSenha
    ) {
      state = {
        nome: this.state.nome,
        login: this.state.login,
        email: this.state.email,
        cargo: this.state.cargo,
        senha: this.state.senha
      };
    } else {
      state = {
        nome: this.state.editNome,
        login: this.state.editLogin,
        email: this.state.editEmail,
        cargo: this.state.editCargo,
        senha: this.state.editSenha
      };
    }

    const res = await api.get("/users").catch(err => {
      alert(err);
      window.location.reload(false);
    });

    // eslint-disable-next-line
    for (var i = 0; i < this.state.row.length; i++) {
      if (res.data[i].login === editedlogin) {
        // eslint-disable-next-line
        const del = await api.delete(`/users/${res.data[i].id}`).catch(err => {
          alert(err);
          window.location.reload(false);
        });
      }
    }
    this.setState({ editPopUp: [], popUpStats: false });
    window.location.reload(false);
  };

  //FIM Métodos CRUD

  //PopUps
  createPopUp = () => {
    let popUp = this.state.popUp;

    const h1 = "Adicionar Usuário";
    const nome = "Nome";
    const login = "Login";
    const email = "Email";
    const cargo = "Cargo";
    const senha = "Senha";

    popUp.push({
      h1,
      nome,
      login,
      email,
      cargo,
      senha
    });

    this.setState({ popUp: popUp, popUpStats: true });
  };

  //PopUps
  editPopUp = c => {
    const editNome = c.nome;
    const editLogin = c.login;
    const editEmail = c.email;
    const editCargo = c.cargo;
    const editSenha = c.senha;
    for (var cont = 0; cont < this.state.row.length; cont++) {
      if (this.state.row[cont].login === editLogin) {
        editedlogin = this.state.row[cont].login;
      }
    }

    let popUp = this.state.editPopUp;

    const h1 = "Editar Usuário";
    const nome = "Nome";
    const login = "Login";
    const email = "Email";
    const cargo = "Cargo";
    const senha = "Senha";

    popUp.push({
      h1,
      nome,
      login,
      email,
      cargo,
      senha
    });

    this.setState({
      editPopUp: popUp,
      popUpStats: true,
      editNome,
      editLogin,
      editEmail,
      editCargo,
      editSenha,
      nome: editNome,
      login: editLogin,
      email: editEmail,
      cargo: editCargo,
      senha: editSenha
    });
  };

  handleChange = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;

    state[name] = ev.target.value;

    this.setState(state);
  };

  validate = () => {
    let nameError = "";
    let loginError = "";
    let emailError = "";
    let passwordError = "";

    if (
      !this.state.nome ||
      !this.state.login ||
      !this.state.senha ||
      !this.state.email ||
      !this.state.cargo
    ) {
      nameError = "Por favor, preencha todos os campos";
      alert(nameError);
      return false;
    }

    if (
      this.state.nome.includes("_") ||
      this.state.nome.includes("@") ||
      this.state.nome.includes("-")
    ) {
      nameError = "Nome não pode conter caracteres especiais";
    }

    if (this.state.login.includes(" ")) {
      loginError = "Login não pode conter espaço";
    }

    if (this.state.senha.includes(" ")) {
      passwordError = "Senha não pode conter espaço";
    }

    if (!this.state.email.includes("@")) {
      emailError = "Digite um email válido";
    }

    if (nameError) {
      alert(nameError);
      return false;
    }

    if (loginError) {
      alert(loginError);
      return false;
    }

    if (passwordError) {
      alert(passwordError);
      return false;
    }

    if (emailError) {
      alert(emailError);
      return false;
    }

    return true;
  };

  validateEdit = () => {
    let nameError = "";
    let loginError = "";
    /*let emailError = "";*/
    let passwordError = "";

    if (
      !this.state.editNome ||
      !this.state.editLogin ||
      !this.state.editSenha ||
      /*!this.state.editEmail ||*/
      !this.state.editCargo
    ) {
      nameError = "Por favor, preencha todos os campos";
      alert(nameError);
      return false;
    }

    if (
      this.state.editNome.includes("_") ||
      this.state.editNome.includes("@") ||
      this.state.editNome.includes("-")
    ) {
      nameError = "Nome não pode conter caracteres especiais";
    }

    if (this.state.editLogin.includes(" ")) {
      loginError = "Login não pode conter espaço";
    }

    if (this.state.editSenha.includes(" ")) {
      passwordError = "Senha não pode conter espaço";
    }

    /*if (!this.state.editEmail.includes("@")) {
      emailError = "Digite um email válido";
    }*/

    if (nameError) {
      alert(nameError);
      return false;
    }

    if (loginError) {
      alert(loginError);
      return false;
    }

    if (passwordError) {
      alert(passwordError);
      return false;
    }

    /*if (emailError) {
      alert(emailError);
      return false;
    }*/

    return true;
  };

  createRow = state => {
    let row = this.state.row;

    row.push(state);

    this.setState({ row: row });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ popUp: [], editPopUp: [], popUpStats: false });
  };

  render() {
    return (
      <div className="body">
        <HeaderUser />

        <h2>Pesquisar usuários</h2>
        <div className="searchUser">
          <input
            type="text"
            id="text"
            name="search"
            onChange={this.handleChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                this.handleSearch();
              }
            }}
            disabled={this.state.popUpStats}
          />
          <img src={Seach} alt="" onClick={this.handleSearch} />
        </div>

        <div className="addUser">
          <h2>Adicionar Usuário</h2>
          <button onClick={this.createPopUp} disabled={this.state.popUpStats}>
            <img src={Mais} alt="" />
          </button>
        </div>

        <div className="tableUser">
          <table>
            <thead>
              <tr>
                <th align="left">Usuário</th>
                <th align="left">Login</th>
                <th align="left">Email</th>
                <th align="left">Cargo</th>
                <th align="left">Senha</th>
              </tr>
            </thead>
            <tbody>
              {this.state.row.map((c, i) => (
                <tr key={i}>
                  <td>{c.nome}</td>
                  <td>{c.login}</td>
                  <td>{c.email}</td>
                  <td>{c.cargo}</td>
                  <td>
                    <input type="password" value={c.senha} disabled={true} />
                  </td>
                  <td>
                    <img
                      src={Edit}
                      alt=""
                      onClick={
                        (e = () => {
                          const content = c;
                          this.editPopUp(content);
                        })
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {this.state.popUp.map((c, i) => (
          <div className="popUp" key={i}>
            <div>
              <div className="title">
                <h2>{c.h1}</h2>
                <img src={Close} alt="" onClick={this.handleClose} />
              </div>

              <h4>{c.nome}</h4>
              <input
                type="text"
                name="nome"
                onChange={this.handleChange}
                required
              />

              <h4>{c.login}</h4>
              <input
                type="text"
                name="login"
                onChange={this.handleChange}
                required
              />

              <h4>{c.cargo}</h4>
              <select
                name="cargo"
                onChange={this.handleChange}
                defaultValue="selected"
                required
              >
                <option defaultValue="selected"></option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>

              <h4>{c.email}</h4>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                required
              />

              <h4>{c.senha}</h4>
              <input
                type="password"
                name="senha"
                onChange={this.handleChange}
                required
              />

              <button onClick={this.handleSubmit} />
            </div>
          </div>
        ))}
        {this.state.editPopUp.map((c, i) => (
          <div className="popUp" key={i}>
            <div>
              <div className="title">
                <h2>{c.h1}</h2>
                <img src={Close} alt="" onClick={this.handleClose} />
              </div>

              <h4>{c.nome}</h4>
              <input
                type="text"
                name="nome"
                onChange={this.handleChange}
                defaultValue={this.state.editNome}
                required
              />

              <h4>{c.login}</h4>
              <input
                type="text"
                name="login"
                onChange={this.handleChange}
                defaultValue={this.state.editLogin}
                required
              />

              <h4>{c.cargo}</h4>
              <select
                name="cargo"
                onChange={this.handleChange}
                defaultValue={this.state.editCargo}
                required
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>

              <h4>{c.email}</h4>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                defaultValue={this.state.editEmail}
                required
              />

              <h4>{c.senha}</h4>
              <input
                type="password"
                name="senha"
                onChange={this.handleChange}
                defaultValue={this.state.editSenha}
                required
              />

              <div className="btns">
                <img src={Trash} alt="Deletar" onClick={this.handleDelete} />
                <button onClick={this.handleEditSubmit} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
