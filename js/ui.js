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
    li.classList.add("movie-li");

    const movieName = document.createElement("div");
    movieName.textContent = movie.name;
    movieName.classList.add("movie-name");

    const movieGenre = document.createElement("div");
    movieGenre.textContent = movie.genre;
    movieGenre.classList.add("movie-genre");

    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add("button-edit");
    buttonEdit.onclick = () => ui.fillForm(movie.id);

    const iconEdit = document.createElement("img");
    iconEdit.src = "assets/images/edit-icon.png";
    iconEdit.alt = "Edit";
    buttonEdit.appendChild(iconEdit);

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("button-delete");
    buttonDelete.onclick = async () => {
      try {
        await api.deleteMovie(movie.id);
        ui.renderMovies();
      } catch (error) {
        alert("Error deleting movie");
      }
    };

    const iconDelete = document.createElement("img");
    iconDelete.src = "assets/images/delete-icon.png";
    iconDelete.alt = "Delete";
    buttonDelete.appendChild(iconDelete);

    const icons = document.createElement("div");
    icons.classList.add("icons");
    icons.appendChild(buttonEdit);
    icons.appendChild(buttonDelete);

    li.appendChild(movieName);
    li.appendChild(movieGenre);
    li.appendChild(icons);
    movieList.appendChild(li);
  }
};

export default ui;
