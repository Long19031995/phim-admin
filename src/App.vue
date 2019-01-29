<template>
  <form @submit="addFilm()" id="app" class="container pb-5">
    <div class="row">
      <div class="col-sm-12 text-center mt-2 mb-4">
        <h1>Admin Browser Film</h1>
      </div>
    </div>

    <div class="row">
      <div v-for="(attributeGroup, index) in listAttributeGroup" class="col-12 col-lg-4 attribute-group">
        <div v-for="attribute in attributeGroup" class="row mb-3">
          <div class="col-sm-4">
            {{ attribute.label || attribute | replaceSpecialCharacter }}
          </div>

          <div class="col-sm-8">
            <div v-if="attribute.type === DROPDOWN">
              <select v-model="data[attribute.label]" class="form-control" required>
                <option v-for="option in attribute.listOption"
                         :value="option.value">
                  {{ option.key }}
                </option>
              </select>
            </div>

            <div v-else-if="attribute.type === SEARCH" class="search">
              <input @input="search(attribute.key)"
                     v-model="data[attribute.label]"
                     @focus="showSelect(attribute.key)"
                     @blur="hideSelect()"
                     type="text"
                     class="form-control"
                     :placeholder="getPlaceHolder(attribute.key)">
              <select v-if="isShowSelect === attribute.key && listSearch[attribute.key].length > 0"
                      size="5"
                      class="form-control">
                <option v-for="option in listSearch[attribute.key]"
                        @click="fillAttribute(option)"
                        :value="option">
                  {{ option.name }}
                </option>
              </select>
            </div>

            <div v-else>
              <input v-model="data[attribute]" type="text" class="form-control" required>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row position-fixed fixed-bottom">
      <button type="submit" class="btn btn-primary form-control">Add Film</button>
    </div>

    <div v-if="isShowNotify" :class="['notify', messageType]">
      {{ message }}
    </div>
  </form>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
  import api from './assets/js/api.js'
  import listAttributeGroup from './assets/constants/listAttributeGroup.js'
  import { DROPDOWN, SEARCH, FILM, FILM_GROUP, WEB } from './assets/constants/type.js'
  import { SUCCESS } from './assets/constants/response.js'

  export default {
    name: 'app',

    filters: {
      replaceSpecialCharacter (value) {
        return value.replace(/_/g, ' ')
      }
    },

    data () {
      return {
        data: {},
        listAttributeGroup: listAttributeGroup,
        DROPDOWN: DROPDOWN,
        SEARCH: SEARCH,
        listSearch: {
          [FILM]: [],
          [FILM_GROUP]: [],
          [WEB]: []
        },
        currentKey: '',
        isShowSelect: '',
        searchTimeout: {},
        message: '',
        type: '',
        isShowNotify: false
      }
    },

    computed: {
      listNameFilm () {
        return this.listSearch.film.filter((film) => film.name)
      },

      listNameFilmGroup () {
        return this.listSearch.film_group.filter((film_group) => film_group.name)
      },

      listNameWeb () {
        return this.listSearch.web.filter((web) => web.name)
      }
    },

    methods: {
      search (key) {
        const value = event.srcElement.value

        clearTimeout(this.searchTimeout)

        this.searchTimeout = setTimeout(async () => {
          const response = await api.search(key, value)

          if (response && response.data.message === SUCCESS) {
            this.listSearch[key] = response.data.results[key]
            this.currentKey = key
          }
        }, 500)
      },

      showSelect (key) {
        this.isShowSelect = key
      },

      hideSelect () {
        setTimeout(() => {
          this.isShowSelect = ''
        }, 100)
      },

      getPlaceHolder (key) {
        if (key === FILM) {
          return 'Tìm kiếm theo tên phim'
        } else if (key === FILM_GROUP) {
          return 'Tìm kiếm theo tên nhóm phim'
        } else if (key === WEB) {
          return 'Tìm kiếm theo tên web'
        }
      },

      fillAttribute (option) {
        const data = this.convertToData(option)
        this.fillData(data)
        this.listSearch[this.currentKey] = []
      },

      convertToData (option) {
        if (this.currentKey === FILM) {
          return {
            film_name: option.name,
            film_id: option.id,
            film_link: option.link,
            film_tag: option.tag,
            film_type: option.type,
            film_quality: option.quality,
            film_chapter: option.chapter,
            film_create_at: option.create_at,
            film_source_id: option.source_id,
            film_group_name: option.film_group.name,
            film_group_id: option.film_group.id,
            film_group_thumb: option.film_group.thumb,
            film_group_thumb1: option.film_group.thumb1,
            film_group_create_at: option.film_group.create_at,
            film_group_number_chapter: option.film_group.number_chapter,
            film_group_current_chapter: option.film_group.current_chapter,
            film_group_description: option.film_group.description,
            web_name: option.web.name,
            web_id: option.web.id,
            web_link: option.web.link,
            web_thumb: option.web.thumb,
            web_thumb1: option.web.thumb1
          }
        } else if (this.currentKey === FILM_GROUP) {
          return {
            film_group_name: option.name,
            film_group_id: option.id,
            film_group_thumb: option.thumb,
            film_group_thumb1: option.thumb1,
            film_group_create_at: option.create_at,
            film_group_number_chapter: option.number_chapter,
            film_group_current_chapter: option.current_chapter,
            film_group_description: option.description
          }
        } else if (this.currentKey === WEB) {
          return {
            web_name: option.name,
            web_id: option.id,
            web_link: option.link,
            web_thumb: option.thumb,
            web_thumb1: option.thum1
          }
        }
      },

      fillData (data) {
        Object.keys(data).forEach((key) => {
          if (!this.data[key]) {
            this.data[key] = data[key]
          }
        })
      },

      async addFilm () {
        event.preventDefault()
        const response = await api.addFilm(this.data)

        if (response.data.message === SUCCESS) {
          this.showNotify('success', 'Thêm phim thành công')
        } else {
          this.showNotify('fail', 'Thêm phim không thành công')
        }
      },

      showNotify (type, message) {
        this.message = message
        this.messageType = type
        this.isShowNotify = true

        setTimeout(() => {
          this.hideNotify()
        }, 3000)
      },

      hideNotify () {
        this.isShowNotify = false
      }
    }
  }
</script>

<style lang="sass" scoped>
#app
  .attribute-group
    border: 1px solid #ccc
    padding: 8px
    border-radius: 8px
    margin: 8px 0
    .search
      position: relative
      select
        position: absolute
        z-index: 2
  .notify
    position: fixed
    top: 20px
    right: 20px
    z-index: 3
    padding: 20px
    color: white
    &.success
      background-color: green
    &.fail
      background-color: red
</style>
