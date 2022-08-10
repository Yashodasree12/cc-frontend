import React from 'react';
import { CarouselProvider } from "pure-react-carousel";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Card,ButtonContainer, SliderContainer, StyledSlide, StyledSlider, BackButton,
    NextButton, CardText, CardImage, CardButton, CardButtonBlue } from "./styles";
import {Nav, NavLink, NavMenu, NavBtn, NavBtnLink} from "./NavbarElements";
import image1 from './wd.jpg';
import image2 from './wd.jpg';
import image3 from './wd.jpg';
import image4 from './wd.jpg';
import image5 from './wd.jpg';


const data = [
    {
      title: "Securities",
      cardText: "Progravida nibh vel velit auctor alinean, iorem quis bibendum",
      link:"/securities",
      src: image1
    },
    {
      title: "Trades",
      cardText: "Progravida nibh vel velit auctor alinean, iorem quis bibendum",
      link:"/trades",
      src: image2
    },
    {
      title: "Customer",
      cardText: "Progravida nibh vel velit auctor alinean, iorem quis bibendum",
      link:"/cid",
      src: image3
    },
    {
      title: "Expired Bonds",
      cardText: "Progravida nibh vel velit auctor alinean, iorem quis bibendum",
      link:"/expired",
      src: image4
    },
    {
      title: "Other Services",
      cardText: "Progravida nibh vel velit auctor alinean, iorem quis bibendum",
      link:"/xxx",
      src: image5
    }
  ];
const Services = () => {
    return (
        <div>
            <h1 className='blockHeader' >Services</h1><br/><br/>
            <CarouselProvider naturalSlideWidth={200} naturalSlideHeight={100} totalSlides={data.length}
                            visibleSlides={3} step={3} >
                <ButtonContainer>
                    <BackButton>
                        <FiChevronLeft size="1.5em" />
                    </BackButton>
                    <NextButton>
                        <FiChevronRight size="1.5em" />
                    </NextButton>
                </ButtonContainer>
                <SliderContainer>
                <StyledSlider classNameAnimation="animating"> {data.map((item, index) => (
                    <StyledSlide index={index} classNameHidden="hidden" classNameVisible="visible">
                        <Card>
                            <CardImage backgroundImage={item.src} />
                            <CardText>
                                <h2><NavLink to={item.link} >{item.title}</NavLink></h2>
                                <br/>
                                <h3 style={{"color":"grey","fontSize":"16px",
                                "paddingLeft":"2px","paddingRight":"2px","fontFamily":"sans-serif"}}>{item.cardText}</h3>
                            </CardText>
                            <CardButton />
                            <CardButtonBlue />
                        </Card>
                    </StyledSlide>
                ))}
                </StyledSlider>
                </SliderContainer>
                
            </CarouselProvider>
        </div>
    );
};

export default Services;


