import PropTypes from 'prop-types'
import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import addons from '@storybook/addons'

import themeDecorator from '@pluralsight/ps-design-system-storybook-addon-theme'

import Button from '@pluralsight/ps-design-system-button/react'
import Icon from '@pluralsight/ps-design-system-icon/react'
import Row from '@pluralsight/ps-design-system-row/react'
import Text from '@pluralsight/ps-design-system-text/react'

import Drawer from '..'

const DrawerBase = props => (
  <div style={{ padding: '10px 0' }}>
    <Text.P {...props} />
  </div>
)
DrawerBase.propTypes = {
  children: PropTypes.node
}
DrawerBase.defaultProps = {
  children: 'Drawer Base Here'
}

const DrawerContent = props => (
  <div style={{ padding: 20 }}>
    <Text.P {...props} />
  </div>
)
DrawerContent.propTypes = {
  children: PropTypes.node
}
DrawerContent.defaultProps = {
  children: 'Drawer Base Here'
}

class ControlledDrawerStory extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = { isOpen: true }
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>Toggle drawer</Button>

        <Drawer base={<DrawerBase />} isOpen={this.state.isOpen}>
          <DrawerContent />
        </Drawer>
      </div>
    )
  }
}

class OnToggleDrawerStory extends React.Component {
  constructor(props) {
    super(props)

    this.handleToggle = this.handleToggle.bind(this)
    this.state = { isOpen: false }
  }

  handleToggle(isOpen) {
    this.setState({ isOpen })
  }

  render() {
    return (
      <div>
        <Drawer
          base={
            <DrawerBase>
              Drawer is {this.state.isOpen ? 'open' : 'closed'}
            </DrawerBase>
          }
          onToggle={this.handleToggle}
        >
          <DrawerContent />
        </Drawer>
      </div>
    )
  }
}

storiesOf('drawer', module)
  .addDecorator(story => <div style={{ padding: 48 }}>{story()}</div>)
  .addDecorator(themeDecorator(addons))
  .add('default', () => (
    <Drawer base={<DrawerBase />}>
      <DrawerContent />
    </Drawer>
  ))
  .add('controlled', () => <ControlledDrawerStory />)
  .add('using startOpen prop', () => (
    <Drawer startOpen base={<DrawerBase />}>
      <DrawerContent />
    </Drawer>
  ))
  .add('using onToggle prop', () => <OnToggleDrawerStory />)
  .add('with row component', () => (
    <Drawer
      base={
        <Row
          image={<Row.Image src="https://cataas.com/cat" />}
          title="Look at me! I'm a <Row />!"
          metadata1={['Kitten McCatbuns', '23 hours of cuteness']}
          actionBarVisible
          actionBar={[
            <Row.Action key="iHeartCats" icon={<Icon id="more" />} />
          ]}
        />
      }
    >
      <DrawerContent />
    </Drawer>
  ))
  .add('row component with actions', () => (
    <Drawer
      base={
        <Row
          image={
            <Row.ImageLink>
              <a href="https://duckduckgo.com?q=image">
                <img src="https://cataas.com/cat" />
              </a>
            </Row.ImageLink>
          }
          title={
            <Row.TextLink>
              <a href="https://duckduckgo.com?q=title">
                I'm a Row with Actions
              </a>
            </Row.TextLink>
          }
          metadata1={[
            <Row.TextLink>
              <a href="https://duckduckgo.com?q=cats">Kitten McCatbuns</a>
            </Row.TextLink>,
            '23 hours of cuteness'
          ]}
          fullOverlay={
            <Row.FullOverlayLink>
              <a href="https://duckduckgo.com?q=overlay">Overlay</a>
            </Row.FullOverlayLink>
          }
          actionBarVisible
          actionBar={[
            <Row.Action
              key="iHeartCats"
              icon={<Icon id="more" />}
              onClick={action('action')}
            />
          ]}
        />
      }
    >
      <DrawerContent />
    </Drawer>
  ))
  .add('stack of drawers', () => (
    <div>
      <Drawer base={<DrawerBase>The Drawer #1</DrawerBase>}>
        <DrawerContent />
      </Drawer>

      <Drawer base={<DrawerBase>The Drawer #2</DrawerBase>}>
        <DrawerContent />
      </Drawer>

      <Drawer base={<DrawerBase>The Drawer #2</DrawerBase>}>
        <DrawerContent />
      </Drawer>
    </div>
  ))
  .add('stack of non-sibling drawers', () => (
    <div>
      <div>
        <Drawer base={<DrawerBase>The Drawer #1</DrawerBase>}>
          <DrawerContent />
        </Drawer>
      </div>

      <div>
        <Drawer base={<DrawerBase>The Drawer #2</DrawerBase>}>
          <DrawerContent />
        </Drawer>
      </div>

      <div>
        <Drawer base={<DrawerBase>The Drawer #2</DrawerBase>}>
          <DrawerContent />
        </Drawer>
      </div>
    </div>
  ))
  .add('using custom aria label', () => (
    <Drawer base={<DrawerBase />} toggleButtonAriaLabel="custom drawer">
      <DrawerContent />
    </Drawer>
  ))
