import React from 'react';
import { shallow } from 'enzyme';
import LoggedComponent from '../components/LoggedComponent';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('LoggedComponent', () => {
  it('renders without crashing', () => {
    shallow(<LoggedComponent />);
  });

  it('renders a navbar', () => {
    const wrapper = shallow(<LoggedComponent />);
    const navbar = wrapper.find('.navbar');
    expect(navbar.length).toBe(1);
  });

  it('renders a home link', () => {
    const wrapper = shallow(<LoggedComponent />);
    const homeLink = wrapper.find('.nav-item').at(0).find('.nav-link');
    expect(homeLink.text()).toBe('Home');
    expect(homeLink.prop('href')).toBe('/');
  });

  it('renders an about link', () => {
    const wrapper = shallow(<LoggedComponent />);
    const aboutLink = wrapper.find('.nav-item').at(1).find('.nav-link');
    expect(aboutLink.text()).toBe('About');
    expect(aboutLink.prop('href')).toBe('#about');
  });

  it('renders a contact link', () => {
    const wrapper = shallow(<LoggedComponent />);
    const contactLink = wrapper.find('.nav-item').at(2).find('.nav-link');
    expect(contactLink.text()).toBe('Contact');
    expect(contactLink.prop('href')).toBe('#contact');
  });

  it('renders a sign out link', () => {
    const wrapper = shallow(<LoggedComponent />);
    const signOutLink = wrapper.find('.nav-item').at(3).find('.nav-link');
    expect(signOutLink.text()).toBe('Sign Out');
    expect(signOutLink.prop('href')).toBe('/');
  });
});
