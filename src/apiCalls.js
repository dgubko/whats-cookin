// Your fetch requests will live here!
const usersUrl = 'http://localhost:3001/api/v1/users'
const ingredientsUrl = 'http://localhost:3001/api/v1/ingredients'
const recipesUrl = 'http://localhost:3001/api/v1/recipes'
// const requestProperties = {
//   userID: /**/,
//   ingredientID: /**/,
//   ingredientModification: /**/
// }

// const samplePostProperties = {
//   userID: 1,
//   ingredientID: 11297,
//   ingredientModification: -1
// }

function getApiData(url) {
  const fetchedApi = fetch(url)
    .then((res) => res.json())
    // .then((res) => console.log(res))
    .catch(err => console.log('To err is human', err))
  return fetchedApi
}

const fetchedUsers = getApiData(usersUrl)
const fetchedRecipes = getApiData(recipesUrl)
const fetchedIngredients = getApiData(ingredientsUrl)



function postData() {
  let postedData = fetch(usersUrl, {
    method: 'POST',
    body: JSON.stringify(samplePostProperties),
    headers: { 'content-type': 'application/json'}
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log('To err is human', err))
  return postedData
}

// function deleteData() {
//   let deletedData = fetch(usersUrl, {
//     method: 'DELETE',
//     body: JSON.stringify(),
//     headers: { 'content-type': 'application/json'}
//   })
//   andThen()
//   return deletedData
// }

export {usersUrl, ingredientsUrl, recipesUrl, fetchedIngredients, fetchedRecipes, fetchedUsers, postData}
// getUsersData, getIngredientsData, getRecipeData