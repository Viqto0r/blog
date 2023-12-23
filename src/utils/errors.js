export class BannedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'BannedError'
  }
}
