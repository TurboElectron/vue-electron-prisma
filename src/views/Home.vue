<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Add row"
          @click="prompt = true"
        />

        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">User data</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input placeholder="email" dense v-model="user.email" autofocus />
          <q-input placeholder="Name" dense v-model="user.name" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add user" @click="addUser()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
// @ is an alias to /src
import { prisma } from "../db";
import {ref} from "vue";
const rows= ref([])
 const   columns= ref([
   {
     name: "name",
     label: "Name",
     align: "left",
     field: "name",
     sortable: true,
     filter: true,
   },
   {
     name: "email",
     label: "Email",
     align: "left",
     field: "email",
     sortable: true,
     filter: true,
   },
 ])
 const   filter = ref("")
 const   loading = ref(false)
 const   prompt = ref(false)
  const  user= ref({
    email: "",
    name: "",
  })
const fetchData = ()=> {
  loading.value = true;

  prisma.user.findMany().then((data) => {
    rows.value = data;
    loading.value = false;
  });
}
fetchData()
const addUser =()=> {
  prisma.user
      .create({
        data: {
          email: user.value.email,
          name: user.value.name,
        },
      })
      .then(() => {
        fetchData();
        prompt.value = false;
      });
}
</script>
