const API_URL = "http://localhost:3001/api/";

export async function getRestaurants() {
  let response = await fetch(`${API_URL}restaurants`);
  return response.json();
}

export async function getRatings(restaurant) {
  let response = await fetch(`${API_URL}restaurants/${restaurant}/ratings`);
  return response.json();
}

export async function getRestaurant(id) {
  let response = await fetch(`${API_URL}restaurants/${id}`);
  return response.json();
}

export async function getPublications() {
  let response = await fetch(`${API_URL}publications`);

  return response.json();
}

export async function updateRestaurant(id, data) {
  return fetch(`${API_URL}restaurants/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => err);
}

export async function addRestaurant(data) {
  return fetch(`${API_URL}reviews`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}

export async function addReview(data) {
  return fetch(`${API_URL}ratings`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}

export async function deleteRestaurant(id) {
  console.log(id);

  return fetch(`${API_URL}restaurants/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}
