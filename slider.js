 'use strict'
    class MySlider{
        constructor(settings){            
            this.margin = 0;
            this.counter = 0;
            this.galleryLength = document.querySelector('.slide-container').children.length;
            this.slides = document.querySelector('.slide-container').children;
            if(settings){
                this.slideWidth = parseInt(settings.width) || 800;
            }
            else{
                this.slideWidth = 800;
            };
            this.self = this;
        }

        initSlider(){
            const container = document.querySelector('.slide-container');
            const btnRight = document.getElementById('right');
            const btnLeft = document.getElementById('left');
            const nodes = document.querySelector('.slide-container').childNodes;
            const self = this;

            //удаляем тестовые узлы из списка
            for (let i = 0; i < nodes.length; i++){ 
                if (nodes[i].nodeType == 3){
                    nodes[i].remove();
                } 
            }
            
            function addNewWidth(elSelector){
                const elements = document.querySelectorAll(elSelector);
                for(let i = 0; i < elements.length; i++){
                    elements[i].style.width = self.slideWidth + 'px';
                }
            }
            // Устанавливаем ширину слайда
            addNewWidth('.wrapper');
            addNewWidth('.slide-container > li');

            // Добавляем обработчики событий на стрелки
            btnRight.addEventListener('click', function(){
                self.moveRight(container);
            });
            btnLeft.addEventListener('click', function(){
                self.moveLeft(container);
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

        moveRight(el){
            var self = this;
            var lastCounter;
            if(this.counter < this.galleryLength-1){
                this.margin -= this.slideWidth;
                this.slides[this.counter].classList.add('effect');
                this.slides[this.counter].style.opacity = "0";
                this.slides[this.counter].style.transition = "all 0.7s ease";              
                el.style.marginLeft = this.margin + 'px';
                lastCounter = this.counter;
                this.counter++;
                setTimeout(function(){
                    self.slides[lastCounter].classList.remove('effect');
                    self.slides[lastCounter].style.opacity = "1";
                }, 1200);
            }
            else{
                this.counter = 0;
                this.margin = 0;
                el.style.marginLeft = this.margin + 'px';
            }           
        }

        moveLeft(el){
            var self = this;
            var lastCounter;
            if(this.counter > 0){
                this.margin += this.slideWidth;
                this.slides[this.counter].classList.add('effect');
                this.slides[this.counter].style.opacity = "0";
                this.slides[this.counter].style.transition = "all 0.7s ease";
                el.style.marginLeft = this.margin + 'px';
                lastCounter = this.counter;
                this.counter--;
                setTimeout(function(){
                    self.slides[lastCounter].classList.remove('effect');
                    self.slides[lastCounter].style.opacity = "1";
                }, 1200);
            }
            else{
                this.counter = this.galleryLength - 1;
                this.margin = -this.slideWidth * (this.galleryLength - 1);
                el.style.marginLeft = this.margin + 'px';
            }   
        }

    }  

    