// actions!
const fetchImage = () => ({
  type: 'fetchImage',
})

const returnImage = ({ data, }) => ({
  type: 'returnImage',
  url: data.image_original_url,
})

const imgLoaded = () => ({
  type: 'imgLoaded',
})

// update
const update = (model, action) => {
  switch(action.type) {
    case 'fetchImage':
      return Object.assign({}, model, { isFetching: true, })
    case 'returnImage':
      return {
        image: action.url,
        isFetching: false,
        hasErrored: false,
      }
    case 'imgLoaded':
      return Object.assign({}, model, { imgLoaded: true, })
    default:
      return model;
  }
}

// view
const view = (signal, model, root) => {
  empty(root)

  const el = imgContainer(model, imgLoaded, signal)
  root.appendChild(el)
}

// mount
const mount = (model, view, root_element_id) => {
  const root = document.getElementById(root_element_id)
  const signal = action =>
    event => {
       model = update(model, action(event))
       view(signal, model, root)
    }

  view(signal, model, root)

  const endpoint = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC"
  signal(fetchImage)();
  fetch(endpoint)
    .then(res => res.json())
    .then((responseData) => {
      signal(returnImage)(responseData)
    })
}

// empty
const empty = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

// components
const imgContainer = (model, action, signal) => {
  const container = document.createElement('div')
  container.id = "container"
  if (model.image) container.appendChild(imgEl(model.image, model.imgLoaded, action, signal))
  container.appendChild(spinner(model.imgLoaded))
  return container
}

const imgEl = (url, imageLoaded, action, signal) => {
  const img = document.createElement('img')
  img.src = url
  img.classList.add("transparent")
  if (!imageLoaded) {
    img.onload = signal(action)
  } else {
    img.classList.remove('transparent')
    img.classList.add('opaque')
  }
  return img
}

const spinner = (isHidden) => {
  const spinny = document.createElement('div')
  spinny.classList.add("spinny")
  if (isHidden) spinny.classList.add('hidden')
  return spinny
}
