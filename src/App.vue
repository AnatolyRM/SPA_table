<script setup>
import {ref, computed, watch} from 'vue'
import dates from './date'

let userPage = ref(4)
let thisPageNum = ref(1)
const d = ref(dates)

const pages = computed(() => Math.ceil(d.value.length / userPage.value))
const paginatUser = computed(() => {
  let from = (thisPageNum.value - 1) * userPage.value
  let to = from + userPage.value
  return d.value.slice(from, to)
})

const pageClick = page => thisPageNum.value = page

const sortByName = () => d.value.sort((a, b) => a.name.localeCompare(b.name))
const sortByPhone = () => d.value.sort((a, b) => {
  let numA = String(a.phone).replace(/[^0-9]/g, '')
  let numB = String(b.phone).replace(/[^0-9]/g, '')
  return numA - numB
})
const sortByUsername = () => d.value.sort((a, b) => a.username.localeCompare(b.username))
const sortByEmail = () => d.value.sort((a, b) => a.email.localeCompare(b.email))

const filterName = ref('')
const filterCon = ref('')
const inpVal = ref('')

const filteredList = computed(() => {
  if ((filterName.value === '' || filterCon.value === '')) {
    return d.value
  }
  return d.value.filter((item) => inpVal.value === '' ? true : filterName.value.indexOf(inpVal.value) > -1)
})

</script>

<template>
  <div class="menu__filter">
    <select id="filter-name" v-model="filterName">
      <option disabled value="">Выбор колонки</option>
      <option value="name">Name</option>
      <option value="phone">Phone</option>
      <option value="username">Username</option>
      <option value="email">Email</option>
    </select>
    <select id="filter-conditions" v-model="filterCon">
      <option disabled value="">Выбор условия</option>
      <option value="equals">Равно</option>
      <option value="contains">Содержит</option>
      <option value="more">Больше</option>
      <option value="less">Меньше</option>
    </select>
    <input type="text" id="filter-value" placeholder="edit me" v-model="inpVal" @input="filteredList">
  </div>


  <div class="header">
    <p @click="sortByName">
      <span class="mane-filter icon">↕</span>
      Name
    </p>
    <p @click="sortByPhone">
      <span class="phone-filter icon">↕</span>
      Phone
    </p>
    <p @click="sortByUsername">
      <span class="username-filter icon">↕</span>
      Username
    </p>
    <p @click="sortByEmail">
      <span class="email-filter icon">↕</span>
      Email
    </p>
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
  padding-left: 10px;
}

.header p:hover {
  cursor: pointer;
  background-color: #b6b5b5;
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

.icon {
  margin-right: 5px;
}

.menu__filter {
  display: flex;
  justify-content: end;
  margin-right: 84px;
}
</style>
