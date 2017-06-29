const app = {
    init(selectors){
        this.flicks = []
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector)
        
        document
            .querySelector(selectors.formSelector)
            .addEventListener(
                'submit', 
                this.handleSubmit.bind(this)
                )
    },

    renderListItem(flick){
        const item = document.createElement('li')
        item.id = flick.name
        item.textContent = flick.name
        item.dataset.id = flick.id

        this.flicks.unshift(flick)
        item.style.backgroundColor = 'white'
        const fav = this.renderFavButton(item)
        const del = this.renderDelButton(item)
        const up = this.renderUpButton(item)
        const down = this.renderDownButton(item)

        item.appendChild(fav)
        item.appendChild(up)
        item.appendChild(down)
        item.appendChild(del)

        return item
    },

    handleSubmit(ev){
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
        }

        const listItem = this.renderListItem(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild)

        document.getElementById(`${listItem.id}Fav`).addEventListener("click", app.favorite)
        document.getElementById(`${listItem.id}Del`).addEventListener("click", app.delete)
        document.getElementById(`${listItem.id}Up`).addEventListener("click", app.moveUp)
        document.getElementById(`${listItem.id}Down`).addEventListener("click", app.moveDown)

        ++this.max
        f.reset()
    },

    renderFavButton(item){
        const fav = document.createElement('button')
        fav.textContent = "Fav"
        fav.className = "warning button"
        fav.id = `${item.textContent}Fav`
        return fav
    },

    renderDelButton(item){
        const del = document.createElement('button')
        del.textContent = "Delete"
        del.className = 'alert button'
        del.id = `${item.textContent}Del`
        return del 
    },

    sayYeah(){
        alert("Yeah!")
    },

    renderUpButton(item){
        const up = document.createElement('button')
        up.textContent = "Up"
        up.className = 'primary button'
        up.id = `${item.textContent}Up`
        return up 
    },

    renderDownButton(item){
        const down = document.createElement('button')
        down.textContent = "Down"
        down.className = 'secondary button'
        down.id = `${item.textContent}Down`
        return down 
    },

    favorite(item){
        console.log(this.style.backgroundColor)
        if(this.style.backgroundColor){
            if(this.style.backgroundColor === "gold"){
                console.log('Shit')
                this.textContent = "Fav"
                this.style.backgroundColor = '#ffae00'
            }else{
                console.log('Yay!')
                this.textContent = "Faved!"
                this.style.backgroundColor = 'gold'
            }
        }else{
            this.textContent = "Faved!"
            this.style.backgroundColor = 'gold'
        }
    },

    delete(item){
        console.log(app.flicks)
        this.parentNode.parentNode.removeChild(this.parentNode)
        //app.flicks.splice(this.id - 1, 1)
        //console.log(app.flicks)
    },

    moveUp(item){

    },

    moveDown(item){

    },
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
})