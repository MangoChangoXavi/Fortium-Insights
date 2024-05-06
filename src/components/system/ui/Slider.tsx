import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Image, { StaticImageData } from "next/image";

const Slider = ({ images }: { images: string[] | StaticImageData[] }) => (
  <AwesomeSlider>
    {images.map((image, index) => (
      <div key={index} data-src={image}>
        <Image src={image} alt="Listing" width={100} height={50} />
      </div>
    ))}
  </AwesomeSlider>
);

export default Slider;
