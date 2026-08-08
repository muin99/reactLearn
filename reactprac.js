const user = {
  name: "Rahim",
  skills: ["HTML", "CSS"],
};

const updatedUser = {
  ...user,
  name: "Karim",
};

updatedUser.skills.push("JavaScript");

function addskill (user, skill){
    updatedUser.skills = [...user.skills, skill];
    return updatedUser;
}

console.log(user.name);
console.log(updatedUser.name);
console.log(user.skills);
console.log(updatedUser.skills);
console.log(user === updatedUser);
console.log(user.skills === updatedUser.skills);
addskill(user,"PHP");
console.log(updatedUser.skills);