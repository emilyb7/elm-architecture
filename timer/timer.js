// actions!
const tick = () => ({ type: 'tick', })
const pause = () => ({ type: 'pause', time: new Date().getTime(), })
const start = () => ({ type: 'start', time: new Date().getTime(), })

const update = (model, action) => {
  switch(action.type) {
    case 'start':
      return {
        running: true,
        startTime: (model.startTime || action.time),
        pauseTime: null,
        offset: (model.offset || 0) + (model.pauseTime
          ? action.time - model.pauseTime
          : 0
        )
      }
    case 'pause':
      return {
        running: false,
        startTime: model.startTime,
        pauseTime: action.time,
        offset: model.offset,
      }
    default: return model
  }
}

const view = (signal, model, root) => {
  empty(root);

  [
    display(model, signal, tick),
    button('start', signal, start, model.running),
    button('pause', signal, pause, !model.running),
  ].forEach(el => root.appendChild(el))
}

const mount = (model, view, root_element_id) => {
  const root = document.getElementById(root_element_id);
  const signal = (action) => (event) => {
    model = update(model, action())
    view(signal, model, root)
  }
  view(signal, model, root)
}

const empty = node => {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

const button = (buttonTxt, signal, action, state) => {
  const btn = document.createElement('button')
  btn.innerHTML = buttonTxt
  btn.disabled = state
  btn.onclick = signal(action)
  return btn
}

let ticker;

const display = (model, signal, action) => {
  if (model.running && !ticker) {
    ticker = setInterval(signal(tick), 100)
  } else if (!model.running) {
    clearInterval(ticker)
    ticker = null;
  }
  const container = document.createElement('div')
  container.className = 'display'
  
  const time = document.createElement('p')
  time.textContent = model.startTime > 0
    ? Math.floor((new Date().getTime() - model.startTime - model.offset) / 1000)
    : 0
  container.appendChild(time)
  return container
}
