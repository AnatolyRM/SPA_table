const response = await fetch('https://jsonplaceholder.typicode.com/users')
let flag = true
let date = []

if (response.ok) {
    date = await response.json()
    flag = false
} else {
    flag = true
}

export default date