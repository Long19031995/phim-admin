import { FILM, FILM_GROUP, WEB } from '../constants/type.js'
import http from './http.js'
import { buildQuery } from './utils.js'

export default {
  search (key, value) {
    if (key === FILM) {
      return this.searchFilm(value)
    }

    if (key === FILM_GROUP) {
      return this.searchFilmGroup(value)
    }

    if (key === WEB) {
      return this.searchWeb(value)
    }
  },

  searchFilm (value) {
    return http.get(`/film/search?q=${value}`)
  },

  searchFilmGroup (value) {
    return http.get(`/film/group/search?q=${value}`)
  },

  searchWeb (value) {
    return http.get(`/web/search?q=${value}`)
  },

  addFilm (query) {
    return http.get(`/film/add?${buildQuery(query)}`)
  }
}