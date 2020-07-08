import React from "react";
import { render } from "@testing-library/react";
import { Button } from "./Button";

test("renders HELLO", () => {
  const { getByText } = render(
    <Button>
      <div>HELLO</div>
    </Button>
  );
  const helloElement = getByText(/HELLO/i);
  expect(helloElement).toBeInTheDocument();
});
