/**
 * Custom transformer for ts-jest to replace import.meta.env with an empty object
 */
module.exports = {
  process(src) {
    return {
      code: src.replace(/import\.meta\.env/g, '({})'),
    }
  },
}
