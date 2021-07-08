<template>
  <div class="outer">
    <div class="inner">
      <div v-if="errors.length">
        <div
          v-for="error in errors"
          :key="error.index"
          class="alert alert-danger mt-1"
          role="alert"
        >
          {{ error }}
        </div>
      </div>
      <form @submit.prevent="Login">
        <h3>Login</h3>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            class="form-control"
            placeholder="Enter Username"
            v-model="login.username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="Enter Password"
            v-model="login.password"
          />
          <button type="submit" class="btn btn-dark btn-lg btn-block mt-3">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      login: {},
      errors: [],
    };
  },
  methods: {
    Login(e) {
      if (this.login.username && this.login.password) {
        axios
          .post(`http://127.0.0.1:8081/auth/login`, this.login)
          .then((response) => {
            if (localStorage.getItem("token") == null) {
              localStorage.setItem("token", response.data.data.access_token);
              localStorage.setItem("user_level", response.data.data.user_level);
            } else {
              localStorage.setItem("token", response.data.data.access_token);
              localStorage.setItem("user_level", response.data.data.user_level);
            }
          })
          .then(() => {
            this.$router.push({ name: "/appointment" });
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
      this.errors = [];
      if (!this.login.username) {
        this.errors.push("Insert Username");
      }
      if (!this.login.password) {
        this.errors.push("Insert Password");
      }
      e.preventDefault();
    },
  },
};
</script>