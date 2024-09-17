class ErrorBase(
  override val message: String,
  override val code: String,
  override val status: Status,
  override val data: Map<String, Any>? = null
) : ErrorObject