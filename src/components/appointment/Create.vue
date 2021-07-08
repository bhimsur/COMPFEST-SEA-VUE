<template>
  <div class="appointments">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-12">
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
          <div class="card">
            <div class="card-header">Add Appointment</div>
            <div class="card-body">
              <form @submit.prevent="AppointmentStore">
                <div class="form-group">
                  <label for="doctor_name">Doctor Name</label>
                  <input
                    type="text"
                    name="doctor_name"
                    v-model="appointment.doctor_name"
                    class="form-control"
                    placeholder="Enter Doctor Name"
                  />
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    class="form-control"
                    v-model="appointment.description"
                    placeholder="Enter Description"
                  />
                </div>
                <button type="submit" class="btn btn-md btn-success mx-2">
                  Save
                </button>
                <button type="reset" class="btn btn-md btn-danger mx-2">
                  Reset
                </button>
                <router-link
                  to="/appointment"
                  class="btn btn-md btn-warning mx-2"
                  >Cancel</router-link
                >
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      appointment: {},
      errors: [],
    };
  },
  methods: {
    AppointmentStore(e) {
      const data = JSON.stringify({
        doctor_name: this.appointment.doctor_name,
        description: this.appointment.description,
      });
      if (this.appointment.doctor_name && this.appointment.description) {
        axios
          .post(`http://127.0.0.1:8081/appointment`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            this.$router.push({ name: "/appointment" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.errors = [];
      if (!this.appointment.doctor_name) {
        this.errors.push("Insert Doctor Name.");
      }
      if (!this.appointment.description) {
        this.errors.push("Insert Description");
      }
      e.preventDefault();
    },
  },
};
</script>