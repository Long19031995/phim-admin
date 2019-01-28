import axios from "axios";
import { baseUrl } from './config.js'

export default {
  get: function (path) {
    return axios.get(baseUrl + path)
  }
}