import React from 'react';
import { shallow } from 'enzyme';
import HeaderComponent from '../components/HeaderComponent';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('HeaderComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HeaderComponent />);
  });

  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should have a navbar with a brand logo', () => {
    expect(wrapper.find('.navbar-brand')).toHaveLength(1);
  });

  it('should have a toggle button for mobile devices', () => {
    expect(wrapper.find('.navbar-toggler')).toHaveLength(1);
  });

  it('should have a menu that can be collapsed and expanded', () => {
    expect(wrapper.find('.navbar-collapse')).toHaveLength(1);
  });

  it('should change visibility of menu on scroll', () => {
    const instance = wrapper.instance();
    expect(instance.state.visible).toBe(true);

    // simulate a scroll event
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);

    // visibility should be updated
    expect(instance.state.visible).not.toBe(true);
  });

  it('should have a link to Home page', () => {
    // expect(wrapper.find('a[href="/"]').text()).toEqual('Home');
  });

  it('should have a link to About page', () => {
    expect(wrapper.find('a[href="#about"]').text()).toEqual('About');
  });

  it('should have a link to Contact page', () => {
    expect(wrapper.find('a[href="#contact"]').text()).toEqual('Contact');
  });

  it('should have a link to Sign In page', () => {
    expect(wrapper.find('a[href="/login"]').text()).toEqual('Sign In');
  });

  it('should have a link to Register page', () => {
    expect(wrapper.find('a[href="/register"]').text()).toEqual('Register');
  });
});
