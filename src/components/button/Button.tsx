import { Button as BootstrapButton, Spinner } from "react-bootstrap";

export const Button = ({
  handleOnClick,
  textToShow,
  isLoading = false,
}: {
  handleOnClick: () => any;
  textToShow: string;
  isLoading?: boolean;
}) => {
  return (
    <BootstrapButton className="m-1" onClick={handleOnClick} variant="primary">
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </>
      ) : (
        textToShow
      )}
    </BootstrapButton>
  );
};
