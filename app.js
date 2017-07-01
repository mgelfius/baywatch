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
        
        item.querySelector('.flick-name').contentEditable = true;

        item.querySelector('.flick-name')
            .addEventListener('click', this.editText.bind(this, flick))

        item.querySelector("button.remove")
            .addEventListener('click', this.delete.bind(this, flick))

        item.querySelector("button.fav")
            .addEventListener('click', this.favorite.bind(this, flick))

        item.querySelector("button.up")
            .addEventListener('click', this.moveUp.bind(this, flick))

        item.querySelector("button.down")
            .addEventListener('click', this.moveDown.bind(this, flick))
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
        flick.fav = listItem.classList.toggle('fav')
    },

    delete(flick, ev){
        const listItem = ev.target.closest('.flick')
        listItem.remove()
        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i, 1)
    },

    moveUp(flick, ev){
        const listItem = ev.target.closest('.flick')
        const i = this.flicks.indexOf(flick)
        if(i === 0){
            alert("Nope")
        }else{
            const hold = this.flicks[i]
            this.flicks[i] = this.flicks[i - 1]
            this.flicks[i - 1] = hold
            this.list.insertBefore(listItem, listItem.previousSibling)
        }
    },

    moveDown(flick, ev){
        const listItem = ev.target.closest('.flick')
        const i = this.flicks.indexOf(flick)
        if(app.flicks[i+1] === undefined){
            alert("Nope")
        }else{
            const hold = this.flicks[i]
            this.flicks[i] = this.flicks[i + 1]
            this.flicks[i + 1] = hold
            this.list.insertBefore(listItem.nextSibling, listItem)
        }

    },

    editText(ev){
        const saveButton = document.querySelector('.save')
        saveButton.classList.remove('template')
        const text = ev.name
        const listItem = document.querySelector(`#${text}`)
        saveButton.addEventListener('click', app.saveText.bind(this, text))
        listItem.addEventListener('blur', function(){
            saveButton.classList.add('template')
        }, true)
    },

    saveText(text, ev){
        const f = ev.target
        f.classList.add('template')
        const textBox = document.querySelector('.auto')
        const i = app.flicks.indexOf(text) + 1
        app.flicks[i].name = textBox.textContent
        const listItem = document.querySelector(`#${text}`)
        listItem.id = textBox.textContent
    },
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template'
})