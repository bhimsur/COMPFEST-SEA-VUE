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
      <div class="my-2">
        <form @submit.prevent="Register">
          <h3>Sign Up</h3>
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              class="form-control"
              placeholder="Enter First Name"
              v-model="register.first_name"
            />
          </div>
          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              class="form-control"
              placeholder="Enter Last Name"
              v-model="register.last_name"
            />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              class="form-control"
              placeholder="Enter Username"
              v-model="register.username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              class="form-control"
              placeholder="Enter Password"
              v-model="register.password"
            />
          </div>
          <div class="form-group">
            <label for="age">Age</label>
            <input
              type="text"
              name="age"
              class="form-control"
              placeholder="Enter Age"
              v-model="register.age"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              class="form-control"
              placeholder="Enter Email"
              v-model="register.email"
            />
          </div>
          <button type="submit" class="btn btn-dark btn-lg btn-block mt-3">
            Sign Up
          </button>
          <p class="text-right forgot-password">
            Already registered <router-link to="/login">Login?</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      register: {},
      errors: [],
    };
  },
  methods: {
    Register(e) {
      if (this.register) {
        axios
          .post(`http://127.0.0.1:8081/auth/register`, this.register)
          .then((response) => {
            if (localStorage.getItem("token") == null) {
              localStorage.setItem("token", response.data.data.access_token);
            } else {
              localStorage.setItem("token", response.data.data.access_token);
            }
          })
          .then(() => {
            this.$router.push({ name: "/login" });
          })
          .then((error) => {
            console.log(error.response);
          });
      }
      this.errors = [];
      if (!this.register.username) {
        this.errors.push("Insert Username");
      }
      if (!this.register.password) {
        this.errors.push("Insert Password");
      }
      if (!this.register.first_name) {
        this.errors.push("Insert first_name");
      }
      if (!this.register.last_name) {
        this.errors.push("Insert last_name");
      }
      if (!this.register.age) {
        this.errors.push("Insert age");
      }
      if (!this.register.email) {
        this.errors.push("Insert email");
      }
      e.preventDefault();
    },
  },
};
</script>