interface ErrorObject {
  val message: String
  val code: String
  val status: Status
  val data: Map<String, Any>?
}