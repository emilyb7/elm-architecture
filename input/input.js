// actions!
const onInputChange = event => ({ type: 'onInputChange', input: event.target.value, })
const onButtonClick = () => ({ type: 'onButtonClick', })

const update = (model, action) => {
  switch(action.type) {
    case 'onInputChange': return Object.assign({}, model, { input: action.input, })
    case 'onButtonClick': return { input: '', output: model.input, }
    default: return model
  }
}

const view = (signal, model, root) => {
  empty(root);
  const inp = input(model, signal, onInputChange);

  [
    inp,
    button('submit', signal, onButtonClick, model.input.length === 0),
    outputDiv(model)
  ].forEach(el => root.appendChild(el))
  inp.focus()
}

const mount = (model, view, root_element_id) => {
  const root = document.getElementById(root_element_id)
  const signal = action => (event) => {
    model = update(model, action(event))
    view(signal, model, root)
  }
  view(signal, model, root)
}

const empty = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

const button = (text, signal, action, state) => {
  const btn = document.createElement('button')
  btn.textContent = text
  btn.onclick = signal(action)
  btn.disabled = state
  btn.tabIndex = 1
  return btn
}

const input = (model, signal, action) => {
  const event = signal(action)
  const field = document.createElement('input')
  field.value = model.input
  field.type = "text"
  field.autofocus = true
  field.oninput = event
  return field
}

const outputDiv = ({ output, }) => {
  const container = document.createElement('div')
  container.id = 'output'
  const text = document.createElement('p')
  text.textContent = output
  container.appendChild(text)
  return container
}
