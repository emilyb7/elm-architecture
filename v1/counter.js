// actions!
const inc = 'inc'
const dec = 'dec'
const res = 'res'

const update = (model, action) => {
  switch(action) {
    case inc: return model + 1
    case dec: return model - 1
    case res: return 0
    default: return model
  }
}

const view = (signal, model, root) => {
  empty(root);

  [
    counter(model),
    button('+', signal, inc),
    button('-', signal, dec),
  ].forEach(el => root.appendChild(el))
}

const mount = (model, view, root_element_id) => {
  const root = document.getElementById(root_element_id)
  const signal = action => () => {
    model = update(model, action)
    view(signal, model, root)
  }
  view(signal, model, root)
}

const empty = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

const button = (text, signal, action) => {
  const btn = document.createElement('button')
  btn.className = action
  btn.id = action
  btn.textContent = text
  btn.onclick = signal(action)
  return btn
}

const counter = model => {
  const container = document.createElement('div')
  container.className = 'counter'
  container.id = 'counter'
  Array(model).fill(0).forEach(el => {
    const cat = document.createElement('img')
    cat.className = 'cat'
    cat.src = 'cat.png'
    container.appendChild(cat)
  })
  return container
}
