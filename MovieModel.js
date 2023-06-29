const MOVIES_URL = import.meta.env.VITE_MOVIES_URL;
const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;
const SEARCH_URL = import.meta.env.VITE_SEARCH_URL;
const GENRES_URL = import.meta.env.VITE_GENRES_URL;

export default class MovieModel {
  constructor() {}

  async getMovies(filter = "", signal) {
    const url =
      filter && filter.length > 0 ? SEARCH_URL + "/" + filter : MOVIES_URL;
    return new Promise((resolve, reject) => {
      fetch(url, { signal })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  async getMovie(id) {
    return new Promise((resolve, reject) => {
      fetch(MOVIES_URL + "/" + id)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  async getImage(imageName) {
    return new Promise((resolve, reject) => {
      fetch(IMAGES_URL + "/" + imageName)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  async deleteMovie(id) {
    return new Promise((resolve, reject) => {
      fetch(MOVIES_URL + "/" + id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  async addImage(image) {
    const formData = new FormData();
    formData.append("image", image);

    const imageResponse = await fetch(IMAGES_URL, {
      method: "POST",
      body: formData,
    });

    if (!imageResponse.ok) {
      throw new Error("Failed to upload image: " + imageResponse.status);
    } else {
      const imageData = await imageResponse.json();
      return imageData;
    }
  }

  async addMovie(movie) {
    try {
      const imageData = await this.addImage(movie.image);
      const movieData = { ...movie, image: imageData.imageName };

      return new Promise((resolve, reject) => {
        fetch(MOVIES_URL, {
          method: "POST",
          body: JSON.stringify(movieData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  async updateMovie(movie) {
    try {
      if (!movie.id) {
        throw new Error("Movie id is required");
      }

      if (movie.image) {
        const imageData = await this.addImage(movie.image);
        movie.image = imageData.imageName;
      }

      return new Promise((resolve, reject) => {
        fetch(MOVIES_URL + "/" + movie.id, {
          method: "PATCH",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  async getAllGenres() {
    return new Promise((resolve, reject) => {
      fetch(GENRES_URL)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
