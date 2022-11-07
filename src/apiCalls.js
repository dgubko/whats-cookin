// Your fetch requests will live here!

const usersUrl = 'http://localhost:3001/api/v1/users'
const ingredientsUrl = 'http://localhost:3001/api/v1/ingredients'
const recipesUrl = 'http://localhost:3001/api/v1/recipes'

// const samplePostProperties = {
//   userID: 1,
//   ingredientID: 11297,
//   ingredientModification: -1
// }

// function getApiData(url) {
//   const fetchedApi = fetch(url)
//     .then((res) => res.json())
//     // .then((res) => console.log(res))
//     .catch(err => console.log('To err is human', err))
//   return fetchedApi
// }
//----updated get request
function getApiData(url) {
  const fetchedApi = fetch(url)
    .then((res) => {
      console.log('response:', res)
      if(!response.ok) {
        throw new Error(errorMessage)
      }
      return res.json()
    })
    .catch((err)) => {
      console.err(`${err.name}`)
      displayError(errorMessage)
    }
  return fetchedApi
}


const fetchedUsers = getApiData(usersUrl)
const fetchedRecipes = getApiData(recipesUrl)
const fetchedIngredients = getApiData(ingredientsUrl)

//------updated post request
function postData(user) {
  let postedData = fetch(usersUrl, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'content-type': 'application/json'}
  })
  .then((res) => {
    console.log('response:', res)
    if(!response.ok) {
      throw new Error(errorMessage)
    }
    return res.json()
  })
  .catch((err)) => {
    console.err(`${err.name}`)
    displayError(errorMessage)
  }
  return postedData
}

// function postData(user) {
//   let postedData = fetch(usersUrl, {
//     method: 'POST',
//     body: JSON.stringify(user),
//     headers: { 'content-type': 'application/json'}
//   })
//     .then(res => res.json())
//     // .then(data => console.log(data))
//     .catch(err => console.log('To err is human', err))
//   return postedData
// }

export {usersUrl, ingredientsUrl, recipesUrl, fetchedIngredients, fetchedRecipes, fetchedUsers, postData, getApiData}
// getUsersData, getIngredientsData, getRecipeData
