'use strict'

// Settings obj
/*{
    img: ['imgpath', 'imgpath'],
    elId: 'string', // id for gallery container
    text: ['text', 'text'],
    width: 800
}*/

class Slide{
    constructor(obj){
        this.textArr = obj.text;
        this.imgArr = obj.img;
    }
    render(){
        let result = "";

        for(let y = 0; y < this.imgArr.length; y++){
           result = result.concat(`<li><img src="${this.imgArr[y]}" alt="pict"><div class="options"><h3>${this.textArr[y]}</h3><label><input type="checkbox" name="like${y}"><i class="fas fa-heart"></i></label></div></li>`);
        }
        return result;
    }
}



class NewSlider{
    constructor(settings){
        this.container = settings.elId;
        this.slidesEl = new Slide(settings); 
        this.margin = 0;
        this.counter = 0;
        this.initHtml();
        this.initSlider(settings);
    }

    initHtml(){
        const elForSlider = document.getElementById(this.container);
        elForSlider.insertAdjacentHTML('afterbegin', `<div class="wrapper"><form action="" name="form-likes"><ul class="slide-container">${this.slidesEl.render()}</ul></form></div><i id="right" class="fas fa-arrow-right"></i><i id="left" class="fas fa-arrow-left"></i>`);
    }


    initSlider(settings){

        this.galleryLength = document.querySelector('.slide-container').children.length;
        this.slides = document.querySelector('.slide-container').children;
        if(settings){
            this.slideWidth = parseInt(settings.width) || 800;
        }
        else{
            this.slideWidth = 800;
        };
        const container = document.querySelector('.slide-container');
        const btnRight = document.getElementById('right');
        const btnLeft = document.getElementById('left');
        const nodes = document.querySelector('.slide-container').childNodes;
        
        //удаляем тестовые узлы из списка
        for (let i = 0; i < nodes.length; i++){ 
            if (nodes[i].nodeType == 3){
                nodes[i].remove();
            } 
        }
        
        // Устанавливаем ширину слайда
        this.addNewWidth('.wrapper');
        this.addNewWidth('.slide-container > li');

        // Добавляем обработчики событий на стрелки
        btnRight.addEventListener('click', () => {
            this.moveRight(container);
        });
        btnLeft.addEventListener('click', () => {
            this.moveLeft(container);
        });
        // Обработчик лайков
        container.addEventListener('click', function(e){
            if(e.target.tagName === 'I'){
                e.target.classList.toggle('like');
            
                if(e.target.classList.contains('like')){
                    e.target.previousElementSibling.setAttribute('checked', 'checked');
                }
                else{
                    e.target.previousElementSibling.removeAttribute('checked');
                }
            };
        });

    }

    addNewWidth(elSelector){
        const elements = document.querySelectorAll(elSelector);
        for(let i = 0; i < elements.length; i++){
            elements[i].style.width = this.slideWidth + 'px';
        }
    }

    moveRight(el){
        var lastCounter;
        if(this.counter < this.galleryLength-1){
            this.margin -= this.slideWidth;
            this.slides[this.counter].classList.add('effect');
            this.slides[this.counter].style.opacity = "0";
            this.slides[this.counter].style.transition = "all 0.7s ease";              
            el.style.marginLeft = this.margin + 'px';
            lastCounter = this.counter;
            this.counter++;
            setTimeout(() => {
                this.slides[lastCounter].classList.remove('effect');
                this.slides[lastCounter].style.opacity = "1";
            }, 1200);
        }
        else{
            this.counter = 0;
            this.margin = 0;
            el.style.marginLeft = this.margin + 'px';
        }           
    }

    moveLeft(el){
        var lastCounter;
        if(this.counter > 0){
            this.margin += this.slideWidth;
            this.slides[this.counter].classList.add('effect');
            this.slides[this.counter].style.opacity = "0";
            this.slides[this.counter].style.transition = "all 0.7s ease";
            el.style.marginLeft = this.margin + 'px';
            lastCounter = this.counter;
            this.counter--;
            setTimeout(() => {
                this.slides[lastCounter].classList.remove('effect');
                this.slides[lastCounter].style.opacity = "1";
            }, 1200);
        }
        else{
            this.counter = this.galleryLength - 1;
            this.margin = -this.slideWidth * (this.galleryLength - 1);
            el.style.marginLeft = this.margin + 'px';
        }   
    }




}