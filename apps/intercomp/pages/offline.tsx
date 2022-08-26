import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledServerError = styled("section")`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: ${(props) => props.theme.colors.primary};

  .text {
    color: ${(props) => props.theme.colors.body};
    text-align: center;
  }

  .serverError {
    display: flex;
    flex-direction: column;
    align-items: center;

    .btn-go-back {
      background: transparent;
      width: fit-content;
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
`;
const ServerError: NextPage = function ServerError() {
  const router = useRouter();

  const handleBack = () => {
    router.replace("/");
  };
  return (
    <StyledServerError aria-label="server-error-page">
      <div className="serverError">
        <h1 className="text text-title-error">Internal Server Error</h1>
        <p className="text text-caption-error">
          Unexpected error occur. Make sure your internet work properly or
          contact the owner of the web app.
        </p>
        <button onClick={handleBack} className="btn-go-back" type="button">
          Back to Dashboard
        </button>
      </div>
    </StyledServerError>
  );
};

export default ServerError;
