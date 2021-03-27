export default function toErrorMap(err) {
  if (err?.response?.data?.errors) {
    const errors = err?.response?.data?.errors;
    const errorMap = {};
    errors.forEach(({ field, message }) => {
      errorMap[field] = message;
    });
    return errorMap;
  }
}
