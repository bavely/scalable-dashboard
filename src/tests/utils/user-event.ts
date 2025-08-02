import { fireEvent } from '@testing-library/react'

export default {
  setup() {
    return {
      async click(element: Element) {
        fireEvent.click(element)
      },
        async type(element: Element, text: string) {
          // Directly set the value before dispatching events
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          element.value = text
          const name = (element as HTMLInputElement).name
          fireEvent.input(element, { target: { value: text, name }, currentTarget: { value: text, name } })
        },
    }
  },
}
