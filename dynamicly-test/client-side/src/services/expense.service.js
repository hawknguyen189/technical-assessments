// this covers all api calling function
const getAll = () => {
  return fetch(`/api/expenses/`);
};

const getID = (id) => {
  return fetch(`/api/expenses/${id}`);
};

const create = (title, amount) => {
  return fetch(`/api/expenses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, amount: amount }),
  });
};

const update = (id, amount) => {
  return fetch(`/api/expenses/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, amount: amount }),
  });
};

const deleteID = (id) => {
  return fetch(`/api/expenses/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
};

const deleteAll = () => {
  return fetch(`/api/expenses/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// const findByTitle = (title) => {
//   return http.get(`/expense?title=${title}`);
// };

export { getAll, getID, create, update, deleteID, deleteAll };
