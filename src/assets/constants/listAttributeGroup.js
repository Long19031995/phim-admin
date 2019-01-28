import { DROPDOWN, SEARCH, FILM, FILM_GROUP, WEB } from './type.js'

const film = [
  {
    label: 'film_name',
    type: SEARCH,
    key: FILM
  },
  'film_id',
  'film_link',
  'film_tag',
  {
    label: 'film_type',
    type: DROPDOWN,
    listOption: [
      {
        key: 'thuyết minh',
        value: 1
      },
      {
        key: 'vietsub',
        value: 2
      }
    ]
  },
  {
    label: 'film_quality',
    type: DROPDOWN,
    listOption: [
      {
        key: 'hd',
        value: 1
      },
      {
        key: 'cam',
        value: 2
      },
      {
        key: 'trailer',
        value: 3
      }
    ]
  },
  'film_chapter',
  'film_create_at',
  'film_source_id'
]

const filmGroup = [
  {
    label: 'film_group_name',
    type: SEARCH,
    key: FILM_GROUP
  },
  'film_group_id',
  'film_group_thumb',
  'film_group_thumb1',
  'film_group_create_at',
  'film_group_number_chapter',
  'film_group_current_chapter',
  'film_group_description'
]

const web = [
  {
    label: 'web_name',
    type: SEARCH,
    key: WEB
  },
  'web_id',
  'web_link',
  'web_thumb',
  'web_thumb1'
]

export default [
  film,
  filmGroup,
  web
]