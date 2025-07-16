import {Link} from 'react-router-dom';

const HeroComponent = () => {
    return(
        <>
        <section className="hero mb-4">
          <Link to="/productListing">
          <img
            src="https://as1.ftcdn.net/v2/jpg/03/20/68/66/1000_F_320686681_Ur6vdYQgDC9WiijiVfxlRyQffxOgfeFz.jpg"
            alt="hero image"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
          </Link>
          
        </section>
        </>
    )
}

export default HeroComponent;