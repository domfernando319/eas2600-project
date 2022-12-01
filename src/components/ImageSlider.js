import { useState } from "react"
import "./ImageSlider.css"

const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -30%)",
        left: "-50px",
        fontSize: "45px",
        color: "white",
        zIndex: 1,
        cursor: "pointer"
    }
    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -30%)",
        right: "-50px",
        fontSize: "45px",
        color: "white",
        zIndex: 1,
        cursor: "pointer"
    }
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length -1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }
    const sliderStyles = {
        height: "150%",
        width: "150%",
        position: "relative"
    }
    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${slides[currentIndex].url})`
    }

    const dotContainerStyles = {
        display: 'flex',
        justifyContent: 'center'
    }

    const dotStyles = {
        color: 'white',
        margin: '0 3px',
        cursor: 'pointer',
        fontSize: '70px'
    }
    
    return (
        <div style = {sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrevious}>❰</div>
            
            <div style ={slideStyles}></div>
            <div style={rightArrowStyles} onClick={goToNext}>❱</div>
            <div style={dotContainerStyles}>
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} style = {dotStyles} onClick={() => goToSlide(slideIndex)}>
                        •
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider