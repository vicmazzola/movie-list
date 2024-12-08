import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  ui.renderMovies();

  const movieForm = document.getElementById("movie-form");
  const buttonCancel = document.getElementById("button-cancel");

  movieForm.addEventListener("submit", handleFormSubmission);
  buttonCancel.addEventListener("click", handleCancellation);
});

async function handleFormSubmission(event) {
  event.preventDefault();
  const id = document.getElementById("movie-id").value;
  const name = document.getElementById("movie-name").value;
  const genre = document.getElementById("movie-genre").value;
  const year = parseInt(document.getElementById("movie-year").value, 10);
  const rating = parseFloat(document.getElementById("movie-rating").value);

  try {
    if (id) {
      await api.editMovie({ id, name, genre, year, rating });
    } else {
      await api.saveMovie({ name, genre, year, rating });
    }

    ui.renderMovies();
    ui.clearForm();
    Swal.fire("Success", "Movie saved successfully!", "success");
  } catch {
    Swal.fire("Error", "Failed to save the movie. Please try again.", "error");
  }
}


async function filterMovies(searchTerm){
  try {
    const movies = await api.fetchMovies();
    const lowerCaseTerm = searchTerm.toLowerCase();

    const filteredMovies = movies.filter(movie => {
      return (
          movie.name.toLowerCase().includes(lowerCaseTerm) ||
          movie.genre.toLowerCase().includes(lowerCaseTerm)
      );
    });

    ui.renderMovies(filteredMovies);

  } catch (error) {
    alert("Error filtering movies");
  }
}

document.getElementById("search-field").addEventListener("input", event => {
  const searchTerm = event.target.value;
  filterMovies(searchTerm);
});



function handleCancellation() {
  ui.clearForm();
}
