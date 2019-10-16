import React, { Component } from "react";
import HeaderUser from "../components/HeaderUsuario/index";

import Mais from "../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";

import "./styles.css";

/*import api from "../../../services/api";*/

export default class CrudUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      nome: "",
      login: "",
      cargo: "",
      senha: "",

      row: [],
      popUp: [],

      popUpStats: false
    };
  }

  /*componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const res = await api.get("");
    continuacao api...
  };*/

  createPopUp = ev => {
    ev.preventDefault();

    let popUp = this.state.popUp;

    const h1 = "Adicionar Usuário";
    const nome = "Nome";
    const login = "Login";
    const cargo = "Cargo";
    const senha = "Senha";

    popUp.push({ h1, nome, login, cargo, senha });
    this.setState({ popUp: popUp, popUpStats: true });
  };

  handleChange = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;

    console.log(name);

    if (name === "login" && ev.target.value.includes("_")) {
      console.log(name);
      return;
    }
    state[name] = ev.target.value;
    console.log(state);
    this.setState(state);
  };

  validate = () => {
    let nameError = "";
    let loginError = "";
    let passwordError = "";

    if (
      this.state.nome.includes("") ||
      this.state.login.includes("") ||
      this.state.senha.includes("")
    ) {
      nameError = "Por favor, preencha todos os campos";
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

    return true;
  };

  handleSubmit = ev => {
    ev.preventDefault();

    const isValid = this.validate();

    const state = {
      nome: this.state.nome,
      login: this.state.login,
      cargo: this.state.cargo,
      senha: this.state.senha
    };

    console.log(state);

    if (isValid) {
      this.createRow(state);

      this.setState({ popUp: [], popUpStats: false });
    }
  };

  createRow = state => {
    let row = this.state.row;
    row.push(state);
    this.setState({ row: row });
  };

  render() {
    return (
      <div className="body">
        <HeaderUser />

        <h2>Pesquisar usuários</h2>
        <input type="text" id="text" disabled={this.state.popUpStats} />

        <div className="addUser">
          <h2>Adicionar Usuário</h2>
          <button onClick={this.createPopUp} disabled={this.state.btAddStats}>
            <img src={Mais} alt="" />
          </button>
        </div>

        <div className="tableUser">
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Login</th>
                <th>Cargo</th>
                <th>Senha</th>
              </tr>
            </thead>
            <tbody>
              {this.state.row.map((c, i) => (
                <tr key={i} align="center">
                  <td>{c.nome}</td>
                  <td>{c.login}</td>
                  <td>{c.cargo}</td>
                  <td>{c.senha}</td>
                  <td>
                    <button disabled={this.state.popUpStats} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {this.state.popUp.map((c, i) => (
          <div className="popUp" key={i}>
            <div>
              <h2>{c.h1}</h2>

              <h3>{c.nome}</h3>
              <input
                type="text"
                name="nome"
                onChange={this.handleChange}
                required
              />

              <h3>{c.login}</h3>
              <input
                type="text"
                name="login"
                onChange={this.handleChange}
                required
              />

              <h3>{c.cargo}</h3>
              <input
                type="text"
                name="cargo"
                onChange={this.handleChange}
                required
              />

              <h3>{c.senha}</h3>
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
      </div>
    );
  }
}
