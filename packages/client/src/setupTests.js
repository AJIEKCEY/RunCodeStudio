// jest-dom adds custom jest matchers for asserting on DOM nodes.
// позволяет делать expect(element).toBeInTheDocument() и другие матчеры для DOM
require('@testing-library/jest-dom')

// Мокаем глобальный fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
    clone() {
      return this
    },
  })
)

// Мокаем глобальный Response для fetchBaseQuery
// (RTK Query ожидает наличие метода clone)
global.Response = class {
  constructor(body = {}, init = {}) {
    this.body = body
    this.status = init.status || 200
    this.ok = this.status >= 200 && this.status < 300
  }
  json() {
    return Promise.resolve(this.body)
  }
  clone() {
    return new global.Response(this.body, { status: this.status })
  }
}

// Мокаем window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Временно подавляем все предупреждения и ошибки в консоли
console.warn = jest.fn()
console.error = jest.fn()
