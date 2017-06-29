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
        item.textContent = flick.name
        this.flicks[flick.id - 1] = flick.name
        item.backgroundColor = 'white'
        item.id = `flick${flick.id}`
        const fav = this.renderFavButton()
        
        const del = this.renderDelButton()
        
        const up = this.renderUpButton()
        
        const down = this.renderDownButton()

        
        item.appendChild(fav)
        item.appendChild(up)
        item.appendChild(down)
        item.appendChild(del)

        document.querySelector('#flick-list').addEventListener('click', this.favorite(item))

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
        this.list.appendChild(listItem)
        
        ++this.max
    },

    renderFavButton(){
        const fav = document.createElement('button')
        fav.textContent = "Fav"
        fav.className = "warning button"
        return fav
    },

    renderDelButton(){
        const del = document.createElement('button')
        del.textContent = "Delete"
        del.className = 'alert button'
        return del 
    },

    renderUpButton(){
        const up = document.createElement('button')
        up.textContent = "Up"
        up.className = 'primary button'
        return up 
    },

    renderDownButton(){
        const down = document.createElement('button')
        down.textContent = "Down"
        down.className = 'secondary button'
        return down 
    },

    favorite(item){
        if(item.style.backgroundColor){
            if(item.style.backgroundColor === white){
                console.log('Shit')
                item.style.backgroundColor = 'white'
            }else{
                console.log('Yay!')
                item.style.backgroundColor = 'gold'
            }
        }else{
            item.style.backgroundColor = 'gold'
        }
        console.log('Yay?')
        
    },

    delete(item){
        app.flicks.splice(item.id - 1, 1)
        
    },
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
})