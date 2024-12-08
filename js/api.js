const url = "https://api.jsonbin.io/v3/b/6755bc6ce41b4d34e461f41a";
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": "$2a$10$qNdHlhoLyIq2O5O3L/K/yetluBoOeJqIXCV/k3j0IdEPA0ezbVeW6", // Add your master key here
};

const api = {
  async fetchMovies() {
    try {
      const response = await axios.get(url, { headers }); // Add headers here
      return response.data.record.movies;
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Error fetching movies");
      throw error;
    }
  },

  async saveMovie(movie) {
    try {
      const movies = await this.fetchMovies();
      const updatedMovies = [...movies, movie];
      const response = await axios.put(
          url,
          { movies: updatedMovies },
          { headers } // Add headers here
      );
      return response.data;
    } catch (error) {
      console.error("Error saving movie:", error);
      alert("Error saving movie");
      throw error;
    }
  },

  async fetchMovieById(id) {
    try {
      const movies = await this.fetchMovies();
      return movies.find((movie) => movie.id === id);
    } catch (error) {
      console.error("Error fetching movie by ID:", error);
      alert("Error fetching movie by ID");
      throw error;
    }
  },

  async editMovie(movie) {
    try {
      const movies = await this.fetchMovies();
      const updatedMovies = movies.map((m) => (m.id === movie.id ? movie : m));
      const response = await axios.put(
          url,
          { movies: updatedMovies },
          { headers } // Add headers here
      );
      return response.data;
    } catch (error) {
      console.error("Error editing movie:", error);
      alert("Error editing movie");
      throw error;
    }
  },

  async deleteMovie(id) {
    try {
      const movies = await this.fetchMovies();
      const updatedMovies = movies.filter((movie) => movie.id !== id);
      const response = await axios.put(
          url,
          { movies: updatedMovies },
          { headers } // Add headers here
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Error deleting movie");
      throw error;
    }
  },
};

export default api;
