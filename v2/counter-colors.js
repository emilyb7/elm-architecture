// actions!
const inc = () => ({ type: 'inc', color: Math.floor(Math.random() * 360), })
const dec = () => ({ type: 'dec', })

const update = (model, action) => {
  switch(action.type) {
    case 'inc': return model.concat([ action.color, ])
    case 'dec': return model.slice(0, model.length - 1)
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
  btn.className = action().type
  btn.id = action().type
  btn.textContent = text
  btn.onclick = signal(action())
  return btn
}

const counter = model => {
  const container = document.createElement('div')
  container.className = 'counter'
  container.id = 'counter'
  const para = document.createElement('p')
  container.appendChild(para)
  model.forEach(el => {
    const name = document.createElement('span')
    name.textContent = '🥑'
    const color =  `HSL(${el}, 60%, 48%)`
    name.style.background = color
    para.appendChild(name)
  })
  return container
}
