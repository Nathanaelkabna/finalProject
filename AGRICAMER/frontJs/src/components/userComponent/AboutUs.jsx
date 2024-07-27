import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <>
      <section className="about">
      <div className="container text-center  mt-5">
      <h2>nos services</h2>
      <p>nos services</p>
        </div>
        
        <div className="container"   id="inscription">
          <div className="row gx-0">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center"
              
            >
              <div className="content">
                <h3 >Agriculteur</h3>
                <h2>
                  creer son compte et ajouter divers produits
                </h2>
                <p>
                  Quisquam vel ut sint cum eos hic dolores aperiam. Sed deserunt
                  et. Inventore et et dolor consequatur itaque ut voluptate sed
                  et. Magnam nam ipsum tenetur suscipit voluptatum nam et est
                  corrupti.
                </p>
                <div className="text-center text-lg-start">
                  <Link
                    to="/admin"
                    className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>s&apos;inscrire</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 d-flex align-items-center"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img src="images/27.png" className="img-fluid" alt="" />
            </div>
          </div>
        </div>

        <div className="container" id="about" >
          <div className="row gx-0 d-flex flex-row-reverse">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="content">
                <h3>Who We Are</h3>
                <h2>
                  Expedita voluptas omnis cupiditate totam eveniet nobis sint
                  iste. Dolores est repellat corrupti reprehenderit.
                </h2>
                <p>
                  Quisquam vel ut sint cum eos hic dolores aperiam. Sed deserunt
                  et. Inventore et et dolor consequatur itaque ut voluptate sed
                  et. Magnam nam ipsum tenetur suscipit voluptatum nam et est
                  corrupti.
                </p>
                <div className="text-center text-lg-start">
                  <a
                    href="#"
                    className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 d-flex align-items-center"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img src="images/27.png" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
