export const fetchStartHandler = (state, { meta: { initial } }) => {
  if (initial) state.data = initial
  state.isLoading = true
  state.isError = false
  state.errorMessage = ''
}

export const errorHandler = (state, { error }) => {
  console.log(error)
  state.isLoading = false
  state.isError = true
  state.errorMessage = error.message
}
