// Your fetch requests will live here!
const usersUrl = 'http://localhost:3001/api/v1/users'
const ingredientsUrl = 'http://localhost:3001/api/v1/ingredients'
const recipesUrl = 'http://localhost:3001/api/v1/recipes'

function getApiData(url) {
  const fetchedApi = fetch(url)
    .then((res) => res.json())
    .catch(err => console.log('To err is human', err))
  return fetchedApi
}

const fetchedUsers = getApiData(usersUrl)
const fetchedRecipes = getApiData(recipesUrl)
const fetchedIngredients = getApiData(ingredientsUrl)

function postData(user) {
  let postedData = fetch(usersUrl, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'content-type': 'application/json'}
  })
    .then(res => res.json())
    .catch(err => console.log('To err is human', err))
  return postedData
}

export {usersUrl, ingredientsUrl, recipesUrl, fetchedIngredients, fetchedRecipes, fetchedUsers, postData, getApiData}