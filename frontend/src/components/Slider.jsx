import React, { useEffect, useState } from "react";
import './Slider.css';
import image1 from '../img/ntmt.jpg';
import image2 from '../img/web.jpg';
import image3 from '../img/grad.jpg';

const Slider = () => {
    const slides = [
        {
            id: 1,
            image: image1,
            text: 'Нижнетагильский Машиностроительный Техникум проводит новый набор студентов по направлениям : Технологии Машиностроения, Специальные машины и устройства, Экономика,Программирование на 2023-2024 год. ',
        },
        {
            id: 2,
            image: image2,
            text: 'У Нижнетагильского Машиностроительного Техникума появилось свое независемое веб-приложение для работы с образовательными данными. ',
        },
        {
            id: 3,
            image: image3,
            text: 'Встречайте выпускников 2023 года',
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        handleResize(); // Check on initial render

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {isMobile ? (
                // JSX for small screens (width <= 600)
                <div >
                    <div >
                        <div className="slider">
                            <div
                                className="slides-container"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {slides.map((slide, index) => (
                                    <div
                                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                                        key={slide.id}
                                    >
                                        <div className='slider_subblock'>
                                            <div className='image-container'>
                                                <img src={slide.image} alt={slide.text} />
                                            </div>
                                            <div>
                                                <p>{slide.text}</p>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                            <div className="navigation">
                                <button onClick={prevSlide}>Следующий</button>
                                <button onClick={nextSlide}>Предыдущий</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // JSX for large screens (width > 600)
                <div >
                    <div className="slider">
                        <div
                            className="slides-container"
                            style={{ transform: `translateX(-${currentSlide * 105}%)` }}
                        >
                            {slides.map((slide, index) => (
                                <div
                                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                                    key={slide.id}
                                >
                                    <div className='slider_subblock'>
                                        <div>
                                            <img src={slide.image} alt={slide.text} />
                                        </div>
                                        <div>
                                            <p>{slide.text}</p>
                                        </div>
                                    </div>

                                    {/* <img src={slide.image} alt={slide.text} />
            <p>{slide.text}</p> */}
                                </div>
                            ))}
                        </div>
                        <div className="navigation">
                            <button onClick={prevSlide}>Следующий</button>
                            <button onClick={nextSlide}>Предыдущий</button>
                        </div>
                    </div>
                </div>
            )
            }
        </div>



    );
};

export default Slider;

