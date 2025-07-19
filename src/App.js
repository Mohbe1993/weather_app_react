import {
  Button,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./App.css";
import CloudIcon from "@mui/icons-material/Cloud";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
const theme = createTheme({
  typography: {
    fontFamily: ["font1"],
  },
});
function App() {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setdateAndTime] = useState("");
  const [lang, setlang] = useState("en");

  const [temp, setTEmo] = useState({
    num: null,
    disc: "",
    min: null,
    max: null,
    icon: null,
  });

  function changeLanguage() {
    if (lang === "en") {
      setlang("ar");
      i18n.changeLanguage("ar");
    } else {
      setlang("en");
      i18n.changeLanguage("en");
    }
  }

  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setdateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=e0a8e2026213ace48fbd3f3e0c3d76c3",
        { signal: controller.signal }
      )
      .then(function (response) {
        const resTemp = Math.round(response.data.main.temp);
        const resMin = Math.round(response.data.main.temp_min);
        const resMax = Math.round(response.data.main.temp_max);
        const resDisc = response.data.weather[0].description;
        const resIcon = response.data.weather[0].icon;
        setTEmo({
          num: resTemp,
          disc: resDisc,
          min: resMin,
          max: resMax,
          icon: resIcon,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ background: "#0052d0" }}>
        <Container maxWidth="sm">
          <section
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <section
              style={{
                width: "100%",
                color: "white",
                background: "rgb(28 52 91 /36%)",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              <section>
                <article
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                    gap: "20px",
                  }}
                >
                  <Typography variant="h2" style={{ marginLeft: "20px" }}>
                    London
                  </Typography>
                  <Typography variant="h6">{dateAndTime}</Typography>
                </article>
                <hr />
                <section
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <article>
                    <article
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h1">{temp.num}</Typography>
                      <img
                        src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                        alt="Weather icon"
                      />
                    </article>
                    <Typography variant="h6">{temp.disc}</Typography>

                    <article
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">
                        {t("Min")}: {temp.min}
                      </Typography>
                      <Typography variant="h5" style={{ margin: "0px 5px" }}>
                        |
                      </Typography>
                      <Typography variant="h5">
                        {t("Max")}: {temp.max}
                      </Typography>
                    </article>
                  </article>
                  <CloudIcon style={{ fontSize: "200px" }} />
                </section>
              </section>
            </section>
            <article style={{ marginTop: "10px" }}>
              <Button
                style={{ color: "white" }}
                variant="text"
                onClick={changeLanguage}
              >
                {lang === "en" ? "العربيه" : "English"}
              </Button>
            </article>
          </section>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
