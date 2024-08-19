window.addEventListener('DOMContentLoaded', afterRender)

function afterRender() {

  const textList = ['Ты мне не настоящий тимлид!',
    'Не в этот раз, Junior. Сегодня дата релиза!',
    'Я и есть документация', 
    'Проект интересный, и команда хорошая',
    'Лид привёл 7 джунов']

  const a = {
    width: 0,
    sliderWidth: 0,
    activeIndex: 0,
  }

  const list = document.querySelector('.slider__list__items')
  const dots = document.querySelector('.slider__dots')
  const dot = document.querySelectorAll('.slider__dot')

  window.addEventListener('resize', checkWidthScreen)
  dots.addEventListener('click', sliderHundler)
  
  checkWidthScreen()

  function checkWidthScreen() {
    a.width = window.innerWidth
    a.sliderWidth = document.querySelector('.slider__list__item').clientWidth
    list.style.marginLeft = `${a.activeIndex * a.sliderWidth * -1}px`
  }

  function sliderHundler(e) {
    e.stopPropagation()
    e.preventDefault()

    const target  = e.target
    const item = target.closest('.slider__dot')
		
    if (item) {
      if (item.className !== 'slider__dot active') {
        for (let d of dot) {
          d.className = 'slider__dot'
          d.children[0].className = 'slider__circle__dot'
        }

        a.activeIndex = Number(item.dataset.index)
        item.classList.toggle('active')
        item.children[0].classList.toggle('active')
        
        const span = document.querySelector('.slider__span')
        span.classList.toggle('unvisible')
        span.innerText = textList[a.activeIndex]

        list.style.transition = 'all 0.2s ease-in'
        list.style.marginLeft = `${a.activeIndex * a.sliderWidth * -1}px`
        list.addEventListener('transitionend', listTransitionend)

        function listTransitionend() {
          list.style.transition = 'none'
          list.removeEventListener('transitionend', listTransitionend)
        }

        setTimeout(() => {
          span.style.transition = 'all 0.2s ease-in'
          span.classList.toggle('unvisible')
        }, 0)
        
        span.addEventListener('transitionend', isTransitioend)
        
        function isTransitioend() {
          span.style.transition = 'none'
          span.removeEventListener('transitionend', isTransitioend)
        }
      }
    }
  }
}