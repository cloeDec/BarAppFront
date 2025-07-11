<template>
  <div class="login-container">
    <div class="form-box">
      <h2>Bienvenue</h2>
      <p>Connectez-vous pour poursuivre votre expérience des cocktails.</p>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input
          type="password"
          v-model="password"
          placeholder="Mot de passe"
          required
        />
        <button type="submit">Se connecter</button>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

function getRoleFromToken(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const handleLogin = async () => {
  error.value = "";
  try {
    const response = await axios.post("http://localhost:8080/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token);
    const role = getRoleFromToken();
    if (role === "CLIENT") {
      router.push("/cocktails").then(() => window.location.reload());
    } else if (role === "BARMAKER") {
      router.push("/ordercocktail").then(() => window.location.reload());
    } else {
      router.push("/").then(() => window.location.reload());
    }
  } catch (err) {
    error.value = "Email ou mot de passe incorrect.";
  }
};
</script>

<style>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #231915;
}

.form-box {
  width: 100%;
  max-width: 400px;
  background: #231915;
  border-radius: 18px;
  padding: 32px 18px 18px 18px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #fff;
}

.form-box > p {
  color: #fff;
  text-align: center;
  margin-bottom: 24px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 24px;
  background: #3a2b25;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 12px;
  outline: none;
  box-sizing: border-box;
  transition: none;
}

input[type="email"]::placeholder,
input[type="password"]::placeholder {
  color: #e5c2b2;
  opacity: 1;
}

button[type="submit"] {
  width: 100%;
  padding: 16px 0;
  background: #e55c1a;
  color: #231915;
  border: none;
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 12px;
  transition: background 0.2s;
}

button[type="submit"]:hover {
  background: #e0b49e;
}

.error {
  color: #fff;
  background: #c0392b;
  border-radius: 8px;
  padding: 10px 16px;
  margin-top: 12px;
  text-align: center;
  font-weight: 600;
}

@media (max-width: 600px) {
  .form-box {
    max-width: 98vw;
    padding: 18px 4vw 12px 4vw;
    border-radius: 10px;
  }
  h2 {
    font-size: 1.3rem;
  }
}
</style>
