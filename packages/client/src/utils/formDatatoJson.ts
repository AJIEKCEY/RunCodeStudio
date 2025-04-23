export function formDataToJson(formData: FormData): Record<string, unknown> {
  const jsonObject: Record<string, unknown> = {}
  formData.forEach((value, key) => {
    jsonObject[key] = value
  })
  return jsonObject
}
