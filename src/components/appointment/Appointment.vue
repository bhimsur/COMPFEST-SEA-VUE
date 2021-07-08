<template>
  <div class="appointment">
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
            <div class="card-header">Appointment List</div>
            <div class="card-body">
              <router-link
                :class="['btn btn-md btn-success mb-2']"
                to="/create"
                v-if="user_level == 1"
                >Add Appointment</router-link
              >
              <hr v-if="user_level == 1" />
              <div class="table-responsive mt-2">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(appointment, index) in appointments"
                      :key="appointment.id"
                    >
                      <td>{{ appointment.doctor_name }}</td>
                      <td>{{ appointment.description }}</td>
                      <td class="text-center">
                        <router-link
                          :to="{
                            name: '/detail',
                            params: { id: appointment.id },
                          }"
                          class="btn btn-sm btn-info mx-2"
                          v-if="user_level == 1"
                          >Detail</router-link
                        >
                        <router-link
                          :to="{
                            name: '/edit',
                            params: { id: appointment.id },
                          }"
                          class="btn btn-sm btn-primary mx-2"
                          v-if="user_level == 1"
                          >Edit</router-link
                        >
                        <button
                          @click.prevent="
                            AppointmentDelete(appointment.id, index)
                          "
                          class="btn btn-sm btn-danger mx-2"
                          v-if="user_level == 1"
                        >
                          Hapus
                        </button>
                        <button
                          @click.prevent="AppointmentApply(appointment.id)"
                          class="btn btn-sm btn-primary mx-2"
                          v-if="user_level == 0"
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <h5 v-if="(user_level == 0) & (applied.length > 0)">
                  Appointment Status
                </h5>
                <table
                  class="table table-hover table-bordered"
                  v-if="(user_level == 0) & (applied.length > 0)"
                >
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(apply, index) in applied" :key="apply.id">
                      <td>{{ apply.doctor_name }}</td>
                      <td>{{ apply.description }}</td>
                      <td class="text-center">
                        <button
                          @click.prevent="AppointmentCancel(apply.id, index)"
                          class="btn btn-sm btn-danger mx-2"
                          v-if="user_level == 0"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  @click.prevent="Logout"
                  class="btn btn-sm btn-block btn-seconday mb-2"
                >
                  Logout
                </button>
              </div>
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
  data: function () {
    return {
      appointments: [],
      user_level: "",
      applied: [],
      errors: [],
    };
  },
  created() {
    axios.get(`http://127.0.0.1:8081/appointment`).then((response) => {
      this.appointments = response.data.data;
      this.user_level = localStorage.getItem("user_level");
    });
    axios
      .get(`http://127.0.0.1:8081/applied`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.applied = response.data.data;
      });
  },
  methods: {
    AppointmentDelete(id, index) {
      axios
        .delete(`http://127.0.0.1:8081/appointment/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          this.appointments.splice(index, 1);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    Logout() {
      window.localStorage.clear();
      this.$router.push({ name: "/login" });
    },
    AppointmentApply(id) {
      const data = JSON.stringify({
        id: id,
      });
      axios
        .post(`http://127.0.0.1:8081/appointment/apply/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.status == 200) {
            window.location.reload();
            console.log(response.data);
          } else if (response.data.status == 400) {
            this.errors.push(response.data.data);
            setTimeout(() => {
              this.errors.pop();
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    AppointmentCancel(id, index) {
      axios
        .delete(`http://127.0.0.1:8081/patient/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          this.applied.splice(index, 1);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>