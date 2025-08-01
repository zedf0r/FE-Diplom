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

export const Footer = () => {
  const handleClick = () => {};
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
                  Будтье в курсе событий
                </label>
                <div className={style.footer__input}>
                  <input
                    className={style.input}
                    type="text"
                    id="subscribe"
                    placeholder="e-mail"
                  />
                  <Button
                    type="button"
                    onClick={handleClick}
                    className="button__outline_small"
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
                  <a className={style.social}>
                    <YoutubeIcon />
                  </a>

                  <a className={style.social}>
                    <InstagramIcon />
                  </a>

                  <a className={style.social}>
                    <GooglePlusIcon />
                  </a>

                  <a className={style.social}>
                    <FacebookIcon />
                  </a>

                  <a className={style.social}>
                    <TwitterIcon />
                  </a>
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
