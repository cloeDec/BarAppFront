<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email :</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Se connecter</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      this.error = "";
      try {
        const response = await axios.post("http://localhost:8080/login", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        // Redirige ou recharge la page après connexion
        this.$router.push("/cocktails");
      } catch (err) {
        this.error = "Email ou mot de passe incorrect.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
label {
  display: block;
  margin-bottom: 4px;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
button:hover {
  background: #369870;
}
.error {
  color: #d32f2f;
  margin-top: 10px;
  text-align: center;
}
</style>
