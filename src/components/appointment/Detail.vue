<template>
  <div class="appointment">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">Detail Appointment</div>
            <div class="card-body">
              <h3>Doctor Name : {{ patient.doctor_name }}</h3>
              <h4>Appointment Description : {{ patient.description }}</h4>
              <hr />
              <div class="table-responsive mt-2">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ patient.daftar_pasien }}</td>
                    </tr>
                  </tbody>
                </table>
                <router-link
                  :class="['btn btn-sm btn-block btn-primary mb-2']"
                  to="/appointment"
                >
                  Back
                </router-link>
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
  data() {
    return {
      patient: {},
      // errors:[],
    };
  },
  created() {
    axios
      .get(
        `https://compfest-sea-hospital.herokuapp.com/appointment/detail/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
        this.patient
      )
      .then((response) => {
        this.patient = response.data.data;
        console.log(response);
      });
  },
};
</script>