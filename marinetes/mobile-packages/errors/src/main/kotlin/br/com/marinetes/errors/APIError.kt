class APIError : ErrorBase {
  constructor() : super(
    message = "There was an unknown error in the API",
    code = "APIError",
    status = 500
  )
}