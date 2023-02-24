import React, {useEffect, useState} from "react";
import { v4 as uuid } from 'uuid';

const Meme = () => {
  /* SECTION FOR CHANGING STATE */
  const [randImage, setRandImage] = useState("");
  const [image, setImage] = useState([]);
  const [myInput, setMyInput] = React.useState({
    topText: "",
    bottomText: "",
  });
  const [namesArray, setNamesArray] = React.useState([])
  const [savedInput, setSavedInput] = useState({
    topText: "",
    bottomText: "",
  })
  
  let bg = {
    backgroundImage: `url(${randImage.url})`
  }
  
  //establish initial image
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => {
        setImage(data.data.memes)
      let randNum = Math.floor(Math.random() * data.data.memes.length); //random number gen
      let url = data.data.memes[randNum];
      setRandImage(url);
      bg = {
        backgroundImage: "url("+data.data.memes[randNum].url+")"
      }
      })
    }, []);

  /* SECTION FOR CHANGING CONTENT */
  // change image for initial post
  function changeImage() {
    let randNum = Math.floor(Math.random() * image.length);
    let url = image[randNum];
    setRandImage(url);
    bg = {
      backgroundImage: "url("+image[randNum].url+")"
    }
  }
  
  //change top and bottom text for inital post
  function eChange(event) {
    setMyInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  }

  //submit post to list
  function handleSubmit(event) {
    event.preventDefault()
    setNamesArray(prev => (
      [
      ...prev, 
      {topText: myInput.topText, 
      bottomText: myInput.bottomText,
      image: randImage.url,
      id: uuid(),
      editID: uuid()
      }
    ]))}

  /* CHANGING INDIVIUAL POSTS */
  
  //delete individual post
  function deleteBtn(event){
      event.preventDefault()
      setNamesArray(prev => {
        return prev.filter(curr => curr.id !== event.target.parentNode.parentNode.id)
      }
      )
    }

  //show edit for individual post and connect current data to state
  function editBtn(e){
    e.preventDefault()
    let editDiv = document.getElementById(e.target.parentNode.children[2].id)
    editDiv.classList.toggle("editFieldsNone")
    console.log(e.target.parentNode.parentNode.children[0].children[1].textContent)

    setSavedInput((prevInput) => {
      return {
        topText: e.target.parentNode.parentNode.children[0].children[0].textContent,
        bottomText: e.target.parentNode.parentNode.children[0].children[1].textContent,
      };
    });
  }
  
  //change content of individual post
  function eChangeEdit(event) {
    console.log(event.target.value)
    setSavedInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  }

  //submit changed post's content to list array and display
  function eSubmitEdit(event) {
    // setNamesArray(prev => {
      
      // })
    }

    
  /* SECTION FOR RENDERING CONTENT */
  // mapped over the namesarray items in the array for them to display
  const namesElement = namesArray.map((item) => {
    let indBg = {
      backgroundImage: `url(${item.image})`
    }
    return <div className="submitted-meme" id={item.id}>
      <div className="image-image" style={indBg}> 
        <h3 className="image-toptext">{item.topText}</h3>
        <h3 className="image-bottomtext">{item.bottomText}</h3>
      </div>
        <div className="buttons">
          <button className="deleteButton" onClick={deleteBtn} >Delete</button>
          <button className="editButton"onClick={editBtn}>Edit</button>
          <div className="editFields editFieldsNone" id={item.editID}>
            <form name="edit">
              <input
                className="top-input"
                type="text"
                name="topEditText"
                value={savedInput.topText}
                onChange={eChangeEdit}
                placeholder="Top Text"
              />
              <input
                className="bottom-input"
                type="text"
                name="bottomEditText"
                value={savedInput.bottomText}
                onChange={eChangeEdit}
                placeholder="Bottom Text"
              />
              <button type="button" onClick={eSubmitEdit}>Submit</button>
            </form>
          </div>
        </div>
      </div>
  })

  //display meme creator and render mapped list from above
  return (
    <div className="meme">
      <div className="meme-input">
        <input
          className="top-input"
          type="text"
          name="topText"
          value={myInput.topText}
          onChange={eChange}
          placeholder="Top Text"
        />
        <input
          className="bottom-input"
          type="text"
          name="bottomText"
          value={myInput.bottomText}
          onChange={eChange}
          placeholder="Bottom Text"
        />
      </div>
      <div className="meme-button">
        <button type="button" onClick={changeImage}>
          New Meme Image
        </button>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="meme-image" style={bg}>
        <p className="top-text">{myInput.topText}</p>
        <p className="bottom-text">{myInput.bottomText}</p>
        {/* created a ol for the names Element to sit in to display on the page */}
      </div>
    <div className="buttons">
      
    </div>
        {namesElement}
    </div>
  );
};

export default Meme;
