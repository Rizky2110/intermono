import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import { hexToRgba, themeColor } from "core";
import axios from "axios";
import styled from "styled-components";
import Image from "next/image";
import Cookies from "cookies";
import ReCaptcha from "react-google-recaptcha";
import { Button, Input } from "ui/sc";
import dynamic from "next/dynamic";
import Head from "next/head";
import type { IconProps } from "phosphor-react";

import logo from "public/icons/icon-192x192.png";
import center from "public/assets/logo/login-center.svg";

import { APP_NAME } from "src/lib/constants";
import { useAppDispatch, useAppSelector } from "src/app/hook";
import { login, me, resetAuth } from "src/app/action";

const User = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.User)
);

const Key = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Key)
);

const Container = styled("main")`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.primary};
  overflow: hidden;

  .text {
    color: ${(props) => props.theme.colors.body};
  }

  .top-left,
  .center,
  .bot-right {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
  }

  .center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bot-right {
    bottom: -2rem;
    right: 0rem;
  }

  .bg-overlay {
    position: absolute;
    z-index: 100;
    inset: 0;
    background-color: ${(props) => hexToRgba(props.theme.colors.primary, 0.3)};
  }

  .form {
    position: absolute;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;

    .image {
      margin-inline: auto;
      width: 6.087rem;
    }

    &-login {
      backdrop-filter: blur(0.375rem);
      background-blend-mode: exclusion;
      background: ${hexToRgba("#ffffff", 0.25)};
      width: min(100% - 2rem, 25rem);
      height: 35.25rem;
      margin-inline: auto;
      padding: 1.5rem;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      animation: 1s fadeIn;
      animation-fill-mode: forwards;

      visibility: hidden;

      .text {
        color: ${(props) => props.theme.colors.primary};
        text-align: center;
      }

      .text-title-form {
        font-size: 2rem;
        margin-block-end: 1rem;
        font-weight: 600;
      }

      .text-caption-form {
        font-size: 0.875rem;
        margin-block-end: 1rem;
        color: ${(props) => themeColor(props.theme, "neutral070")};
      }

      .captcha {
        margin: auto;
        display: table;
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const Login: NextPage = function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const reCaptchaRef = React.useRef<ReCaptcha>(null);

  const { isError, isLoading, isSuccess, isSuccessMe, message } =
    useAppSelector((state) => state.auth);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [reCaptcha, setReCaptcha] = React.useState("");

  const handleSumbit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email,
      password,
      reCaptcha: "",
    };
    dispatch(login(data));
  };

  const handleChangeCaptcha = (token: string | null) => {
    if (!token) {
      return;
    }

    setReCaptcha(token);
  };

  React.useEffect(() => {
    if (isError) {
      // do something
      reCaptchaRef.current?.reset();
    }

    if (isSuccess) {
      dispatch(me());
    }

    if (isSuccessMe) {
      router.push("/");
    }

    dispatch(resetAuth());
  }, [isError, isSuccess, isSuccessMe, router, dispatch, message]);

  return (
    <div>
      <Head>
        <title>{APP_NAME} App | Make your ads going every where</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={`Welcome to ${APP_NAME}, you can logged in here.`}
        />
      </Head>
      <Container aria-label="login-page">
        <div className="center">
          <Image src={center} layout="fill" alt="" priority />
        </div>

        <div className="bg-overlay" />
        <section className="form">
          <form
            className="form-login"
            onSubmit={handleSumbit}
            noValidate
            autoComplete="off"
          >
            <span className="image">
              <Image alt="Login Logo" src={logo} />
            </span>
            <h1 className="text text-title-form">INTERCOMP</h1>
            <Input
              fullWidth
              style={{ marginBottom: "1.2rem" }}
              label="Username/Email"
              palette="primary"
              startAdornment={<User />}
              type="email"
              placeholder="ex: johndoe@example.com"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              fullWidth
              label="Password"
              color="primary"
              startAdornment={<Key />}
              type="password"
              palette="primary"
              placeholder="****"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ReCaptcha
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              ref={reCaptchaRef}
              onChange={handleChangeCaptcha}
              className="captcha"
              size="normal"
            />
            <Button
              fullWidth
              palette="secondary"
              type="submit"
              style={{ marginBlockStart: "auto" }}
            >
              Login
            </Button>
          </form>
        </section>
      </Container>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;

  const cookies = new Cookies(req, res);

  const accessToken = cookies.get("access") || "";

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/check_token`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken,
        },
      }
    );

    if (response.data && response.data.result) {
      return {
        redirect: {
          destination: "/",
          permanent: true,
        },
      };
    }
  } catch (error) {
    return {
      props: {},
    };
  }

  return {
    props: {},
  };
};
