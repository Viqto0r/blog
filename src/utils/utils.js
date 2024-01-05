export const capitalize = (str) => {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

export const convertEmailToNickname = (email) => {
  if (!email) return ''
  return email.match(/^.+(?=@)/)[0]
}

export const getLastPath = (url) => url.replace(/.+\/(?=.+)/, '')
