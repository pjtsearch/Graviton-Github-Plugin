export interface Page {
  page: string
  args: any
}

export class PageHistory {
  length: number = 0
  state: Page[] = []
  onChange: Function
  constructor(onChange: (page: Page) => void) {
    this.onChange = onChange
  }
  back(): void {
    this.go(-1)
    this.onChange(this.state[this.length - 1])
  }
  go(delta: number): void {
    this.replaceState(this.state[this.length - 1 + delta])
    this.onChange(this.state[this.length - 1])
  }
  pushState({ page, args }: Page): void {
    this.state = [...this.state, { page, args }]
    this.length++
    this.onChange(this.state[this.length - 1])
  }
  replaceState({ page, args }: Page): void {
    this.state[this.length - 1] = { page, args }
    this.onChange(this.state[this.length - 1])
  }
}
