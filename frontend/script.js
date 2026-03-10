const API = "http://localhost:5000"

async function loadLeads(){

const res = await fetch(API + "/leads")

const leads = await res.json()

const list = document.getElementById("leadList")

list.innerHTML = ""

leads.forEach(lead => {

const row = document.createElement("tr")

row.innerHTML = `
<td>${lead.name}</td>
<td>${lead.email}</td>
<td>${lead.source}</td>
<td>
<select onchange="updateStatus('${lead._id}', this.value)">
<option value="new" ${lead.status === "new" ? "selected" : ""}>New</option>
<option value="contacted" ${lead.status === "contacted" ? "selected" : ""}>Contacted</option>
<option value="converted" ${lead.status === "converted" ? "selected" : ""}>Converted</option>
</select>
</td>
`

list.appendChild(row)

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

// clear input fields after adding lead
document.getElementById("name").value=""
document.getElementById("email").value=""
document.getElementById("source").value=""

loadLeads()

}


loadLeads()

async function updateStatus(id,status){

await fetch(API + "/leads/" + id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({status})
})

loadLeads()

}