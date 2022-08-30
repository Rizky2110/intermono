import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledNotFound = styled("main")`
  min-height: 100vh;
  display: grid;
  place-items: center;

  .text {
    text-align: center;
    line-height: 1.5;
  }

  .not-found {
    width: min(100% - 2rem, 24rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .text-not-found {
        font-size: 2rem;
        font-weight: 600;
      }

      .text-caption {
        margin-block-end: 2rem;
        font-size: 1.5rem;
        color: ${(props) => props.theme.colors.body3};
      }

      .btn-go-back {
        background: transparent;
        outline: none;
        border: 0.0625rem solid ${(props) => props.theme.colors.secondary};
        font-size: 1.25rem;
        font-family: inherit;
        font-weight: 500;
        color: ${(props) => props.theme.colors.secondary};
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.5s ease;

        &:hover {
          background-color: ${(props) => props.theme.colors.secondary};
          color: ${(props) => props.theme.colors.body};
        }
      }
    }
  }
`;

const NotFound: NextPage = function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    router.replace("/");
  };

  return (
    <StyledNotFound>
      <div className="not-found">
        <Image
          width={364.73 * 0.7}
          height={242.19 * 0.7}
          src="/assets/image/page-not-found.png"
          alt="not found"
        />
        <div className="not-found-content">
          <h1 className="text text-not-found">Oops! Page Not Found.</h1>
          <p className="text text-caption">
            The page you&apos;re looking for is not available.
          </p>
          <button onClick={handleBack} className="btn-go-back" type="button">
            Back to Dashboard
          </button>
        </div>
      </div>
    </StyledNotFound>
  );
};

export default NotFound;
