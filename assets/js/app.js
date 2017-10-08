import '../css/app.scss'
import {initPage} from './initPage'
let initPage1 = `
    <h1 style="text-align: center">Enter Number of picture you want to display</h1>
    <div class="col-lg-4 col-md-6 col-xs-12 col-lg-offset-4 col-md-offset-3">
        <div class="form-group">
            <input type="number" class="form-control input-lg" id="pictureNumber" name="pictureNumber">
        </div>
        <input type="submit" class="btn btn-lg btn-success col-xs-offset-5 col-lg-offset-5 col-md-offset-5" value="submit">
    </div>    
`

let container = document.getElementById('container')

container.innerHTML = initPage1

let initGallery = `
    <div id="gallerywrapper">
        <div id="gallery">
        
        </div>    
    </div>
`

document.querySelector('input[type="submit"]').addEventListener('click', (event) =>  {
    event.preventDefault()
    let pictureNumber = parseInt(document.getElementById('pictureNumber').value, 10)
    if(!isNaN(pictureNumber)) {
        console.log(document.getElementById('pictureNumber').value)
        container.innerHTML = initGallery
        for(let i=1; i<=pictureNumber ; i++) {
            let div = document.createElement('div')
            div.id = "pic"+i

            let prev = document.createElement('a')
            prev.className = 'previous'
            prev.innerHTML = '&lt;'
            if(i===1) {
                prev.href = '#pic'+pictureNumber
            }else {
                prev.href = "#pic"+(i-1)

            }

            let next = document.createElement('a')
            next.className = 'next'
            next.innerHTML = '&gt;'
            if(i===pictureNumber) {
                next.href = "#pic1"
            }else {
                next.href = "#pic"+(i+1)
            }

            let h3 = document.createElement('h3')
            h3.innerHTML = i+'/'+pictureNumber

            let pictureURl = "http://lorempixel.com/600/350/?"+i
            let image = document.createElement('img')
            image.id = "picture"+i
            image.src = pictureURl
            image.height = 350
            image.width = 500
            image.className = "onLoad"
            div.appendChild(image)
            div.appendChild(prev)
            div.appendChild(next)
            div.appendChild(h3)
            document.getElementById("gallery").appendChild(div)
        }
    }

})

