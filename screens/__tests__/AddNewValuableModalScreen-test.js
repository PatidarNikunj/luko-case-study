import React from "react";
import renderer from "react-test-renderer";
import AddNewValuableModalScreen from "../AddNewValuableModalScreen";

jest.mock();

test("Snapshot is Working", () => {
  const tree = renderer
    .create(<AddNewValuableModalScreen navigation={"data"} route={"data"} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
