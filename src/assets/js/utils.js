export function buildQuery (query) {
  let result = ''

  Object.keys(query).forEach((key) => {
    result += key + '=' + query[key] + '?'
  })

  return result
}