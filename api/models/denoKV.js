// models/denoKV.js

const kv = await Deno.openKv("https://api.deno.com/databases/f9dd4231-d182-4f9b-89a2-db53b4765526/connect");

// Initialize Deno KV with the correct flag
const fetchedUsers = [];
for await (const entry of kv.list({ prefix: ["users"] })) {
  fetchedUsers.push(entry.value);
}
console.table(fetchedUsers);



async function getAllUsers() {
  const users = [];
  for await (const entry of kv.list({ prefix: ["users"] })) {
    users.push(entry.value);
  }
  return users;
}

export default getAllUsers  // Exporting the getAllUsers function   
