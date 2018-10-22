
class DomRunner{
    constructor(){
        let start = document.querySelectorAll('.step3')[1];
        this.btns = document.querySelectorAll('button');
        this.currentEl = start;
        this.currentEl.classList.add('current');
        this.btns[0].addEventListener('click', () => {
            this.moveParent(this.currentEl);
        });
        this.btns[2].addEventListener('click', () => {
            this.moveRightSibling(this.currentEl);
        });
        this.btns[1].addEventListener('click', () => {
            this.moveLeftSibling(this.currentEl);
        });
        this.btns[3].addEventListener('click', () => {
            this.moveChild(this.currentEl);
        })
        this.btns[4].addEventListener('click', () => {
            this.createEl(this.currentEl);
        })
        this.btns[5].addEventListener('click', () => {
            this.deleteEl(this.currentEl);
        })

    }

    moveParent(el){
        if (el.parentElement !== document.body){
            this.currentEl.classList.remove('current');
            this.currentEl = el.parentElement;
            this.currentEl.classList.add('current');
        }
    }

    moveChild(el){
        if (el.firstElementChild){
            this.currentEl.classList.remove('current');
            this.currentEl = el.firstElementChild;
            this.currentEl.classList.add('current');
        }
    }

    moveLeftSibling(el){
        if (el.previousElementSibling){
            this.currentEl.classList.remove('current');
            this.currentEl = el.previousElementSibling;
            this.currentEl.classList.add('current');
        }
        
    }

    moveRightSibling(el){
        if (el.nextElementSibling){
            this.currentEl.classList.remove('current');
            this.currentEl = el.nextElementSibling;
            this.currentEl.classList.add('current');
        }
    }

    createEl(el){
        let newEl = document.createElement('div');
        if (el.firstElementChild){
            newEl.className = el.firstElementChild.classList;
        }
        else{
            newEl.classList.add('new-el');
        }
        newEl.classList.add('current');
        newEl.textContent = 'new element';
        el.classList.remove('current');
        el.append(newEl);
        this.currentEl = newEl;
    }

    deleteEl(el){
        if(el.previousElementSibling){
            this.currentEl = el.previousElementSibling;
        }
        else if(el.nextElementSibling){
            this.currentEl = el.nextElementSibling;
        }
        else if(el.parentElement){
            this.currentEl = el.parentElement;
        }
        this.currentEl.classList.add('current');
        el.parentElement.removeChild(el);
    }

}


    









