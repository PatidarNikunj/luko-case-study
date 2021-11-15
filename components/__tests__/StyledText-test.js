import React from "react";
import renderer from "react-test-renderer";

import { CommonTextView } from "../CommonTextView";

it(`renders correctly`, () => {
  const tree = renderer
    .create(<CommonTextView>Snapshot test!</CommonTextView>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
