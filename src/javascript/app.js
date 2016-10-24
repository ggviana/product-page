(function (ch) {
  'use strict'

  // Setting up Chico components

  ch('[data-tabs]').forEach(function (element) {
    new ch.Tabs(element)
  })

  ch('[data-carrousel]').forEach(function (element) {
    new ch.Carousel(element, {
      pagination: true
    })
  })

  ch('[data-dropdown]').forEach(function (element) {
    new ch.Dropdown(element)
  })

  ch('[data-zoom]').forEach(function (element) {
    new ch.Zoom(element)
  })
})(ch)