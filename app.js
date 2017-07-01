const app = {
    init(selectors){
        this.flicks = []
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        
        document
            .querySelector(selectors.formSelector)
            .addEventListener(
                'submit', 
                this.handleSubmit.bind(this)
                )
    },

    renderListItem(flick){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.id = flick.name
        item.querySelector('.flick-name')
            .textContent = flick.name
        
        item.querySelector("button.remove")
            .addEventListener('click', this.delete.bind(this, flick))

        item.querySelector("button.fav")
            .addEventListener('click', this.favorite.bind(this, flick))
        item.dataset.id = flick.id

        this.flicks.unshift(flick)
    
        return item
    },

    handleSubmit(ev){
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
            fav: false,
        }

        const listItem = this.renderListItem(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild)

        ++this.max
        f.reset()
    },

    favorite(flick, ev){
        const listItem = ev.target.closest('.flick')
        console.log(listItem)
        flick.fav = listItem.classList.toggle('fav')
    },

    delete(flick, ev){
        const listItem = ev.target.closest('.flick')
        listItem.remove()
        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i, 1)
    },

    moveUp(ev){

    },

    moveDown(ev){

    },
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template'
})