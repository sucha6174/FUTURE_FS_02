const API = "http://localhost:5000"

async function loadLeads(){

const res = await fetch(API + "/leads")

const leads = await res.json()

const list = document.getElementById("leadList")

list.innerHTML = ""

leads.forEach(lead => {

const li = document.createElement("li")

li.textContent = lead.name + " - " + lead.status

list.appendChild(li)

})

}

async function addLead(){

const name = document.getElementById("name").value
const email = document.getElementById("email").value
const source = document.getElementById("source").value

await fetch(API + "/leads",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({name,email,source})
})

loadLeads()

}

loadLeads()