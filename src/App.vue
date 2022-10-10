<script setup>
import {ref, computed} from 'vue'
import dates from './date'

let userPage = ref(2)
let thisPageNum = ref(1)

const pages = computed(() => Math.ceil(dates.length / userPage.value))
const paginatUser = computed(() => {
  let from = (thisPageNum.value - 1) * userPage.value
  let to = from + userPage.value
  return dates.slice(from, to)
})

const pageClick = page => {
  thisPageNum.value = page
}
</script>

<template>
  <div class="header">
    <p>Name</p>
    <p>Phone</p>
    <p>Username</p>
    <p>Email</p>
  </div>
  <div class="body">
    <div class="row"
         v-for="date in paginatUser"
         :key="date.id">
      <div class="item user-name">{{ date.name }}</div>
      <div class="item user-phone">{{ date.phone }}</div>
      <div class="item user-username">{{ date.username }}</div>
      <div class="item user-email">{{ date.email }}</div>
    </div>
  </div>
  <div class="pagination">
    <div class="page"
         v-for="page in pages"
         :key="page"
         :class="{'page__selected' : page === thisPageNum}"
         @click="pageClick(page)"
    >{{ page }}
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  border-bottom: solid 1px #e7e7e7;
}

.header p {
  flex-basis: 25%;
  text-align: left;
}

.row {
  display: flex;
  justify-content: space-around;
}

.item {
  flex-basis: 25%;
  text-align: left;
  padding: 8px 16px;
}

.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.page {
  padding: 8px;
  border-bottom: solid 1px #e7e7e7;
  margin-right: 10px;
}

.page:hover,
.page__selected {
  background: #b6b5b5;
  cursor: pointer;
  color: #fff;
}
</style>
