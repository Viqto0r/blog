export const capitalize = (str) => {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

export const convertEmailToNickname = (email) => email.match(/^.+(?=@)/)
