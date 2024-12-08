import api from "./api.js";

const ui = {

  async fillForm(movieId) {
    const movie = await api.fetchMovieById(movieId);
    document.getElementById("movie-id").value = movie.id;
    document.getElementById("movie-name").value = movie.name;
    document.getElementById("movie-genre").value = movie.genre;
  },

  clearForm() {
    document.getElementById("movie-form").reset();
  },

  async renderMovies(filteredMovies) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    try {
      let moviesToRender;

      if (filteredMovies) {
        moviesToRender = filteredMovies;
      } else {
        moviesToRender = await api.fetchMovies();
      }

      moviesToRender.forEach(ui.addMovieToList);
    } catch {
      alert("Error rendering movies");
    }
  },

  addMovieToList(movie) {
    const movieList = document.getElementById("movie-list");
    const li = document.createElement("li");
    li.setAttribute("data-id", movie.id);
    li.classList.add("bg-white", "shadow-lg", "rounded-lg", "p-4", "flex", "flex-col", "gap-2");

    // Movie Name
    const movieName = document.createElement("h3");
    movieName.textContent = movie.name;
    movieName.classList.add("text-lg", "font-bold", "text-blue-600");

    // Genre
    const movieGenre = document.createElement("p");
    movieGenre.textContent = `Genre: ${movie.genre}`;
    movieGenre.classList.add("text-sm", "text-gray-600");

    // Year
    const movieYear = document.createElement("p");
    movieYear.textContent = `Year: ${movie.year}`;
    movieYear.classList.add("text-sm", "text-gray-600");

    // Rating
    const movieRating = document.createElement("p");
    movieRating.textContent = `IMDB Rating: ${movie.rating}`;
    movieRating.classList.add("text-sm", "text-yellow-500");

    // Actions
    const actions = document.createElement("div");
    actions.classList.add("flex", "gap-2", "mt-4");
    const buttonEdit = document.createElement("button");
    buttonEdit.textContent = "Edit";
    buttonEdit.classList.add("bg-blue-500", "text-white", "py-1", "px-3", "rounded-lg", "hover:bg-blue-600");
    buttonEdit.onclick = () => ui.fillForm(movie.id);

    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";
    buttonDelete.classList.add("bg-red-500", "text-white", "py-1", "px-3", "rounded-lg", "hover:bg-red-600");
    buttonDelete.onclick = async () => {
      try {
        await api.deleteMovie(movie.id);
        ui.renderMovies();
      } catch (error) {
        alert("Error deleting movie");
      }
    };

    actions.appendChild(buttonEdit);
    actions.appendChild(buttonDelete);

    li.appendChild(movieName);
    li.appendChild(movieGenre);
    li.appendChild(movieYear);
    li.appendChild(movieRating);
    li.appendChild(actions);

    movieList.appendChild(li);
  }

};

export default ui;
