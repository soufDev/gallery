import '../css/app.scss'

let initPage = `
    <h1 style="text-align: center">Enter Number of picture you want to display</h1>
    <div class="col-lg-4 col-md-6 col-xs-12 col-lg-offset-4 col-md-offset-3">
        <div class="form-group">
            <input type="number" class="form-control input-lg" id="pictureNumber" name="pictureNumber">
        </div>
        <input type="submit" class="btn btn-lg btn-success col-xs-offset-5 col-lg-offset-5 col-md-offset-5" value="submit">
    </div>    
`

let container = document.body
container.innerHTML = initPage
let index = 0
let imageCount = 5
let pictureURl = "http://lorempixel.com/600/350/?"
let title
let imageList = []

let refresh = function(prev, next) {
    let fadingOutImage = imageList[prev]
    let fadingInImage = imageList[next]
    console.log(prev, next)
    fadingOutImage.className="fadeOut"
    setTimeout(() => {
        title.innerHTML = (index+1)+"/"+imageCount
        fadingOutImage.style.display = "none"
        fadingInImage.style.display = "block"
        fadingInImage.className="fadeIn"
    }, 600)
}

document.querySelector('input[type="submit"]').addEventListener('click', (event) =>  {
    event.preventDefault()

    imageCount = parseInt(document.getElementById('pictureNumber').value, 10)

    if(!isNaN(imageCount)) {
        let galleryWrapper = document.createElement('div')
        galleryWrapper.id = 'gallerywrapper'

        let gallery = document.createElement('div')
        gallery.id = 'gallery'

        galleryWrapper.appendChild(gallery)
        container.innerHTML = galleryWrapper.outerHTML

        let div = document.getElementById("gallery")

        let prev = document.createElement('button')
        prev.className = 'previous'
        prev.innerHTML = 'Prev'
        prev.addEventListener('click', (event) => {
            event.preventDefault()
            let old = index
            index = (index-1+imageCount) % imageCount
            refresh(old, index)
        })


        let next = document.createElement('button')
        next.className = 'next'
        next.innerHTML = 'Next'
        next.addEventListener('click', (event) =>  {
            event.preventDefault()
            let old = index
            index = (++index) % imageCount
            refresh(old, index)
        })

        title = document.createElement('h3')

        let preview = document.createElement('div')
        preview.id= "preview"
        for(let i=1; i<=imageCount; i++) {
            let image = document.createElement('img')
            image.id = i
            image.src = pictureURl+i
            image.className = 'fadeOut'
            image.style.display = 'none'
            imageList.push(image)
            preview.appendChild(image)
        }
        div.appendChild(preview)
        div.appendChild(prev)
        div.appendChild(next)
        div.appendChild(title)

        refresh(0,0)
    }

})

