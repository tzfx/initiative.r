import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";

type Props = {
  state$: Function;
};

export const VIEW_OPTIONS = {
    "parties": "Parties",
    "new-party": "New Party",
    "new-encounter": "New Encounter",
    "import": "Import",
    "export": "Export",
    "about": "About"
};

export class TopHeader extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render = () => (
    <Menu fluid widths={3} size="large">
      <Menu.Item icon="recycle"></Menu.Item>
      <Menu.Item header>Initiative Tracker</Menu.Item>
      <Menu.Item>
        <Dropdown floating text="Settings">
          <Dropdown.Menu>
            <Dropdown.Item
              text="Parties"
              onClick={() => this.props.state$("parties")}
            ></Dropdown.Item>
            <Dropdown.Item
              text="New Party"
              onClick={() => this.props.state$("new-party")}
            ></Dropdown.Item>
            <Dropdown.Item
              text="New Encounter"
              onClick={() => this.props.state$("new-encounter")}
            ></Dropdown.Item>
            <Dropdown.Divider></Dropdown.Divider>
            <Dropdown.Item
              text="Import"
              onClick={() => this.props.state$("import")}
            ></Dropdown.Item>
            <Dropdown.Item
              text="Export"
              onClick={() => this.props.state$("export")}
            ></Dropdown.Item>
            <Dropdown.Divider></Dropdown.Divider>
            <Dropdown.Item
              text="About"
              onClick={() => this.props.state$("about")}
            ></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
}
