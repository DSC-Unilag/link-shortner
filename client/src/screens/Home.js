import React from "react";
import Navbar from "../components/Navbar";
import { useMediaQuery } from "react-responsive";
import { MdHome } from "react-icons/md";
import { MdLink } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdShare } from "react-icons/md";

const Home = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  let main = {};
  let grow = {};
  let big = {};
  let shortlinks = {};
  let icon = {};
  let p = {};

  if (isDesktop) {
    main = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    };

    grow = {
      width: "100%",
    };

    big = {
      fontSize: "75px",
      textAlign: "left",
    };

    shortlinks = {
      display: "flex",
    };

    icon = {
      width: "32",
      height: "32",
    };

    p = {
      fontSize: "1rem",
    };
  }

  return (
    <div>
      <Navbar />

      <main>
        <div className="main" style={main}>
          <div>
            <h1 style={big}>Shorten Links Using Your Own Domain</h1>
          </div>

          <div style={grow}>
            <div>
              <input
                type="text"
                className="input-link"
                placeholder="Input link"
              />
            </div>

            <div>
              <button className="green-btn">Save</button>

              <button className="del-btn">Delete</button>
            </div>
          </div>
        </div>

        <div class="green-nav">
          <div className="short-links" style={shortlinks}>
            SHORTLINKS
          </div>

          <div>
            <a href="#">
              <div className="green-item">
                <MdHome className="icon" style={icon} />
                <p style={p}>DASHBOARD</p>
              </div>
            </a>
          </div>

          <div>
            <a href="#">
              <div className="green-item">
                <MdLink className="icon" style={icon} />
                <p style={p}>MY URLS</p>
              </div>
            </a>
          </div>

          <div>
            <a href="#">
              <div className="green-item">
                <MdEdit className="icon" style={icon} />
                <p style={p}>EDIT</p>
              </div>
            </a>
          </div>

          <div>
            <a href="#">
              <div className="green-item">
                <MdShare className="icon" style={icon} />
                <p style={p}>SHARE</p>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
