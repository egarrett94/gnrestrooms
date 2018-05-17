# GNRestrooms
GNRestrooms is a web app that uses the incredible [RefugeRestrooms API](http://www.refugerestrooms.org) to generate nearby gender-neutral restrooms.
### Technologies Used: 
* React.js
* React-Mapbox
* JavaScript
* HTML5/CSS3

## User Stories
1. Jack is a transman, and he needs to use the restroom. He lives in a conservative American town, and fears for his safety 
when faced with having to use a gendered restroom. He would like to be able to quickly and easily locate and navigate to the
nearest and safest gender-neutral restroom.
2. Lemon is genderfluid, and they don't particularly enjoy or feel comfortable using gendered public restrooms. They prefer 
the privacy that gender-neutral restrooms provide, so they would love a light, user-friendly app that could show them the closest
options. 

## Wireframes
Coming Soon

## Screenshots
![screen shot 2018-05-16 at 11 17 24 pm](https://user-images.githubusercontent.com/25888207/40160640-1aec7316-5963-11e8-8379-a0e7efb42d1f.png)
![screen shot 2018-05-16 at 11 17 55 pm](https://user-images.githubusercontent.com/25888207/40160641-1b071770-5963-11e8-902b-b09154ea2de8.png)

## Development Process
I used create-react-app for a quick boilerplate to start this app. I had recently heard about Mapbox and was excited to give 
it a go, especially because I'd been wanting to create an app that uses RefugeRestrooms API. If anything, I wanted to make it 
for my own personal use, but once I started working on it and seeing the delightful map styles that Mapbox provides, and the 
quick and easy customization options it provides, I decided to put a bit more love and effort into it so I could share it with 
family and friends. 

Learning how to use React-Mapbox was a bit of a challenge, because I wasn't familiar with Mapbox JS in general. It reminded me 
a lot of Materialize vs React-Materialize in the way all of the various features of Materialize/Mapbox were then masked and 
encapsulated within components in React-Materialize/React-Mapbox. After carefully reading the docs and Googling various examples
that other folks have created, I was able to create a functional, aesthetically pleasant map. 

Rendering the individual markers for each of the restrooms has been my biggest challenge so far with this particular app, and 
it was for silly reasons. I fiddled around with it for a couple hours in the late night hours before finally deciding to call it
and get some sleep, only to wake up with the solution fresh in my mind. I was reading too deeply into some of the documentation
that called for importing the particular style of the map--I had tried importing a .css file, I had tried this and that, but ultimately
I just had to go onto Mapbox's website and edit the particular mapstyle I was using in their studio and add the icons I was trying to render. Upon doing that,
the link provided where it says `style={"mapbox://styles/foo/bar"}` in the Map component will automatically update the map's styling
itself and in turn make the icons available. Then, voilà, I was able to render the hearts in the `<Layer type="symbol" id="marker" layout={{"icon-image": "heart-15"}} >` component.

## Next Steps 
* Geolocation issues fixed for mobile
* Small stylistic changes, like onHover for the markers will cause it to expand a little bit and then deflate onMouseOff 
