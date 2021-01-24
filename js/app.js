var menuBtn = document.getElementsByClassName('menu-btn')
var mobileMenu = document.getElementsByClassName('mobile-menu')
var clickedBtn = function() {
  mobileMenu[0].classList.toggle('active')
}

menuBtn[0].addEventListener('click', clickedBtn)

console.log(menuBtn[0])


/* --------------- TESTIMONIALS ------------------------*/


// Import library
import {
  html,
  render
} from 'https://unpkg.com/lit-html?module';

var postData = []
var postImages = []

// Lookup image ids and return url
var findImageById = function(id) {
  var Image = postImages.filter((item) => item.id == id)
  return Image[0].image
}

// Use axios to get testimonials from wp api
axios.get('wp-json/wp/v2/testimonials')
.then(function(response) {
  var postIds = []
  postData = response.data
  var featuredImgId = []

  //loop over all posts get id push into array
  response.data.map((item) => postIds.push(item.id))
  response.data.map((item) => featuredImgId.push({
    id: item.id,
    imageId: item.featured_media
  }))

  // Get featured image from wp api
  function getImage0() {
    return axios.get('/wp-json/wp/v2/media/' + featuredImgId[0].imageId)
  }

  function getImage1() {
    return axios.get('/wp-json/wp/v2/media/' + featuredImgId[1].imageId)
  }

  function getImage2() {
    return axios.get('/wp-json/wp/v2/media/' + featuredImgId[2].imageId)
  }

  // Get and push specific sized images
  axios.all([getImage0(), getImage1(), getImage2()])
  .then(axios.spread(function(image0, image1, image2) {
    postImages.push({
      id: postIds[0],
      image: image0.data.media_details.sizes.medium.source_url

    })

    postImages.push({
      id: postIds[1],
      image: image1.data.media_details.sizes.medium.source_url

    })

    postImages.push({
      id: postIds[2],
      image: image2.data.media_details.sizes.medium.source_url

    })

    // Initiailize the app
    initApp(response)
    console.log(postImages)

  }))
  // Error handling
  .catch(function(error) {
    console.log(error)

  })
})

// Error handling
.catch(function(error) {
  console.log(error)

})

var initApp = function(data) {
  // Store the data
  let testimonialsData = data.data

  // Function to basically swap position of blog posts 
  Array.prototype.swap = function(x, y) {
    var b = this[x]
    this[x] = this[y]
    this[y] = b
    return this
  }

  // Initialize swap if clicked left one way
  let clickedLeft = function() {
    postData.swap(1,0)
    render(appTemplate(postData),
    document.getElementById('testimonials-app'))
  }

  // Initialize swap if clicked right another way
  let clickedRight = function() {
    postData.swap(1,2)
    render(appTemplate(postData),
    document.getElementById('testimonials-app'))
  }

  // Function to strip the encoding data such as tags from content
  function decodeEntities(encodedString) {
    var div = document.createElement('div');
    div.innerHTML = encodedString;
    return div.textContent;
  }

  
// This is the template for the main data inserted into testimonial section
const appTemplate = (data) => html `
  <div class="testimonials-container">
    <div class="test-sides test-left" @click=${(e) => clickedLeft()}">
      <div class="person-img" style="background: url('${findImageById(data[0].id)}')">
        <div class="hover-bg">
          <div class="name">${data[0].f_name}</div>
        </div>
      </div>
    </div>
    <div class="test-center">
      <div class="header">
        <div class="user-img" style="background: url('${findImageById(data[1].id)}')">

        </div>
        <div class="info">
          <h4>${data[1].f_name}</h4>
          <span>${data[1].user_title}</span>
        </div>
      </div>
      <p>
      ${decodeEntities(data[1].content.rendered)}
      </p>
    </div>
    <div class="test-sides test-right" @click=${(e) => clickedRight()}">
      <div class="person-img" style="background: url('${findImageById(data[2].id)}')">
        <div class="hover-bg">
          <div class="name">${data[2].f_name}</div>
        </div>
      </div>
    </div>
  </div>`


  render(appTemplate(postData), document.getElementById('testimonials-app'))

}