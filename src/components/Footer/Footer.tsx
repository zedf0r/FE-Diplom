import {
  EmailIcon,
  FacebookIcon,
  GeopositionIcon,
  GooglePlusIcon,
  InstagramIcon,
  SkypeIcon,
  TelephoneIcon,
  TwitterIcon,
  YoutubeIcon,
  ArrowTopIcon,
} from "../Icons";
import { Button } from "../";
import style from "./Footer.module.css";
import { useState } from "react";
import { fetchHelper } from "@/helper/fetchHelper";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const socials = [
    <YoutubeIcon />,
    <InstagramIcon />,
    <GooglePlusIcon />,
    <FacebookIcon />,
    <TwitterIcon />,
  ];

  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footer__content}>
          <div className={style.footer__feedback}>
            <h3 className={style.footer__feedback_title}>Свяжитесь с нами</h3>
            <div className={style.footer__contact}>
              <TelephoneIcon />
              <a className={style.contact__text} href="tel:+88000000000">
                8 (800) 000 00 00
              </a>
            </div>
            <div className={style.footer__contact}>
              <EmailIcon />
              <a className={style.contact__text} href="mailto:inbox@mail.ru">
                inbox@mail.ru
              </a>
            </div>
            <div className={style.footer__contact}>
              <SkypeIcon />
              <span className={style.contact__text}>tu.train.tickets</span>
            </div>
            <div className={style.footer__contact}>
              <GeopositionIcon />
              <span className={style.contact__text}>
                г. Москва ул. Московская 27-35 555 555
              </span>
            </div>
          </div>
          <div className={style.footer__subscribe}>
            <h3 className={style.footer__feedback_title}>Подписка</h3>
            <div className={style.subscribe__content}>
              <div className={style.footer__form}>
                <label className={style.label} htmlFor="subscribe">
                  Будьте в курсе событий
                </label>
                <div className={style.footer__input}>
                  <input
                    className={style.input}
                    type="text"
                    id="subscribe"
                    placeholder="e-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Button
                    type="button"
                    className="button__outline_small"
                    onClick={() => {
                      fetchHelper({
                        method: "POST",
                        url: "/subscribe",
                        body: email,
                      });
                      setEmail("");
                    }}
                  >
                    Отправить
                  </Button>
                </div>
              </div>
              <div className={style.subscribe__socials}>
                <h3 className={style.footer__feedback_title}>
                  Подписывайтесь на нас
                </h3>
                <div className={style.socials}>
                  {socials.map((social, index) => (
                    <a key={index} className={style.social}>
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer__bottom}>
        <div className="container">
          <div className={style.footer__bottom_inner}>
            <h3 className={style.footer__logo}>Лого</h3>
            <div className={style.footer__to_up}>
              <ArrowTopIcon />
            </div>
            <span className={style.footer__copyright}>2018 web</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
