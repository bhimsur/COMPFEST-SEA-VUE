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
            <div class="card-header">Edit Appointment</div>
            <div class="card-body">
              <form @submit.prevent="AppointmentUpdate">
                <div class="form-group">
                  <label for="doctor_name">Doctor name</label>
                  <input
                    type="text"
                    name="doctor_name"
                    v-model="appointment.doctor_name"
                    class="form-control"
                    placeholder="Insert Doctor Name"
                  />
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    v-model="appointment.description"
                    class="form-control"
                    placeholder="Insert Description"
                  />
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-md btn-success mx-2">
                    Update
                  </button>
                  <button type="reset" class="btn btn-md btn-danger mx-2">
                    Reset
                  </button>
                  <router-link
                    to="/appointment"
                    class="btn btn-md btn-secondary mx-2"
                    >Cancel</router-link
                  >
                </div>
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
  created() {
    axios
      .get(
        `https://compfest-sea-hospital.herokuapp.com/appointment/${this.$route.params.id}`,
        this.appointment
      )
      .then((response) => {
        this.appointment = response.data.data;
      });
  },
  methods: {
    AppointmentUpdate(e) {
      const data = JSON.stringify({
        id: this.appointment.id,
        doctor_name: this.appointment.doctor_name,
        description: this.appointment.description,
      });
      if (
        this.appointment.doctor_name &&
        this.appointment.description &&
        this.appointment.id
      ) {
        axios
          .post(
            `https://compfest-sea-hospital.herokuapp.com/appointment/${this.$route.params.id}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            this.$router.push({ name: "/appointment" });
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.errors = [];
      if (!this.appointment.doctor_name) {
        this.errors.doctor_name("Insert Doctor Name");
      }
      if (!this.appointment.description) {
        this.errors.description("Insert Description");
      }

      e.preventDefault();
    },
  },
};
</script>