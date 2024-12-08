import api from "./api.js";

const ui = {
  async fillFormInModal(movie) {
    const { value: formValues } = await Swal.fire({
      title: `Edit Movie: ${movie.name}`,
      html: `
        <label for="edit-movie-name" class="block text-left">Name:</label>
        <input id="edit-movie-name" type="text" value="${movie.name}" class="swal2-input" />
        
        <label for="edit-movie-genre" class="block text-left">Genre:</label>
        <input id="edit-movie-genre" type="text" value="${movie.genre}" class="swal2-input" />
        
        <label for="edit-movie-year" class="block text-left">Year:</label>
        <input id="edit-movie-year" type="number" value="${movie.year}" class="swal2-input" />
        
        <label for="edit-movie-rating" class="block text-left">IMDB Rating:</label>
        <input id="edit-movie-rating" type="number" step="0.1" max="10" min="0" value="${movie.rating}" class="swal2-input" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const name = document.getElementById("edit-movie-name").value;
        const genre = document.getElementById("edit-movie-genre").value;
        const year = document.getElementById("edit-movie-year").value;
        const rating = document.getElementById("edit-movie-rating").value;

        if (!name || !genre || !year || !rating) {
          Swal.showValidationMessage("All fields are required!");
        } else {
          return { name, genre, year, rating };
        }
      },
    });

    if (formValues) {
      try {
        // Update the movie using the API
        await api.editMovie({ id: movie.id, ...formValues });
        ui.renderMovies(); // Re-render the list after updating
        Swal.fire("Success", "Movie updated successfully!", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to update the movie. Please try again.", "error");
      }
    }
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
    buttonEdit.onclick = async () => {
      const movieDetails = await api.fetchMovieById(movie.id);
      ui.fillFormInModal(movieDetails);
    };

    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";
    buttonDelete.classList.add("bg-red-500", "text-white", "py-1", "px-3", "rounded-lg", "hover:bg-red-600");

    buttonDelete.onclick = async () => {
      try {
        // Confirmation alert before deleting
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to delete this movie? This action cannot be undone.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
        });

        if (result.isConfirmed) {
          // Delete the movie
          await api.deleteMovie(movie.id);
          ui.renderMovies();

          // Success alert
          Swal.fire("Deleted!", "The movie has been deleted.", "success");
        }
      } catch (error) {
        // Error alert
        Swal.fire("Error", "Failed to delete the movie. Please try again.", "error");
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
  },
};

export default ui;
